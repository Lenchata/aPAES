"use client";

import { useState, useEffect } from "react";
import CanvasBoard from "./CanvasBoard";
import { Clock, CheckCircle2, ChevronRight, ChevronLeft, LogOut, Save, X } from "lucide-react";

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

export default function ExamPlayer({
  questions,
  examMeta,
  onExit,
  onSaveResult,
}: {
  questions: any[];
  examMeta?: any;
  onExit: () => void;
  onSaveResult?: (r: ExamResult) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [group, setGroup] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isFinished) return;
    const iv = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(iv);
  }, [isFinished, startTime]);

  const mins = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const secs = (elapsed % 60).toString().padStart(2, "0");
  const question = questions[currentIndex];

  const handleSelect = (letter: string) => setAnswers({ ...answers, [question.id]: letter });

  const finishExam = () => {
    if (confirm("¿Seguro que deseas terminar el ensayo y ver tus resultados?")) setIsFinished(true);
  };

  // Auto-calculated score: correct / total * 1000, rounded
  const calcScore = (ans: Record<number, string>) => {
    const correct = questions.filter(q => ans[q.id] === q.correctAnswer).length;
    return Math.round((correct / questions.length) * 1000);
  };

  const handleSave = () => {
    const score = calcScore(answers);
    const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length;
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
    setSaved(true);
  };

  // ── Results screen ───────────────────────────────────────────────
  if (isFinished) {
    const total = questions.length;
    const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const incorrect = questions.filter(q => q.id in answers && answers[q.id] !== q.correctAnswer).length;
    const unanswered = total - Object.keys(answers).length;
    const autoScore = calcScore(answers);
    const pct = Math.round((correct / total) * 100);

    return (
      <div className="min-h-screen bg-[#05050A] text-white flex items-center justify-center p-6">
        <div className="bg-[#0A0A14] border border-white/10 rounded-3xl p-10 w-full max-w-xl flex flex-col gap-6 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.25)]">

          {/* Header */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center">
              <CheckCircle2 size={44} className="text-white" />
            </div>
            <h1 className="font-outfit text-3xl font-extrabold">Ensayo Finalizado</h1>
            <p className="text-slate-400 text-center text-sm">{mins}:{secs} de tiempo total</p>
          </div>

          {/* Auto score */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Puntaje calculado automáticamente</p>
            <div className="flex items-end gap-2">
              <span className="text-7xl font-black text-indigo-300 tabular-nums">{autoScore}</span>
              <span className="text-2xl text-slate-500 mb-3">/1000</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${pct}%`,
                  background: pct >= 70 ? "#34d399" : pct >= 50 ? "#fbbf24" : "#f87171",
                }}
              />
            </div>
            {/* Breakdown */}
            <div className="flex gap-5 text-sm mt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-slate-300 font-semibold">{correct} correctas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <X size={14} className="text-rose-400" />
                <span className="text-slate-300 font-semibold">{incorrect} incorrectas</span>
              </div>
              {unanswered > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 font-semibold">{unanswered} sin responder</span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 text-center mt-1">
              Fórmula: ({correct} correctas / {total} total) × 1000 = {autoScore} pts
            </p>
          </div>

          {/* Group + Save */}
          {!saved ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-slate-400 text-xs font-semibold">Grupo (opcional, ej: "Matemática PAES 2025")</label>
                <input
                  type="text"
                  placeholder="Sin grupo"
                  className="p-2.5 rounded-lg border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-indigo-400"
                  value={group}
                  onChange={e => setGroup(e.target.value)}
                />
              </div>
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl transition-all"
              >
                <Save size={18} /> Guardar Resultado
              </button>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-5 flex flex-col items-center gap-2">
              <CheckCircle2 size={28} className="text-emerald-400" />
              <p className="font-bold text-emerald-300">¡Resultado guardado!</p>
              <p className="text-slate-400 text-sm text-center">
                <strong className="text-white">{autoScore} pts</strong> registrado en el grupo <strong className="text-white">{group || "Sin grupo"}</strong>.
              </p>
            </div>
          )}

          <button
            onClick={onExit}
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/10"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ── Exam screen ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#05050A] text-white flex flex-col font-inter">
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0A0A14] sticky top-0 z-50">
        <button
          onClick={() => { if (confirm("¿Salir sin guardar?")) onExit(); }}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-lg"
        >
          <LogOut size={18} /> Salir
        </button>
        <div className="flex gap-6 items-center">
          <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 font-mono font-bold tracking-widest text-indigo-400 flex items-center gap-2">
            <Clock size={18} /> {mins}:{secs}
          </div>
          <div className="bg-gradient-to-r from-indigo-500/20 to-transparent px-4 py-2 rounded-lg border border-indigo-500/30 text-indigo-200 font-semibold">
            Pregunta {currentIndex + 1} / {questions.length}
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden p-6 gap-6 relative">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

        <section className="flex-1 overflow-y-auto pr-4 flex flex-col pt-4">
          <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-8 shadow-lg z-10">
              <h2 className="text-2xl font-semibold leading-relaxed whitespace-pre-wrap font-outfit">{question.text}</h2>
            </div>

            <div className="space-y-4 mb-12 flex-1">
              {(question.options as string[]).map((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = answers[question.id] === letter;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(letter)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4
                      ${isSelected
                        ? "bg-indigo-500 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.3)] translate-x-2"
                        : "bg-[#0A0A14] border-white/10 hover:border-white/30 hover:bg-white/5"}`}
                  >
                    <span className={`font-bold mt-0.5 ${isSelected ? "text-indigo-200" : "text-slate-500"}`}>{letter}</span>
                    <span className={`leading-relaxed ${isSelected ? "text-white font-medium" : "text-slate-300"}`}>{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between mt-auto pt-6 border-t border-white/10 z-10">
              <button
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-[#0A0A14] hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} /> Anterior
              </button>
              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={finishExam}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
                >
                  <CheckCircle2 size={20} /> Terminar Ensayo
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"
                >
                  Siguiente <ChevronRight size={20} />
                </button>
              )}
            </div>
            <div className="h-10" />
          </div>
        </section>

        <aside className="w-[480px] shrink-0 h-full shadow-2xl z-10 flex flex-col">
          <CanvasBoard />
        </aside>
      </main>
    </div>
  );
}
// tay ma gueon waton conchetumareeee