import { NextRequest, NextResponse } from "next/server";

// Polyfills básicos para evitar errores de Next.js Turbopack con pdf.js
if (typeof global !== "undefined") {
  if (!global.DOMMatrix) global.DOMMatrix = class DOMMatrix {} as any;
  if (!global.Path2D) global.Path2D = class Path2D {} as any;
  if (!global.ImageData) global.ImageData = class ImageData {} as any;
  if (!global.CanvasPattern) global.CanvasPattern = class CanvasPattern {} as any;
  if (!global.CanvasGradient) global.CanvasGradient = class CanvasGradient {} as any;
}

const pdfParse = require("pdf-parse");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo PDF" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdfParse(buffer);
    const text = data.text;

    // Lógica para analizar el texto usando expresiones regulares heurísticas
    // Buscamos patrones típicos de PAES como "1. " o "1) " y luego "A) ", "B) "
    
    // Eliminamos saltos de múltiples líneas y limpiamos texto espúreo
    const cleanText = text.replace(/\\r\\n/g, '\\n');
    
    const questions = [];
    // Una expresión regular simple para atrapar números seguidos por punto
    // Esto es muy básico porque sin IA depende del PDF exacto
    const questionBlocks = cleanText.split(/(?=\\n\\s*\\d{1,3}\\s*[\\.)\\-])/g);
    
    for (const block of questionBlocks) {
      // Ignorar bloques cortos que no sean preguntas reales
      if (block.trim().length < 20) continue;
      
      const lines = block.trim().split('\\n');
      let questionTitle = lines[0];
      let fullText = block;
      
      // Intentar extraer alternativas A, B, C, D, E o a, b, c, d, e
      const optionsRegex = /(?:\\n|^)\\s*([A-Ea-e])\\s*[\\.)\\-]\\s*([\\s\\S]*?)(?=(?:\\n\\s*[A-Ea-e]\\s*[\\.)\\-])|$)/g;
      const optionsBlocks = Array.from(block.matchAll(optionsRegex)) as any[];
      
      let options = [];
      let qText = questionTitle;
      
      if (optionsBlocks.length > 0) {
        // Encontramos alternativas, entonces el texto de la pregunta es todo lo anterior
        const firstOptionIndex = block.indexOf(optionsBlocks[0][0]);
        qText = block.substring(0, firstOptionIndex).trim();
        
        for (const match of optionsBlocks) {
          options.push(match[2].trim());
        }
      } else {
        // Generar alternativas falsas si el parser falla, para que el UI funcione
        qText = block.trim();
        options = ["Alternativa A (No extraída)", "Alternativa B (No extraída)", "Alternativa C (No extraída)", "Alternativa D (No extraída)"];
      }
      
      // Nos aseguramos que inicie como una pregunta
      if (/^\\d{1,3}\\s*[\\.)\\-]/.test(qText)) {
        questions.push({
          id: questions.length + 1,
          text: qText,
          options: options.length > 0 ? options : ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
          correct: 0 // No podemos saber la respuesta correcta sin IA de un PDF estándar, asumimos 0 por ahora
        });
      }
    }

    if (questions.length === 0) {
      // Fallback si no parsió nada
      questions.push({
        id: 1,
        text: "Error: No se pudo identificar la estructura del PDF. Asegúrese de que las preguntas inicien con un número (ej: '1.') y las alternativas con letras (ej: 'A)').",
        options: ["Entendido"],
        correct: 0
      });
    }

    return NextResponse.json({ success: true, questions });
  } catch (error: any) {
    console.error("Error procesando PDF:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
