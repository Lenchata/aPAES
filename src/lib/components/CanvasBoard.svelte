<script lang="ts">
  import { onMount } from 'svelte';
  import { Eraser, PenTool, Circle } from 'lucide-svelte';

  const COLORS = ["#818cf8", "#f472b6", "#4ade80", "#facc15", "#f87171", "#ffffff"];
  const SIZES = [2, 4, 7, 12];

  let canvas = $state<HTMLCanvasElement | null>(null);
  let container = $state<HTMLDivElement | null>(null);
  let isDrawing = $state(false);
  let canvasData = $state<string | null>(null);
  let penColor = $state(COLORS[0]);
  let penSize = $state(SIZES[1]);
  let isEraser = $state(false);

  const getCtx = () => {
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = isEraser ? "#05050A" : penColor;
      ctx.lineWidth = isEraser ? 24 : penSize;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
    }
    return ctx;
  };

  const resizeCanvas = () => {
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Save current content if any
    const tempData = canvas.toDataURL();
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    if (canvasData) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = tempData;
    }
  };

  onMount(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  });

  const getPos = (e: MouseEvent | TouchEvent) => {
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    isDrawing = true;
    const { x, y } = getPos(e);
    const ctx = getCtx();
    if (ctx) { ctx.beginPath(); ctx.moveTo(x, y); }
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = getCtx();
    if (ctx) { ctx.lineTo(x, y); ctx.stroke(); }
  };

  const stopDrawing = () => {
    if (isDrawing && canvas) {
      canvasData = canvas.toDataURL();
    }
    isDrawing = false;
  };

  const clearCanvas = () => {
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) { ctx.clearRect(0, 0, canvas.width, canvas.height); canvasData = null; }
  };
</script>

<div class="flex flex-col h-full bg-[#0A0A14] border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/50">
  <!-- Toolbar -->
  <div class="flex flex-wrap items-center gap-3 px-4 py-2.5 bg-white/5 border-b border-white/10 text-slate-300 shrink-0">
    <div class="flex items-center gap-1.5 text-sm font-semibold">
      <PenTool size={15} class="text-indigo-400" />
      <span class="text-xs">Apuntes</span>
    </div>

    <!-- Colors -->
    <div class="flex items-center gap-1.5 ml-2">
      {#each COLORS as c}
        <button
          onclick={() => { penColor = c; isEraser = false; }}
          class="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 {penColor === c && !isEraser ? 'border-white scale-110' : 'border-transparent'}"
          style="background: {c}"
          title={c}
        ></button>
      {/each}
    </div>

    <!-- Sizes -->
    <div class="flex items-center gap-2 ml-2">
      {#each SIZES as s}
        <button
          onclick={() => { penSize = s; isEraser = false; }}
          class="flex items-center justify-center w-7 h-7 rounded-lg transition-all hover:bg-white/10 {penSize === s && !isEraser ? 'bg-white/20 ring-1 ring-white/40' : ''}"
          title="Tamaño {s}"
        >
          <Circle size={s + 4} class="fill-slate-300 text-slate-300" stroke-width="0" />
        </button>
      {/each}
    </div>

    <!-- Eraser -->
    <button
      onclick={() => isEraser = !isEraser}
      class="flex items-center gap-1 text-xs px-2 py-1 rounded-md border transition-all ml-auto {isEraser ? 'bg-rose-500/30 border-rose-400 text-rose-300' : 'border-white/10 hover:border-white/30'}"
      title="Borrador"
    >
      <Eraser size={13} /> Borrador
    </button>

    <button
      onclick={clearCanvas}
      class="flex items-center gap-1 text-xs hover:text-rose-400 transition-colors px-1"
      title="Limpiar todo"
    >
      Limpiar
    </button>
  </div>

  <div
    bind:this={container}
    class="flex-1 w-full bg-[#05050A] cursor-crosshair relative touch-none"
  >
    <canvas
      bind:this={canvas}
      onmousedown={startDrawing}
      onmousemove={draw}
      onmouseup={stopDrawing}
      onmouseleave={stopDrawing}
      ontouchstart={startDrawing}
      ontouchmove={draw}
      ontouchend={stopDrawing}
      class="block w-full h-full"
    ></canvas>
    {#if !canvasData}
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <span class="font-outfit text-4xl font-black text-indigo-400/50 -rotate-12">
          Dibuja Aquí
        </span>
      </div>
    {/if}
  </div>
</div>
