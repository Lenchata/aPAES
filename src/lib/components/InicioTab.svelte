<script lang="ts">
  import { BarChart2 } from 'lucide-svelte';
  
  let { goals, results, dark, isMobile } = $props();

  const history = $derived(results.slice(-8));
  const maxScore = $derived(Math.max(...history.map((r: any) => r.score), goals.puntajeDeseado, 100));

  const PRUEBAS_DISPONIBLES = [
    { id: "m1", label: "Matemática 1" },
    { id: "m2", label: "Matemática 2" },
    { id: "cl", label: "Comprensión Lectora" },
    { id: "hist", label: "Historia y C. Sociales" },
    { id: "cien", label: "Ciencias" },
  ];
</script>

<div class="w-full flex flex-col gap-6 md:gap-8">
  <div class="border-[4px] rounded-2xl p-6 {dark ? 'bg-[#12112a] border-white/10' : 'bg-white border-black'}">
    <h2 class="text-[1.3rem] md:text-[1.6rem] font-black mb-1 tracking-tight flex flex-col md:flex-row md:items-center justify-between gap-2 {dark ? 'text-slate-100' : 'text-black'}">
      <span>Historial de Puntaje</span>
      <span class="text-xs font-bold px-3 py-1 rounded-full border-2 self-start {dark ? 'bg-white/10 border-white/20' : 'bg-[#e2deef] border-black'}">
        Meta: {goals.puntajeDeseado} pts
      </span>
    </h2>
    <p class="text-xs mb-6 {dark ? 'text-slate-400' : 'text-slate-600'}">Últimos {history.length || 0} ensayos registrados</p>

    {#if history.length === 0}
      <div class="flex flex-col items-center justify-center h-40 gap-2 {dark ? 'text-slate-400' : 'text-slate-600'}">
        <BarChart2 size={36} class="opacity-30" />
        <p class="text-sm font-semibold">Aún no hay resultados guardados.</p>
      </div>
    {:else}
      <div class="flex items-end justify-start h-[200px] w-full px-2 gap-3 overflow-x-auto pb-2">
        <div class="relative flex items-end h-full gap-3 w-full">
          <!-- dashed goal line -->
          <div
            class="absolute left-0 right-0 border-t-[2px] border-dashed border-emerald-400 z-20 pointer-events-none"
            style="bottom: {(goals.puntajeDeseado / maxScore) * 100}%"
            title="Meta: {goals.puntajeDeseado}"
          ></div>
          {#each history as r}
            {@const h = Math.max(6, (r.score / maxScore) * 100)}
            <div class="flex flex-col items-center flex-1 min-w-[44px] h-full justify-end group relative">
              <div class="absolute bottom-full mb-1 text-[11px] font-black px-2 py-0.5 rounded border-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 {dark ? 'bg-[#1a0f38] border-white/20 text-white' : 'bg-white border-black text-black'}">
                {r.score} pts<br /><span class="font-normal opacity-60">{r.asignatura?.substring(0, 10)}</span>
              </div>
              <div
                class="w-full rounded-t-lg border-[3px] transition-all {dark ? 'border-indigo-400/60 bg-indigo-500 hover:bg-indigo-400' : 'border-black bg-[#6e46cb] hover:bg-[#865eea]'}"
                style="height: {h}%"
              ></div>
              <span class="font-bold text-[9px] mt-1.5 text-center leading-tight {dark ? 'text-slate-400' : 'text-slate-600'}">{r.date || 'Sin fecha'}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if results.length > 0}
    <div class="grid {isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4">
      {@const best = Math.max(...results.map((r: any) => r.score))}
      {@const avg = Math.round(results.reduce((s: number, r: any) => s + r.score, 0) / results.length)}
      
      {#each [{ label: "Mejor puntaje", value: best, unit: "pts" }, { label: "Promedio", value: avg, unit: "pts" }, { label: "Ensayos realizados", value: results.length, unit: "" }] as s}
        <div class="border-[4px] rounded-2xl {isMobile ? 'p-4' : 'p-6'} text-center {dark ? 'bg-[#12112a] border-white/10' : 'bg-white border-black'}">
          <p class="text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 md:mb-2 {dark ? 'text-slate-400' : 'text-slate-500'}">{s.label}</p>
          <p class="{isMobile ? 'text-2xl' : 'text-4xl'} font-black {dark ? 'text-indigo-300' : 'text-[#6c40d6]'}">{s.value}<span class="text-lg ml-1">{s.unit}</span></p>
        </div>
      {/each}
    </div>
  {/if}

  <div class="border-[4px] rounded-2xl p-6 {dark ? 'bg-[#12112a] border-white/10' : 'bg-white border-black'}">
    <h2 class="text-[1.2rem] md:text-[1.5rem] font-black tracking-tight mb-5 {dark ? 'text-slate-100' : 'text-black'}">Metas por prueba</h2>
    <div class="flex flex-wrap gap-3 md:gap-4">
      {#if goals.pruebasSeleccionadas.length === 0}
        <p class="text-sm {dark ? 'text-slate-500' : 'text-slate-400'}">Configura tus pruebas en la sección <strong>Progreso</strong>.</p>
      {/if}
      {#each goals.pruebasSeleccionadas as pid}
        {@const prueba = PRUEBAS_DISPONIBLES.find(p => p.id === pid)}
        {#if prueba}
          {@const meta = goals.puntajesPorPrueba[pid] ?? goals.puntajeDeseado}
          {@const relevant = results.filter((r: any) => r.asignatura?.toLowerCase().includes(prueba.label.split(" ")[0].toLowerCase()))}
          {@const last = relevant[relevant.length - 1]}
          {@const diff = last ? last.score - meta : null}
          <div class="flex flex-col items-center gap-2 p-4 rounded-xl border-[3px] min-w-[110px] flex-1 {dark ? 'border-white/10 bg-white/5' : 'border-black bg-[#f4f2f9]'}">
            <span class="font-black text-xs text-center uppercase tracking-tight {dark ? 'text-slate-300' : 'text-slate-600'}">{prueba.label}</span>
            <div class="w-7 h-28 rounded-full relative overflow-hidden border-[3px] {dark ? 'border-white/20 bg-white/5' : 'border-black bg-white'}">
              <div class="absolute bottom-0 w-full {dark ? 'bg-indigo-400' : 'bg-[#6e46cb]'}" style="height: {Math.min(100, (meta / 1000) * 100)}%"></div>
            </div>
            <span class="font-black text-base {dark ? 'text-slate-100' : 'text-black'}">{meta} pts</span>
            {#if diff !== null}
              <span class="text-[10px] font-bold {diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}">
                {diff >= 0 ? "+" : ""}{diff} vs meta
              </span>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
