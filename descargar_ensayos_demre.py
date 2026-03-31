import requests
from bs4 import BeautifulSoup
import re
import os
import time
import urllib.parse

def descargar_ensayos_paes():
    # Solicitar el año al usuario para construir la URL base según el esquema del DEMRE [1]
    anio = input("Introduce el año de admisión (ej. 2025): ").strip()
    
    # URL de inicio para las pruebas oficiales del proceso indicado
    url_inicio = f"https://demre.cl/publicaciones/{anio}/pruebas-oficiales-paes-regular-p{anio}"
    print(f"\n[DEBUG] URL inicial construida: {url_inicio}")
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Mapeo de asignaturas con palabras clave para identificar los enlaces en el HTML [1]
    asignaturas = {
        "historia": ["historia", "sociales"],
        "matematica1": ["matematica 1", "m1"],
        "matematica2": ["matematica 2", "m2"],
        "ciencias-biologia": ["biologia"],
        "ciencias-quimica": ["quimica"],
        "ciencias-fisica": ["fisica"],
        "competencia-lectora": ["lectora"]
    }

    try:
        print(f"Accediendo al portal DEMRE para el proceso de admisión {anio}...")
        res = requests.get(url_inicio, headers=headers)
        print(f"[DEBUG] Código de estado de la respuesta principal: {res.status_code}")
        
        if res.status_code != 200:
            print(f"Error: No se pudo cargar la página {url_inicio}. Verifique el año ingresado (Código HTTP {res.status_code}).")
            return

        soup = BeautifulSoup(res.text, 'html.parser')
        enlaces_pagina = soup.find_all('a', href=True)
        print(f"[DEBUG] Se encontraron {len(enlaces_pagina)} enlaces en la página principal.")
        
        # Crear carpeta local para organizar los documentos recuperados
        carpeta = f"Ensayos_PAES_{anio}"
        if not os.path.exists(carpeta):
            os.makedirs(carpeta)
            print(f"[DEBUG] Se ha creado la carpeta local: {carpeta}")

        descargados = 0
        print(f"Buscando instrumentos de evaluación en: {url_inicio}\n")

        for clave, keywords in asignaturas.items():
            encontrado = False
            print(f"[DEBUG] Analizando asignatura '{clave}' con keywords: {keywords}")
            
            for link in enlaces_pagina:
                texto = link.get_text().lower()
                href = link['href']
                
                # Identificar la landing page de la asignatura [3, 2]
                if any(kw in texto for kw in keywords) and "paes" in href:
                    # Usamos urljoin para asegurar urls relativas y absolutas
                    url_detalle = urllib.parse.urljoin(url_inicio, href)
                    print(f"[DEBUG]   -> Coincidencia encontrada! URL detalle de {clave}: {url_detalle}")
                    
                    try:
                        # Navegar a la página específica de la prueba para extraer el PDF [4, 5]
                        res_detalle = requests.get(url_detalle, headers=headers)
                        print(f"[DEBUG]   -> Respuesta obtenida para {clave} (código {res_detalle.status_code})")
                        
                        soup_detail = BeautifulSoup(res_detalle.text, 'html.parser')
                        
                        # Buscar el enlace que apunta al recurso PDF (relajamos regex al final)
                        tag_pdf = soup_detail.find('a', href=re.compile(r'\.pdf$', re.IGNORECASE))
                        
                        if tag_pdf:
                            url_pdf = urllib.parse.urljoin(url_detalle, tag_pdf['href'])
                            print(f"[DEBUG]   -> Enlace PDF detectado: {url_pdf}")
                            
                            nombre_archivo = f"{clave}_{anio}.pdf"
                            print(f"  -> Descargando: {nombre_archivo}...")
                            
                            # Realizar la descarga del binario del PDF
                            res_pdf = requests.get(url_pdf, headers=headers)
                            if res_pdf.status_code == 200:
                                with open(os.path.join(carpeta, nombre_archivo), 'wb') as f:
                                    f.write(res_pdf.content)
                                print(f"[DEBUG]   -> Excelentes resultados: {nombre_archivo} guardado correctamente de tamaño {len(res_pdf.content)} bytes.")
                                descargados += 1
                                encontrado = True
                                time.sleep(1) # Pausa de cortesía para el servidor
                                break
                            else:
                                print(f"[DEBUG]   -> Falló la descarga del archivo PDF. Código: {res_pdf.status_code}")
                                
                        else:
                            print(f"[DEBUG]   -> No se encontró enlace a archivo .pdf dentro de {url_detalle}")
                            
                    except Exception as sub_e:
                        print(f"[DEBUG]   -> ERROR al navegar a {url_detalle}: {sub_e}")
            
            if not encontrado:
                print(f"  [!] Aviso: No se encontró el documento para '{clave}'.")
            print("-" * 40)

        print(f"\nProceso finalizado. Se guardaron {descargados} archivos en la carpeta '{carpeta}'.")

    except Exception as e:
        print(f"Se produjo un error inesperado al inicio del script: {e}")

if __name__ == "__main__":
    descargar_ensayos_paes()