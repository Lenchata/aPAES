<script lang="ts">
  import { PenBox, Trash2, Plus, Play } from 'lucide-svelte';
  
  let { savedExams, sections, onStartExam, onAddClick, onAddSection, onDeleteSection, onRenameSection, onMoveExam, onDeleteExam, onUpdateExam, dark, isMobile } = $props();

  let draggingId = $state<number | null>(null);
  let dragOverSection = $state<string | null>(null);
  let editingSectionId = $state<string | null>(null);
  let editingName = $state("");
  let showAddSection = $state(false);
  let newSectionName = $state("");

  // Context menu
  let ctxMenu = $state<{ examId: number; x: number; y: number } | null>(null);
  let editingLabelId = $state<number | null>(null);
  let editingLabel = $state("");

  const STATUSES = [
    { key: "none", label: "Sin estado", color: "bg-gray-400", icon: "○" },
    { key: "pending", label: "Pendiente", color: "bg-amber-400", icon: "◑" },
    { key: "completed", label: "Completado", color: "bg-emerald-500", icon: "●" },
  ] as const;

  const handleAddSection = () => {
    const name = newSectionName.trim();
    if (!name) return;
    onAddSection(name);
    newSectionName = "";
    showAddSection = false;
  };

  const closeCtxMenu = () => ctxMenu = null;
</script>

<div class="w-full flex flex-col gap-6">
  {#each sections as section}
    {@const exams = savedExams.filter((e: any) => (e.sectionId || "default") === section.id)}
    {@const isOver = dragOverSection === section.id}
    <div
      ondragover={(e) => { e.preventDefault(); dragOverSection = section.id; }}
      ondragleave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) dragOverSection = null; }}
      ondrop={(e) => {
        e.preventDefault();
        if (draggingId !== null) onMoveExam(draggingId, section.id);
        draggingId = null;
        dragOverSection = null;
      }}
      class="rounded-2xl border-[3px] transition-all duration-200 {dark
        ? isOver ? 'border-indigo-400 bg-[#1e1245]' : 'bg-[#2a1a5e] border-white/10'
        : isOver ? 'border-[#6c40d6] bg-[#ede8f8]' : 'bg-[#6136af] border-black'
      }"
    >
      <div class="flex items-center justify-between px-5 py-3 border-b-[2px] {dark ? 'border-white/10' : 'border-black/20'}">
        {#if editingSectionId === section.id}
          <div class="flex items-center gap-2 flex-1">
            <input
              class="text-sm font-bold px-2 py-1 rounded border-2 focus:outline-none flex-1 max-w-[220px] {dark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-black text-black'}"
              bind:value={editingName}
              onkeydown={(e) => {
                if (e.key === "Enter") { onRenameSection(section.id, editingName); editingSectionId = null; }
                if (e.key === "Escape") editingSectionId = null;
              }}
              use:focus
            />
            <button onclick={() => { onRenameSection(section.id, editingName); editingSectionId = null; }} class="text-emerald-400 font-black text-sm px-2 py-1 hover:bg-emerald-400/10 rounded">✓</button>
            <button onclick={() => editingSectionId = null} class="text-rose-400 font-black text-sm px-2 py-1 hover:bg-rose-400/10 rounded">✕</button>
          </div>
        {:else}
          <h2
            class="text-[1.1rem] text-white font-extrabold tracking-tight uppercase cursor-pointer select-none"
            style="-webkit-text-stroke: 1px rgba(0,0,0,0.4); text-shadow: 1.5px 1.5px 0 rgba(0,0,0,0.3)"
            ondblclick={() => { editingSectionId = section.id; editingName = section.name; }}
          >
            {section.name}
            <span class="ml-2 text-[10px] font-normal opacity-60 normal-case" style="-webkit-text-stroke: 0px">({exams.length} ensayo{exams.length !== 1 ? "s" : ""})</span>
          </h2>
        {/if}
        <div class="flex items-center gap-1">
          <button
            onclick={() => { editingSectionId = section.id; editingName = section.name; }}
            class="text-white/40 hover:text-white/80 transition-colors p-1.5 rounded hover:bg-white/10"
          >
            <PenBox size={13} />
          </button>
          {#if section.id !== "default"}
            <button
              onclick={() => onDeleteSection(section.id)}
              class="text-rose-400/60 hover:text-rose-400 transition-colors p-1.5 rounded hover:bg-rose-400/10"
            >
              <Trash2 size={13} />
            </button>
          {/if}
        </div>
      </div>

      <div class="p-4 grid {isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4">
        {#each exams as exam}
          {@const status = STATUSES.find(s => s.key === (exam.status || "none")) ?? STATUSES[0]}
          {@const displayLabel = exam.customLabel || exam.metadata?.asignatura || "Ensayo"}
          <div
            draggable="true"
            ondragstart={(e) => { draggingId = exam.id; e.dataTransfer!.effectAllowed = "move"; }}
            ondragend={() => { draggingId = null; dragOverSection = null; }}
            onclick={() => { if (draggingId === null && ctxMenu === null) onStartExam({ questions: exam.data, meta: { ...exam.metadata, id: exam.id } }); }}
            oncontextmenu={(e) => { e.preventDefault(); ctxMenu = { examId: exam.id, x: e.clientX, y: e.clientY }; }}
            class="group relative aspect-[3/4] bg-[#e3f4e3] border-[3px] border-black rounded-lg p-3 flex flex-col cursor-grab active:cursor-grabbing transition-all hover:-translate-y-1 overflow-hidden select-none {draggingId === exam.id ? 'opacity-30 scale-95' : ''}"
          >
            {#if exam.status && exam.status !== "none"}
              <div class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border border-black {status.color} z-10" title={status.label}></div>
            {/if}
            {#if exam.isGlobal}
              <div class="absolute top-1.5 right-1.5 bg-[#6c40d6] text-white text-[8px] font-black px-1.5 rounded border border-black z-10">GLOBAL</div>
            {/if}
            <div class="flex justify-between items-center bg-[#298d5c] text-white px-2 py-0.5 rounded text-[10px] font-bold mb-2 border-2 border-black">
              <span>{exam.metadata?.año || "2024"}</span>
              <span class="bg-white text-black px-1 rounded-sm text-[8px] uppercase">{exam.metadata?.asignatura?.substring(0, 3) || "GEN"}</span>
            </div>
            {#if editingLabelId === exam.id}
              <input
                class="text-[10px] font-black text-center border-y-2 border-black py-1 my-1 uppercase bg-white text-black w-full focus:outline-none"
                bind:value={editingLabel}
                onkeydown={(e) => {
                  if (e.key === "Enter") { onUpdateExam(exam.id, { customLabel: editingLabel }); editingLabelId = null; }
                  if (e.key === "Escape") editingLabelId = null;
                }}
                onblur={() => { onUpdateExam(exam.id, { customLabel: editingLabel }); editingLabelId = null; }}
                onclick={(e) => e.stopPropagation()}
                use:focus
              />
            {:else}
              <div class="text-[11px] font-black text-center border-y-2 border-black py-2 my-1 leading-tight uppercase">
                {displayLabel}
              </div>
            {/if}
            <div class="flex-1 mt-2 flex justify-center items-center">
              <Play size={28} class="opacity-20 group-hover:opacity-100 transition-opacity text-[#298d5c] fill-[#298d5c]" stroke="black" stroke-width="3" />
            </div>
            <p class="text-center mt-auto text-[9px] font-bold pt-2 border-t-2 border-dashed border-black">{exam.data?.length || 0} preguntas</p>
          </div>
        {/each}

        {#if section.id === "default"}
          <div
            onclick={onAddClick}
            class="aspect-[3/4] border-[3px] border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-transform hover:-translate-y-1 {dark ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-white border-black hover:bg-[#f0edf9]'}"
          >
            <div class="w-14 h-14 bg-[#6c40d6] rounded-full border-[3px] border-black flex items-center justify-center text-white">
              <Plus size={28} strokeWidth={4} />
            </div>
            <span class="font-extrabold text-[11px] text-center mt-2 {dark ? 'text-slate-300' : 'text-black'}">Añadir Ensayo</span>
          </div>
        {/if}

        {#if exams.length === 0 && section.id !== "default"}
          <div class="col-span-full flex flex-col items-center justify-center py-8 gap-2 opacity-40">
            <p class="text-white text-[11px] font-bold">Arrastra ensayos aquí</p>
          </div>
        {/if}
      </div>
    </div>
  {/each}

  {#if showAddSection}
    <div class="flex items-center gap-2 p-4 rounded-xl border-[2px] {dark ? 'border-white/10 bg-white/5' : 'border-black bg-white'}">
      <input
        class="text-sm font-bold px-3 py-2 rounded-lg border-[2px] focus:outline-none flex-1 max-w-xs {dark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/30' : 'bg-[#f4f2f9] border-black text-black'}"
        bind:value={newSectionName}
        placeholder="Nombre de la sección..."
        onkeydown={(e) => { if (e.key === "Enter") handleAddSection(); if (e.key === "Escape") { showAddSection = false; newSectionName = ""; } }}
        use:focus
      />
      <button onclick={handleAddSection} class="px-4 py-2 bg-[#6c40d6] text-white font-black text-sm border-[3px] border-black rounded-lg hover:bg-[#5b3eb8] transition-all">
        Crear
      </button>
      <button onclick={() => { showAddSection = false; newSectionName = ""; }} class="px-3 py-2 font-bold text-sm border-2 rounded-lg {dark ? 'border-white/20 text-slate-400 hover:bg-white/10' : 'border-black text-black hover:bg-black/5'}">
        Cancelar
      </button>
    </div>
  {:else}
    <button
      onclick={() => showAddSection = true}
      class="flex items-center gap-2 px-5 py-3 font-extrabold text-sm border-[3px] rounded-xl transition-all hover:-translate-y-0.5 w-full justify-center {dark ? 'bg-white/5 border-white/20 text-slate-200 hover:bg-white/10' : 'bg-white border-black text-black hover:bg-[#f0edf9]'}"
    >
      <Plus size={18} strokeWidth={3} />
      Nueva Sección
    </button>
  {/if}
</div>

{#if ctxMenu}
  {@const exam = savedExams.find((e: any) => e.id === ctxMenu!.examId)}
  {#if exam}
    {@const status = STATUSES.find(s => s.key === (exam.status || "none")) ?? STATUSES[0]}
    {@const nextStatus = STATUSES[(STATUSES.findIndex(s => s.key === status.key) + 1) % STATUSES.length]}
    <div class="fixed inset-0 z-40" onclick={closeCtxMenu} oncontextmenu={(e) => { e.preventDefault(); closeCtxMenu(); }}></div>
    <div
      class="fixed z-50 min-w-[180px] rounded-xl border-[3px] overflow-hidden text-sm font-bold {dark ? 'bg-[#1a0f38] border-white/20 text-slate-100' : 'bg-white border-black text-black'}"
      style="top: {Math.min(ctxMenu.y, 800)}px; left: {Math.min(ctxMenu.x, 1000)}px"
    >
      <div class="px-4 py-2 text-[10px] uppercase tracking-widest font-black opacity-50 border-b-2 {dark ? 'border-white/10' : 'border-black/10'}">
        {exam.customLabel || exam.metadata?.asignatura || "Ensayo"}
      </div>
      <button
        class="w-full flex items-center gap-3 px-4 py-3 transition-colors {dark ? 'hover:bg-white/10' : 'hover:bg-[#f0edf9]'}"
        onclick={() => {
          editingLabelId = exam.id;
          editingLabel = exam.customLabel || exam.metadata?.asignatura || "";
          closeCtxMenu();
        }}
      >
        <PenBox size={15} class={dark ? "text-indigo-400" : "text-[#6c40d6]"} />
        Renombrar
      </button>
      <button
        class="w-full flex items-center gap-3 px-4 py-3 transition-colors {dark ? 'hover:bg-white/10' : 'hover:bg-[#f0edf9]'}"
        onclick={() => { onUpdateExam(exam.id, { status: nextStatus.key }); closeCtxMenu(); }}
      >
        <span class="w-3.5 h-3.5 rounded-full border-2 border-black shrink-0 {nextStatus.color}"></span>
        Estado: <span class="opacity-60">{status.label}</span> → <span>{nextStatus.label}</span>
      </button>
      <div class="border-t-2 {dark ? 'border-white/10' : 'border-black/10'}"></div>
      <button
        class="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 transition-colors"
        onclick={() => { onDeleteExam(exam.id); closeCtxMenu(); }}
      >
        <Trash2 size={15} />
        Eliminar ensayo
      </button>
    </div>
  {/if}
{/if}

<script context="module">
  function focus(node: HTMLElement) {
    node.focus();
  }
</script>
