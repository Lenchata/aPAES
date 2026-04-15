<script lang="ts">
  import { Plus } from 'lucide-svelte';
  
  let { onSaveExam, dark, isMobile } = $props();

  let jsonInput = $state("");
  let error = $state("");
  let saved = $state(false);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.preguntas || !Array.isArray(parsed.preguntas)) throw new Error("El JSON debe contener un arreglo 'preguntas'");
      const formatted = parsed.preguntas.map((p: any) => ({
        id: p.id,
        text: p.enunciado || "Sin enunciado",
        options: Object.values(p.opciones || {}),
        correctAnswer: p.respuesta_correcta,
        explanation: p.explicacion,
      }));
      error = "";
      onSaveExam(parsed.metadata || {}, formatted);
      jsonInput = "";
      saved = true;
      setTimeout(() => saved = false, 2000);
    } catch (e: any) {
      error = "Error parseando el JSON: " + e.message;
    }
  };

  const loadExample = () => jsonInput = JSON.stringify({
    metadata: { año: 2027, asignatura: "Competencia Matemática 1 (M1)", nivel_de_dificultad: "Regular" },
    preguntas: [{
      id: 1,
      enunciado: "En una tienda, un artículo vale $120.000. El precio sube 15% y luego baja 10%. ¿Cuál es el precio final?",
      opciones: { A: "$124.200", B: "$126.000", C: "$132.000", D: "$138.000" },
      respuesta_correcta: "A",
      explicacion: "120.000 × 1.15 = 138.000; 138.000 × 0.90 = 124.200.",
    }],
  }, null, 2);
</script>

<div class="w-full flex flex-col gap-8">
  <div class="border-[4px] rounded-2xl p-8 flex flex-col gap-4 {dark ? 'bg-[#12112a] border-white/10' : 'bg-white border-black'}">
    <h2 class="text-[1.8rem] font-black uppercase tracking-tighter text-[#6c40d6]" style="text-shadow: 1px 1px 0 rgba(0,0,0,0.2)">
      Importar Ensayo (JSON)
    </h2>
    <p class="text-sm font-bold {dark ? 'text-slate-400' : 'text-slate-600'}">Pega el contenido JSON del ensayo para agregarlo a tu biblioteca en Practicar.</p>

    <div class="relative">
      <textarea
        class="w-full {isMobile ? 'h-64' : 'h-96'} p-5 font-mono text-[13px] border-[3px] rounded-lg shadow-inner focus:outline-none focus:border-[#7141d9] focus:ring-2 focus:ring-[#7141d9]/30 resize-y
          {dark ? 'bg-white/5 border-white/10 text-slate-100' : 'bg-[#f4f2f9] border-black text-black'}"
        bind:value={jsonInput}
        placeholder={'{\n  "metadata": { "año": 2027, "asignatura": "Matemática 1" },\n  "preguntas": [\n    {\n      "id": 1,\n      "enunciado": "...",\n      "opciones": { "A": "...", "B": "..." },\n      "respuesta_correcta": "A",\n      "explicacion": "..."\n    }\n  ]\n}'}
      ></textarea>

      <button
        onclick={loadExample}
        class="absolute top-4 right-6 text-xs font-bold px-3 py-1 rounded border-2 transition-all active:translate-y-0.5
          {dark ? 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/20' : 'bg-[#e2deef] border-black hover:bg-[#d0c6eb]'}"
      >
        Cargar Ejemplo
      </button>
    </div>

    {#if error}
      <div class="text-red-400 font-extrabold border-2 border-red-400 bg-red-500/10 p-3 rounded text-sm">{error}</div>
    {/if}

    <button
      onclick={handleSave}
      class="flex items-center gap-2 px-8 py-3 text-xl font-black border-[4px] border-black rounded-xl transition-all active:translate-y-1 active:shadow-none self-start mt-2
        {saved ? 'bg-emerald-500 text-white' : 'bg-[#6c40d6] hover:bg-[#5b3eb8] text-white'}"
    >
      <Plus size={24} stroke-width="3" /> {saved ? "¡Guardado en Mis Ensayos!" : "Guardar en Mis Ensayos"}
    </button>
  </div>
</div>
