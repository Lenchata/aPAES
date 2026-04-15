<script lang="ts">
  import { onMount } from "svelte";
  import ExamPlayer from "$lib/components/ExamPlayer.svelte";
  import InicioTab from "$lib/components/InicioTab.svelte";
  import PracticarTab from "$lib/components/PracticarTab.svelte";
  import ProgresoTab from "$lib/components/ProgresoTab.svelte";
  import ConfiguracionTab from "$lib/components/ConfiguracionTab.svelte";
  import {
    Menu, Home as HomeIcon, PenBox, Settings, Plus, Play,
    Moon, Sun, BarChart2, Trash2, FolderOpen, ChevronDown, ChevronUp,
  } from "lucide-svelte";

  // Types
  type Goals = {
    puntajeDeseado: number;
    ensayosSemanales: number;
    pruebasSeleccionadas: string[];
    puntajesPorPrueba: Record<string, number>;
  };

  type ExamResult = {
    id: number;
    examId: number;
    examLabel: string;
    asignatura: string;
    año: number | string;
    score: number;
    answered: number;
    total: number;
    elapsedSecs: number;
    group: string;
    date: string;
  };

  type Section = { id: string; name: string; };

  const DEFAULT_GOALS: Goals = {
    puntajeDeseado: 850,
    ensayosSemanales: 3,
    pruebasSeleccionadas: ["m1", "cl"],
    puntajesPorPrueba: { m1: 750, m2: 700, cl: 800, hist: 650, cien: 680 },
  };

  // State
  let activeTab = $state("Practicar");
  let activeExam = $state<{ questions: any[]; meta: any } | null>(null);
  let isMenuOpen = $state(true);
  let savedExams = $state<any[]>([]);
  let globalExams = $state<any[]>([]);
  let results = $state<ExamResult[]>([]);
  let goals = $state<Goals>(DEFAULT_GOALS);
  let sections = $state<Section[]>([{ id: "default", name: "Sin categoría" }]);
  let dark = $state(false);
  let isMobile = $state(false);

  onMount(() => {
    const check = () => isMobile = window.innerWidth < 1024;
    check();
    window.addEventListener("resize", check);

    // Initial fetch
    fetch('/api/user/data')
      .then(r => r.json())
      .then(data => {
        if (data.savedExams) savedExams = data.savedExams;
        if (data.results) results = data.results;
        if (data.goals) goals = data.goals;
        if (data.sections) sections = data.sections;
        if (data.dark !== undefined) dark = data.dark;
      })
      .catch(console.error);

    fetch('/api/global-exams')
      .then(r => r.json())
      .then(data => globalExams = Array.isArray(data) ? data : [])
      .catch(console.error);

    return () => window.removeEventListener("resize", check);
  });

  const sync = (patch: any) => {
    const fullData = { savedExams, results, goals, sections, dark, ...patch };
    fetch('/api/user/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullData)
    }).catch(console.error);
  };

  const toggleDark = () => {
    dark = !dark;
    sync({ dark });
  };

  // Shortcuts
  onMount(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      switch (e.key.toLowerCase()) {
        case "i": activeTab = "Inicio"; break;
        case "p": activeTab = "Practicar"; break;
        case "g": activeTab = "Progreso"; break;
        case "c": activeTab = "Configuracion"; break;
        case "m": isMenuOpen = !isMenuOpen; break;
        case "d": toggleDark(); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const allExams = $derived([...globalExams, ...savedExams]);

  const saveExam = (metadata: any, data: any) => {
    savedExams = [...savedExams, { metadata, data, id: Date.now(), sectionId: "default" }];
    sync({ savedExams });
    activeTab = "Practicar";
  };

  const saveResult = (r: ExamResult) => {
    results = [...results, r];
    sync({ results });
  };

  const deleteResult = (id: number) => {
    results = results.filter(r => r.id !== id);
    sync({ results });
  };

  const updateGoals = (g: Goals) => {
    goals = g;
    sync({ goals });
  };

  const addSection = (name: string) => {
    sections = [...sections, { id: `sec_${Date.now()}`, name }];
    sync({ sections });
  };

  const deleteSection = (id: string) => {
    savedExams = savedExams.map(e => e.sectionId === id ? { ...e, sectionId: "default" } : e);
    sections = sections.filter(s => s.id !== id);
    sync({ savedExams, sections });
  };

  const renameSection = (id: string, name: string) => {
    sections = sections.map(s => s.id === id ? { ...s, name } : s);
    sync({ sections });
  };

  const moveExam = (examId: number, sectionId: string) => {
    savedExams = savedExams.map(e => e.id === examId ? { ...e, sectionId } : e);
    sync({ savedExams });
  };

  const deleteExam = (examId: number) => {
    savedExams = savedExams.filter(e => e.id !== examId);
    sync({ savedExams });
  };

  const updateExam = (examId: number, patch: Record<string, any>) => {
    savedExams = savedExams.map(e => e.id === examId ? { ...e, ...patch } : e);
    sync({ savedExams });
  };

  // Nav configuration
  const tabs = [
    { id: "Inicio", icon: HomeIcon },
    { id: "Practicar", icon: PenBox },
    { id: "Progreso", icon: BarChart2 },
    { id: "Configuracion", icon: Settings },
  ];

  const bgCls = $derived(dark ? "bg-[#0d0d18]" : "bg-[#ded9ed]");
  const navBgCls = $derived(dark ? "bg-[#1a0f38]" : "bg-[#351b69]");
  const txCls = $derived(dark ? "text-slate-100" : "text-black");
  const borderCls = $derived(dark ? "border-white/10" : "border-black");
</script>

<div class="min-h-screen flex {isMobile ? 'flex-col' : ''} font-sans {bgCls} {txCls} transition-colors duration-300">
  {#if activeExam}
    <ExamPlayer
      questions={activeExam.questions}
      examMeta={activeExam.meta}
      onExit={() => activeExam = null}
      onSaveResult={(r) => saveResult(r)}
    />
  {:else if isMobile}
    <!-- Mobile UI -->
    <header class="h-16 shrink-0 {navBgCls} border-b-[3px] {borderCls} flex items-center justify-between px-5 z-20">
      <div class="flex items-center gap-2">
        <img fetchPriority="high" src="/apaes.svg" alt="logo" class="w-8 h-8" />
        <span class="text-xl text-white font-bowlby tracking-wider" style="-webkit-text-stroke: 1px black">aPAES</span>
      </div>
      <button aria-label="Modo oscuro" onclick={toggleDark} class="text-white p-2 rounded-lg bg-white/10">
        {#if dark} <Sun size={20} /> {:else} <Moon size={20} /> {/if}
      </button>
    </header>

    <main class="flex-1 overflow-y-auto pb-24 p-5">
      <div class="max-w-xl mx-auto w-full">
        {#if activeTab === "Inicio"}
          <InicioTab {goals} {results} {dark} isMobile={true} />
        {:else if activeTab === "Practicar"}
          <PracticarTab
            savedExams={allExams} {sections}
            onStartExam={(e: any) => activeExam = e}
            onAddClick={() => activeTab = "Configuracion"}
            onAddSection={addSection} onDeleteSection={deleteSection} onRenameSection={renameSection} 
            onMoveExam={moveExam} onDeleteExam={deleteExam} onUpdateExam={updateExam}
            {dark} isMobile={true}
          />
        {:else if activeTab === "Progreso"}
          <ProgresoTab {goals} {results} onUpdateGoals={updateGoals} onDeleteResult={deleteResult} {dark} isMobile={true} />
        {:else if activeTab === "Configuracion"}
          <ConfiguracionTab onSaveExam={saveExam} {dark} isMobile={true} />
        {/if}
      </div>
    </main>

    <nav class="fixed bottom-0 left-0 right-0 h-20 {navBgCls} border-t-[4px] {borderCls} flex items-center justify-around px-2 z-20 pb-safe">
      {#each tabs as tab}
        {@const active = activeTab === tab.id}
        <button
          onclick={() => activeTab = tab.id}
          class="flex flex-col items-center gap-1 transition-all {active ? 'text-white scale-110' : 'text-white/50'}"
        >
          <div class="p-2 rounded-xl transition-all {active ? 'bg-[#6c40d6] border-[2px] border-black shadow-[2px_2px_0_#000]' : ''}">
            <tab.icon size={24} stroke-width={active ? 3 : 2} />
          </div>
          <span class="text-[10px] font-black uppercase tracking-tighter">{tab.id}</span>
        </button>
      {/each}
    </nav>
  {:else}
    <!-- Desktop UI -->
    <nav class="{isMenuOpen ? 'w-64' : 'w-20'} transition-all duration-300 {navBgCls} border-r-[4px] {borderCls} flex flex-col items-center py-6 shrink-0 z-10">
      <button
        class="w-full flex {isMenuOpen ? 'justify-end px-4' : 'justify-center'} mb-4 text-white hover:text-purple-300 transition-colors"
        onclick={() => isMenuOpen = !isMenuOpen}
      >
        <Menu size={36} stroke-width="2.5" />
      </button>

      <div class="flex flex-col items-center transition-all duration-300 {isMenuOpen ? 'opacity-100 mb-16' : 'opacity-0 h-0 overflow-hidden mb-0 pointer-events-none'}">
        <div class="w-[180px] h-[180px] mb-3">
          <img fetchPriority="high" src="/apaes.svg" alt="aPAES logo" class="w-full h-full drop-shadow-md object-contain" />
        </div>
        <span class="text-[2.2rem] text-white tracking-widest text-center font-bowlby" style="-webkit-text-stroke: 1.5px black; text-shadow: 2px 2px 0 #000">
          aPAES
        </span>
      </div>

      <div class="w-full px-3 flex flex-col gap-4">
        {#each tabs as tab}
          <button
            onclick={() => activeTab = tab.id}
            title={tab.id}
            class="w-full py-2.5 px-3 flex items-center {isMenuOpen ? 'justify-start' : 'justify-center'} gap-3 text-lg font-extrabold border-[3px] border-black rounded transition-all text-white
              {activeTab === tab.id ? 'bg-[#6c40d6] translate-y-0.5' : 'bg-[#5b3eb8] hover:-translate-y-0.5 hover:bg-[#6c40d6]'}"
          >
            <tab.icon size={22} stroke-width="2.5" class="shrink-0" />
            {#if isMenuOpen} <span>{tab.id}</span> {/if}
          </button>
        {/each}
      </div>

      <div class="mt-auto w-full px-3 pt-6">
        <button
          onclick={toggleDark}
          class="w-full py-2 px-3 flex items-center {isMenuOpen ? 'justify-start' : 'justify-center'} gap-3 text-sm font-bold border-[2px] border-white/20 rounded-lg transition-all text-white hover:bg-white/10"
        >
          {#if dark} <Sun size={20} /> {:else} <Moon size={20} /> {/if}
          {#if isMenuOpen} <span>{dark ? "Modo Claro" : "Modo Oscuro"}</span> {/if}
        </button>
      </div>
    </nav>

    <main class="flex-1 p-10 overflow-y-auto outline-none">
      <div class="max-w-5xl mx-auto w-full">
        {#if activeTab === "Inicio"}
          <InicioTab {goals} {results} {dark} isMobile={false} />
        {:else if activeTab === "Practicar"}
          <PracticarTab
            savedExams={allExams} {sections}
            onStartExam={(e: any) => activeExam = e}
            onAddClick={() => activeTab = "Configuracion"}
            onAddSection={addSection} onDeleteSection={deleteSection} onRenameSection={renameSection} 
            onMoveExam={moveExam} onDeleteExam={deleteExam} onUpdateExam={updateExam}
            {dark} isMobile={false}
          />
        {:else if activeTab === "Progreso"}
          <ProgresoTab {goals} {results} onUpdateGoals={updateGoals} onDeleteResult={deleteResult} {dark} isMobile={false} />
        {:else if activeTab === "Configuracion"}
          <ConfiguracionTab onSaveExam={saveExam} {dark} isMobile={false} />
        {/if}
      </div>
    </main>
  {/if}
</div>
