"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, PenTool, Circle } from "lucide-react";

const COLORS = ["#818cf8", "#f472b6", "#4ade80", "#facc15", "#f87171", "#ffffff"];
const SIZES = [2, 4, 7, 12];

export default function CanvasBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const [penColor, setPenColor] = useState(COLORS[0]);
  const [penSize, setPenSize] = useState(SIZES[1]);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    if (canvasData) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = canvasData;
    }
    ctx.strokeStyle = isEraser ? "#05050A" : penColor;
    ctx.lineWidth = isEraser ? 24 : penSize;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  }, [canvasData, penColor, penSize, isEraser]);

  const getCtx = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = isEraser ? "#05050A" : penColor;
      ctx.lineWidth = isEraser ? 24 : penSize;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
    }
    return ctx;
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getPos(e);
    const ctx = getCtx();
    if (ctx) { ctx.beginPath(); ctx.moveTo(x, y); }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = getCtx();
    if (ctx) { ctx.lineTo(x, y); ctx.stroke(); }
  };

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      setCanvasData(canvasRef.current.toDataURL());
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) { ctx.clearRect(0, 0, canvas.width, canvas.height); setCanvasData(null); }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A14] border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/50">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 bg-white/5 border-b border-white/10 text-slate-300 shrink-0">
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <PenTool size={15} className="text-indigo-400" />
          <span className="text-xs">Apuntes</span>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5 ml-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => { setPenColor(c); setIsEraser(false); }}
              className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${penColor === c && !isEraser ? "border-white scale-110" : "border-transparent"}`}
              style={{ background: c }}
              title={c}
            />
          ))}
        </div>

        {/* Sizes */}
        <div className="flex items-center gap-2 ml-2">
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => { setPenSize(s); setIsEraser(false); }}
              className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all hover:bg-white/10 ${penSize === s && !isEraser ? "bg-white/20 ring-1 ring-white/40" : ""}`}
              title={`Tamaño ${s}`}
            >
              <Circle size={s + 4} className="fill-slate-300 text-slate-300" strokeWidth={0} />
            </button>
          ))}
        </div>

        {/* Eraser */}
        <button
          onClick={() => setIsEraser(!isEraser)}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md border transition-all ml-auto ${isEraser ? "bg-rose-500/30 border-rose-400 text-rose-300" : "border-white/10 hover:border-white/30"}`}
          title="Borrador"
        >
          <Eraser size={13} /> Borrador
        </button>

        <button
          onClick={clearCanvas}
          className="flex items-center gap-1 text-xs hover:text-rose-400 transition-colors px-1"
          title="Limpiar todo"
        >
          Limpiar
        </button>
      </div>

      <div
        ref={containerRef}
        className="flex-1 w-full bg-[#05050A] cursor-crosshair relative touch-none"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="block w-full h-full"
        />
        {!canvasData && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <span className="font-outfit text-4xl font-black text-indigo-400/50 -rotate-12">
              Dibuja Aquí
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
