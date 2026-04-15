<script lang="ts">
  import { onMount } from 'svelte';
  import CanvasBoard from './CanvasBoard.svelte';
  import { Clock, CheckCircle2, ChevronRight, ChevronLeft, LogOut, Save, X } from 'lucide-svelte';

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

  type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };

  let { questions, examMeta, onExit, onSaveResult } = $props<{
    questions: Question[];
    examMeta?: any;
    onExit: () => void;
    onSaveResult?: (r: ExamResult) => void;
  }>();

  let currentIndex = $state(0);
  let answers = $state<{ [key: number]: string }>({});
  let startTime = $state(Date.now());
  let elapsed = $state(0);
  let isFinished = $state(false);
  let group = $state("");
  let saved = $state(false);
  let isMobile = $state(false);

  onMount(() => {
    const check = () => isMobile = window.innerWidth < 1024;
    check();
    window.addEventListener("resize", check);

    const iv = setInterval(() => {
      if (!isFinished) {
        elapsed = Math.floor((Date.now() - startTime) / 1000);
      }
    }, 1000);

    return () => {
      window.removeEventListener("resize", check);
      clearInterval(iv);
    };
  });

  const mins = $derived(Math.floor(elapsed / 60).toString().padStart(2, "0"));
  const secs = $derived((elapsed % 60).toString().padStart(2, "0"));
  const question = $derived(questions[currentIndex]);

  const handleSelect = (letter: string) => {
    answers = { ...answers, [question.id]: letter };
  };

  const finishExam = () => {
    if (confirm("¿Seguro que deseas terminar el ensayo y ver tus resultados?")) isFinished = true;
  };

  const calcScore = (ans: Record<number, string>) => {
    const correct = questions.filter((q: Question) => ans[q.id] === q.correctAnswer).length;
    return Math.round((correct / questions.length) * 1000);
  };

  const handleSave = () => {
    const score = calcScore(answers);
    const correct = questions.filter((q: Question) => answers[q.id] === q.correctAnswer).length;
    const result: ExamResult = {
      id: Date.now(),
      examId: examMeta?.id ?? 0,
      examLabel: examMeta?.asignatura ?? "Ensayo",
      asignatura: examMeta?.asignatura ?? "General",
      año: examMeta?.año ?? new Date().getFullYear(),
      score,
      answered: correct,
      total: questions.length,
      elapsedSecs: elapsed,
      group: group.trim() || "Sin grupo",
      date: new Date().toLocaleDateString("es-CL"),
    };
    onSaveResult?.(result);
    saved = true;
  };

  const correctCount = $derived(questions.filter((q: Question) => answers[q.id] === q.correctAnswer).length);
  const incorrectCount = $derived(questions.filter((q: Question) => q.id in answers && answers[q.id] !== q.correctAnswer).length);
  const unansweredCount = $derived(questions.length - Object.keys(answers).length);
  const pct = $derived(Math.round((correctCount / questions.length) * 100));
  const autoScore = $derived(calcScore(answers));
</script>

<div class="min-h-screen bg-[#05050A] text-white flex flex-col font-inter">
  {#if isFinished}
    <div class="min-h-screen bg-[#05050A] text-white flex items-center justify-center p-6">
      <div class="bg-[#0A0A14] border border-white/10 rounded-3xl p-10 w-full max-w-xl flex flex-col gap-6 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.25)]">
        <div class="flex flex-col items-center gap-3">
          <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center">
            <CheckCircle2 size={44} class="text-white" />
          </div>
          <h1 class="font-outfit text-3xl font-extrabold">Ensayo Finalizado</h1>
          <p class="text-slate-400 text-center text-sm">{mins}:{secs} de tiempo total</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Puntaje calculado automáticamente</p>
          <div class="flex items-end gap-2">
            <span class="text-7xl font-black text-indigo-300 tabular-nums">{autoScore}</span>
            <span class="text-2xl text-slate-500 mb-3">/1000</span>
          </div>
          <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all"
              style="width: {pct}%; background: {pct >= 70 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f87171'}"
            ></div>
          </div>
          <div class="flex gap-5 text-sm mt-1">
            <div class="flex items-center gap-1.5">
              <CheckCircle2 size={14} class="text-emerald-400" />
              <span class="text-slate-300 font-semibold">{correctCount} correctas</span>
            </div>
            <div class="flex items-center gap-1.5">
              <X size={14} class="text-rose-400" />
              <span class="text-slate-300 font-semibold">{incorrectCount} incorrectas</span>
            </div>
            {#if unansweredCount > 0}
              <div class="flex items-center gap-1.5">
                <span class="text-slate-500 font-semibold">{unansweredCount} sin responder</span>
              </div>
            {/if}
          </div>
          <p class="text-xs text-slate-500 text-center mt-1">
            Fórmula: ({correctCount} correctas / {questions.length} total) × 1000 = {autoScore} pts
          </p>
        </div>

        {#if !saved}
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-slate-400 text-xs font-semibold" for="group">Grupo (opcional, ej: "Matemática PAES 2025")</label>
              <input
                id="group"
                type="text"
                placeholder="Sin grupo"
                class="p-2.5 rounded-lg border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-indigo-400"
                bind:value={group}
              />
            </div>
            <button
              onclick={handleSave}
              class="flex items-center justify-center gap-2 w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl transition-all"
            >
              <Save size={18} /> Guardar Resultado
            </button>
          </div>
        {:else}
          <div class="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-5 flex flex-col items-center gap-2">
            <CheckCircle2 size={28} class="text-emerald-400" />
            <p class="font-bold text-emerald-300">¡Resultado guardado!</p>
            <p class="text-slate-400 text-sm text-center">
              <strong class="text-white">{autoScore} pts</strong> registrado en el grupo <strong class="text-white">{group || "Sin grupo"}</strong>.
            </p>
          </div>
        {/if}

        <button
          onclick={onExit}
          class="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/10"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  {:else}
    <header class="{isMobile ? 'h-16 px-4' : 'h-20 px-8'} border-b border-white/10 flex items-center justify-between bg-[#0A0A14] sticky top-0 z-50">
      <button
        onclick={() => { if (confirm("¿Salir sin guardar?")) onExit(); }}
        class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors border border-white/10 {isMobile ? 'p-2' : 'px-4 py-2'} rounded-lg"
      >
        <LogOut size={18} /> {!isMobile ? "Salir" : ""}
      </button>
      <div class="flex {isMobile ? 'gap-2' : 'gap-6'} items-center">
        <div class="{isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2'} bg-white/5 rounded-lg border border-white/10 font-mono font-bold tracking-widest text-indigo-400 flex items-center gap-2">
          <Clock size={isMobile ? 14 : 18} /> {mins}:{secs}
        </div>
        <div class="{isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2'} bg-gradient-to-r from-indigo-500/20 to-transparent rounded-lg border border-indigo-500/30 text-indigo-200 font-semibold">
          {isMobile ? `${currentIndex + 1}/${questions.length}` : `Pregunta ${currentIndex + 1} / ${questions.length}`}
        </div>
      </div>
    </header>

    <main class="flex-1 flex overflow-hidden {isMobile ? 'flex-col p-4' : 'p-6 gap-6'} relative">
      <div class="absolute top-0 right-1/4 w-[600px] h-[600px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <section class="flex-1 overflow-y-auto {isMobile ? '' : 'pr-4'} flex flex-col pt-4">
        <div class="{isMobile ? 'w-full' : 'max-w-3xl w-full'} mx-auto flex-1 flex flex-col">
          {#if question}
            <div class="{isMobile ? 'p-5 mb-4 text-lg' : 'p-8 mb-8 text-2xl'} bg-white/5 border border-white/10 rounded-3xl shadow-lg z-10">
              <h2 class="font-semibold leading-relaxed whitespace-pre-wrap font-outfit">{question.text}</h2>
            </div>

            <div class="space-y-3 md:space-y-4 mb-8 md:mb-12 flex-1">
              {#each question.options as opt, idx}
                {@const letter = String.fromCharCode(65 + idx)}
                {@const isSelected = answers[question.id] === letter}
                <button
                  onclick={() => handleSelect(letter)}
                  class="w-full text-left {isMobile ? 'p-4' : 'p-5'} rounded-2xl border transition-all duration-200 flex items-start gap-4
                    {isSelected
                      ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.3)] translate-x-1'
                      : 'bg-[#0A0A14] border-white/10 hover:border-white/30 hover:bg-white/5'}"
                >
                  <span class="font-bold mt-0.5 {isSelected ? 'text-indigo-200' : 'text-slate-500'}">{letter}</span>
                  <span class="leading-relaxed text-sm md:text-base {isSelected ? 'text-white font-medium' : 'text-slate-300'}">{opt}</span>
                </button>
              {/each}
            </div>
          {/if}

          <div class="flex justify-between mt-auto pt-6 border-t border-white/10 z-10 {isMobile ? 'pb-4' : ''}">
            <button
              onclick={() => currentIndex = Math.max(0, currentIndex - 1)}
              disabled={currentIndex === 0}
              class="{isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'} flex items-center gap-2 rounded-xl border border-white/10 bg-[#0A0A14] hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={isMobile ? 16 : 20} /> {!isMobile ? "Anterior" : ""}
            </button>
            {#if currentIndex === questions.length - 1}
              <button
                onclick={finishExam}
                class="{isMobile ? 'px-6 py-2 text-sm' : 'px-8 py-3 font-bold'} flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
              >
                <CheckCircle2 size={isMobile ? 16 : 20} /> Finalizar
              </button>
            {:else}
              <button
                onclick={() => currentIndex = Math.min(questions.length - 1, currentIndex + 1)}
                class="{isMobile ? 'px-6 py-2 text-sm' : 'px-8 py-3 font-bold'} flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"
              >
                {!isMobile ? "Siguiente" : ""} <ChevronRight size={isMobile ? 16 : 20} />
              </button>
            {/if}
          </div>
          <div class="h-10"></div>
        </div>
      </section>

      {#if !isMobile}
        <aside class="w-[480px] shrink-0 h-full shadow-2xl z-10 flex flex-col">
          <CanvasBoard />
        </aside>
      {/if}
    </main>
  {/if}
</div>
