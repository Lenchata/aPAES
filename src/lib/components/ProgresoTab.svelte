<script lang="ts">
  import { FolderOpen, ChevronDown, ChevronUp, Trash2 } from 'lucide-svelte';
  
  let { goals, results, onUpdateGoals, onDeleteResult, dark, isMobile } = $props();

  let localGoals = $state({ ...goals });
  let saved = $state(false);
  let groupBy = $state<"none" | "group" | "asignatura" | "año">("group");
  let collapsed = $state<Record<string, boolean>>({});
  let editingId = $state<number | null>(null);
  let editGroup = $state("");

  const PRUEBAS_DISPONIBLES = [
    { id: "m1", label: "Matemática 1" },
    { id: "m2", label: "Matemática 2" },
    { id: "cl", label: "Comprensión Lectora" },
    { id: "hist", label: "Historia y C. Sociales" },
    { id: "cien", label: "Ciencias" },
  ];

  const saveGoals = () => { onUpdateGoals(localGoals); saved = true; setTimeout(() => saved = false, 2000); };

  const togglePrueba = (pid: string) => {
    const cur = localGoals.pruebasSeleccionadas;
    localGoals.pruebasSeleccionadas = cur.includes(pid) ? cur.filter((x: string) => x !== pid) : [...cur, pid];
  };

  const grouped = $derived.by(() => {
    const g: Record<string, any[]> = {};
    if (groupBy === "none") {
      g["Todos los ensayos"] = results;
    } else {
      results.forEach((r: any) => {
        const key = groupBy === "group" ? (r.group || "Sin grupo") : groupBy === "asignatura" ? r.asignatura : String(r.año);
        if (!g[key]) g[key] = [];
        g[key].push(r);
      });
    }
    return g;
  });

  const toggleCollapse = (k: string) => collapsed[k] = !collapsed[k];
</script>

<div class="w-full flex flex-col gap-8">
  <!-- Goals section -->
  <div class="border-[4px] rounded-2xl p-6 flex flex-col gap-4 {dark ? 'bg-[#12112a] border-white/10' : 'bg-white border-black'}">
    <h2 class="text-[1.8rem] font-black uppercase tracking-tighter text-[#6c40d6]" style="text-shadow: 1px 1px 0 rgba(0,0,0,0.2)">
      Mis Metas
    </h2>

    <div class="flex gap-6 flex-wrap">
      <div class="flex flex-col gap-1">
        <label class="text-xs font-bold {dark ? 'text-slate-400' : 'text-slate-600'}" for="puntajeDeseado">Puntaje Deseado (global)</label>
        <input id="puntajeDeseado" type="number" class="p-2.5 border-2 rounded-lg font-bold text-sm w-32 {dark ? 'bg-white/10 border-white/20 text-slate-100' : 'bg-[#f4f2f9] border-black text-black'}" bind:value={localGoals.puntajeDeseado} />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs font-bold {dark ? 'text-slate-400' : 'text-slate-600'}" for="ensayosSemanales">Ensayos Semanales</label>
        <input id="ensayosSemanales" type="number" class="p-2.5 border-2 rounded-lg font-bold text-sm w-32 {dark ? 'bg-white/10 border-white/20 text-slate-100' : 'bg-[#f4f2f9] border-black text-black'}" bind:value={localGoals.ensayosSemanales} />
      </div>
    </div>

    <div>
      <p class="text-xs font-bold mb-2 {dark ? 'text-slate-400' : 'text-slate-600'}">Pruebas que rindo</p>
      <div class="flex flex-wrap gap-2">
        {#each PRUEBAS_DISPONIBLES as p}
          {@const sel = localGoals.pruebasSeleccionadas.includes(p.id)}
          <button onclick={() => togglePrueba(p.id)}
            class="px-3 py-1.5 rounded-lg border-[3px] font-black text-sm transition-all
              {sel ? 'bg-[#6c40d6] border-[#6c40d6] text-white'
                : dark ? 'bg-white/5 border-white/20 text-slate-300 hover:border-indigo-400'
                  : 'bg-[#f4f2f9] border-black text-black hover:bg-[#e2deef]'}"
          >
            {p.label}
          </button>
        {/each}
      </div>
    </div>

    {#if localGoals.pruebasSeleccionadas.length > 0}
      <div>
        <p class="text-xs font-bold mb-2 {dark ? 'text-slate-400' : 'text-slate-600'}">Puntaje objetivo por prueba</p>
        <div class="flex flex-wrap gap-3">
          {#each localGoals.pruebasSeleccionadas as pid}
            {@const prueba = PRUEBAS_DISPONIBLES.find(p => p.id === pid)}
            <div class="flex flex-col gap-1">
              <label class="text-[10px] font-bold {dark ? 'text-slate-400' : 'text-slate-600'}" for="score-{pid}">{prueba?.label}</label>
              <input id="score-{pid}" type="number" class="p-2.5 border-2 rounded-lg font-bold text-sm w-24 {dark ? 'bg-white/10 border-white/20 text-slate-100' : 'bg-[#f4f2f9] border-black text-black'}"
                bind:value={localGoals.puntajesPorPrueba[pid]} />
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <button onclick={saveGoals}
      class="self-start px-6 py-2 text-sm font-black border-[3px] rounded-lg transition-all active:translate-y-0.5 active:shadow-none
        {saved ? 'bg-emerald-500 border-emerald-700 text-white' : 'bg-[#298d5c] border-black text-white hover:bg-[#1a6640]'}"
    >
      {saved ? "✓ Guardado!" : "Guardar Metas"}
    </button>
  </div>

  <!-- Results table -->
  <div class="border-[4px] rounded-2xl p-6 flex flex-col gap-4 {dark ? 'bg-[#12112a] border-white/10' : 'bg-white border-black'}">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <h2 class="text-[1.6rem] font-black uppercase tracking-tighter text-[#6c40d6]" style="text-shadow: 1px 1px 0 rgba(0,0,0,0.2)">
        Historial de Resultados
      </h2>
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold {dark ? 'text-slate-400' : 'text-slate-600'}">Agrupar por:</span>
        <select
          bind:value={groupBy}
          class="text-sm font-bold border-2 rounded-lg px-3 py-1.5 focus:outline-none {dark ? 'bg-white/10 border-white/20 text-slate-100' : 'bg-[#f4f2f9] border-black text-black'}"
        >
          <option value="none">Sin agrupación</option>
          <option value="group">Grupo</option>
          <option value="asignatura">Asignatura</option>
          <option value="año">Año</option>
        </select>
      </div>
    </div>

    {#if results.length === 0}
      <div class="flex flex-col items-center justify-center py-12 gap-3 {dark ? 'text-slate-400' : 'text-slate-600'}">
        <FolderOpen size={40} class="opacity-30" />
        <p class="text-sm font-semibold">No hay resultados guardados aún.</p>
        <p class="text-xs opacity-60">Realiza un ensayo y guarda tu puntaje para verlo aquí.</p>
      </div>
    {:else}
      <div class="flex flex-col gap-4">
        {#each Object.entries(grouped) as [groupName, items]}
          {@const isCollapsed = collapsed[groupName]}
          {@const avg = Math.round(items.reduce((s: number, r: any) => s + r.score, 0) / items.length)}
          <div class="border-2 rounded-xl overflow-hidden {dark ? 'border-white/10' : 'border-black'}">
            <button
              onclick={() => toggleCollapse(groupName)}
              class="w-full flex items-center justify-between px-4 py-3 font-extrabold text-sm {dark ? 'bg-white/5 hover:bg-white/10 text-slate-200' : 'bg-[#f4f2f9] hover:bg-[#e2deef] text-black'} transition-colors"
            >
              <div class="flex items-center gap-3">
                <FolderOpen size={16} class={dark ? "text-indigo-400" : "text-[#6c40d6]"} />
                <span>{groupName}</span>
                <span class="text-xs font-normal {dark ? 'text-slate-400' : 'text-slate-600'}">({items.length} ensayo{items.length !== 1 ? "s" : ""})</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold px-2 py-0.5 rounded-full {dark ? 'bg-indigo-500/30 text-indigo-300' : 'bg-[#e2deef] text-[#6c40d6]'}">
                  Prom: {avg} pts
                </span>
                {#if isCollapsed} <ChevronDown size={16} /> {:else} <ChevronUp size={16} /> {/if}
              </div>
            </button>

            {#if !isCollapsed}
              <div class="overflow-x-auto">
                {#if isMobile}
                  <div class="flex flex-col">
                    {#each items as r}
                      <div class="p-4 border-t {dark ? 'border-white/5' : 'border-black/5'} flex flex-col gap-2">
                        <div class="flex justify-between items-center">
                          <span class="text-[10px] font-bold {dark ? 'text-slate-400' : 'text-slate-600'}">{r.date}</span>
                          <span class="text-xs px-2 py-0.5 rounded bg-white/10 {dark ? 'text-slate-400' : 'text-slate-600'}">{r.group}</span>
                        </div>
                        <div class="flex justify-between items-end">
                          <div>
                            <p class="font-bold text-sm {dark ? 'text-slate-100' : 'text-black'}">{r.asignatura}</p>
                            <p class="text-[10px] {dark ? 'text-slate-400' : 'text-slate-600'}">{r.año} • {Math.floor(r.elapsedSecs / 60)} min • {r.answered}/{r.total} resp.</p>
                          </div>
                          <div class="flex flex-col items-end gap-1">
                            <span class="font-black text-xl {r.score >= 700 ? 'text-emerald-500' : r.score >= 500 ? 'text-amber-400' : 'text-rose-400'}">
                              {r.score}
                            </span>
                            <button onclick={() => onDeleteResult(r.id)} class="text-rose-400">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                {:else}
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="text-xs font-bold uppercase {dark ? 'bg-white/5 text-slate-400' : 'bg-[#f9f7ff] text-slate-500'}">
                        <th class="px-4 py-2 text-left">Fecha</th>
                        <th class="px-4 py-2 text-left">Asignatura</th>
                        <th class="px-4 py-2 text-left">Año</th>
                        <th class="px-4 py-2 text-left">Grupo</th>
                        <th class="px-4 py-2 text-right">Puntaje</th>
                        <th class="px-4 py-2 text-right">Resp.</th>
                        <th class="px-4 py-2 text-right">Tiempo</th>
                        <th class="px-4 py-2" />
                      </tr>
                    </thead>
                    <tbody>
                      {#each items as r, ri}
                        {@const timeStr = `${Math.floor(r.elapsedSecs / 60).toString().padStart(2, "0")}:${(r.elapsedSecs % 60).toString().padStart(2, "0")}`}
                        <tr class="border-t {dark ? 'border-white/5' : 'border-black/5'} {ri % 2 === 0 ? (dark ? 'bg-white/0' : 'bg-white') : (dark ? 'bg-white/[0.03]' : 'bg-[#faf9ff]')}">
                          <td class="px-4 py-2.5 {dark ? 'text-slate-400' : 'text-slate-600'}">{r.date}</td>
                          <td class="px-4 py-2.5 font-semibold {dark ? 'text-slate-100' : 'text-black'}">{r.asignatura}</td>
                          <td class="px-4 py-2.5 {dark ? 'text-slate-400' : 'text-slate-600'}">{r.año}</td>
                          <td class="px-4 py-2.5">
                            {#if editingId === r.id}
                              <div class="flex gap-1">
                                <input
                                  class="text-xs p-1 border rounded w-28 focus:outline-none {dark ? 'bg-white/10 border-white/20 text-white' : 'bg-[#f4f2f9] border-black'}"
                                  bind:value={editGroup}
                                />
                                <button class="text-emerald-400 text-xs font-bold px-1" onclick={() => { editingId = null; }}>✓</button>
                              </div>
                            {:else}
                              <span class="text-xs cursor-pointer hover:underline {dark ? 'text-slate-400' : 'text-slate-600'}" onclick={() => { editingId = r.id; editGroup = r.group; }}>{r.group}</span>
                            {/if}
                          </td>
                          <td class="px-4 py-2.5 text-right">
                            <span class="font-black text-base {r.score >= 700 ? 'text-emerald-500' : r.score >= 500 ? 'text-amber-400' : 'text-rose-400'}">
                              {r.score}
                            </span>
                          </td>
                          <td class="px-4 py-2.5 text-right text-xs {dark ? 'text-slate-400' : 'text-slate-600'}">{r.answered}/{r.total}</td>
                          <td class="px-4 py-2.5 text-right text-xs font-mono {dark ? 'text-slate-400' : 'text-slate-600'}">{timeStr}</td>
                          <td class="px-4 py-2.5 text-right">
                            <button onclick={() => onDeleteResult(r.id)} class="text-rose-400 hover:text-rose-300 transition-colors p-1" title="Eliminar">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
