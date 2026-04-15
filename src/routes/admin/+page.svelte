<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import {
    Globe, Plus, Trash2, Fingerprint, LogOut,
    Loader2, CheckCircle, Package, AlertCircle, Save,
    Users, ShieldCheck, UserMinus, ShieldAlert
  } from 'lucide-svelte';
  import { startRegistration } from '@simplewebauthn/browser';

  let activeTab = $state<'exams' | 'users'>('exams');
  let globalExams = $state<any[]>([]);
  let users = $state<any[]>([]);
  let admins = $state<any[]>([]);
  let jsonInput = $state('');
  let loading = $state(true);
  let actionLoading = $state(false);
  let message = $state<{ text: string, type: 'success' | 'error' } | null>(null);

  const fetchInitialData = async () => {
    try {
      const res = await fetch('/api/admin/global-exams');
      if (res.status === 401) {
        goto('/admin/login');
        return;
      }
      globalExams = await res.json();

      const resUsers = await fetch('/api/admin/users');
      const resAdmins = await fetch('/api/admin/admins');
      if (resUsers.ok) users = await resUsers.json();
      if (resAdmins.ok) admins = await resAdmins.json();

      loading = false;
    } catch {
      goto('/admin/login');
    }
  };

  onMount(fetchInitialData);

  const showMsg = (text: string, type: 'success' | 'error') => {
    message = { text, type };
    setTimeout(() => message = null, 3000);
  };

  const handleAddPasskey = async () => {
    actionLoading = true;
    try {
      const resOptions = await fetch('/api/admin/passkey/options', { method: 'POST' });
      const options = await resOptions.json();
      if (options.error) throw new Error(options.error);

      const attResp = await startRegistration({ optionsJSON: options });
      const resVerify = await fetch('/api/admin/passkey/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attResp),
      });

      const data = await resVerify.json();
      if (data.error) throw new Error(data.error);

      showMsg('Passkey añadida. La clave normal ha sido desactivada.', 'success');
      const resAd = await fetch('/api/admin/admins');
      if (resAd.ok) admins = await resAd.json();
    } catch (err: any) {
      if (err.name !== 'NotAllowedError') {
        showMsg(err.message, 'error');
      }
    } finally {
      actionLoading = false;
    }
  };

  const handleUploadExam = async () => {
    if (!jsonInput.trim()) return;
    actionLoading = true;
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.preguntas) throw new Error('JSON inválido: falta campo "preguntas"');

      const formatted = parsed.preguntas.map((p: any) => ({
        id: p.id,
        text: p.enunciado || "Sin enunciado",
        options: Object.values(p.opciones || {}),
        correctAnswer: p.respuesta_correcta,
        explanation: p.explicacion,
      }));

      const res = await fetch('/api/admin/global-exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metadata: parsed.metadata || { asignatura: 'Ensayo Global' },
          data: formatted
        }),
      });

      if (!res.ok) throw new Error('Error al subir el ensayo');

      showMsg('Ensayo global publicado correctamente', 'success');
      jsonInput = '';
      const resEx = await fetch('/api/admin/global-exams');
      globalExams = await resEx.json();
    } catch (err: any) {
      showMsg(err.message, 'error');
    } finally {
      actionLoading = false;
    }
  };

  const handleDeleteGlobal = async (id: string) => {
    if (!confirm('¿Eliminar este ensayo global?')) return;
    try {
      await fetch('/api/admin/global-exams', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      globalExams = globalExams.filter(e => e.id !== id);
      showMsg('Ensayo eliminado', 'success');
    } catch (err: any) {
      showMsg(err.message, 'error');
    }
  };

  const handleDeleteUser = async (id: string, isAdminSection: boolean) => {
    if (!confirm('¿Eliminar permanentemente?')) return;
    try {
      const type = isAdminSection ? 'admins' : 'users';
      const res = await fetch(`/api/admin/${type}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (isAdminSection) admins = admins.filter(a => a._id !== id);
      else users = users.filter(u => u._id !== id);
      showMsg('Registro eliminado', 'success');
    } catch (err: any) {
      showMsg(err.message, 'error');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    document.cookie = 'auth_admin_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    goto('/admin/login');
  };

  const cardCls = "bg-white border-[4px] border-black rounded-2xl p-6 shadow-[6px_6px_0_#000]";
  const btnPrimary = "bg-[#6c40d6] text-white border-[3px] border-black rounded-xl font-black shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all";
</script>

<div class="min-h-screen bg-[#ded9ed] text-black font-sans pb-20 transition-colors duration-300">
  {#if loading}
    <div class="min-h-screen flex items-center justify-center text-[#351b69]">
      <Loader2 class="animate-spin w-12 h-12" />
    </div>
  {:else}
    <header class="h-20 bg-[#351b69] border-b-[4px] border-black flex items-center justify-between px-8 shadow-lg sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <img src="/apaes.svg" alt="logo" class="w-10 h-10" />
        <h1 class="text-2xl text-white font-bowlby tracking-widest" style="-webkit-text-stroke: 1px black; text-shadow: 2px 2px 0 #000">
          aPAES <span class="text-[#6c40d6] opacity-90">ADMIN</span>
        </h1>
      </div>
      <div class="flex items-center gap-4">
        <button
          onclick={handleAddPasskey}
          class="hidden md:flex items-center gap-2 bg-[#6c40d6] text-white px-4 py-2 rounded-lg font-black border-2 border-black shadow-[2px_2px_0_#000] hover:-translate-y-0.5 transition-all"
        >
          <Fingerprint size={18} /> Configurar Passkey
        </button>
        <button onclick={handleLogout} class="text-white/80 hover:text-white transition-colors">
          <LogOut size={24} />
        </button>
      </div>
    </header>

    <main class="max-w-6xl mx-auto p-6 md:p-10">
      <div class="flex gap-4 mb-8">
        <button
          onclick={() => activeTab = 'exams'}
          class="px-6 py-3 rounded-xl border-[3px] border-black font-black uppercase tracking-tighter flex items-center gap-2 transition-all {activeTab === 'exams' ? 'bg-[#6c40d6] text-white -translate-y-1 shadow-[4px_4px_0_#000]' : 'bg-white hover:bg-slate-50'}"
        >
          <Package size={20} /> Ensayos
        </button>
        <button
          onclick={() => activeTab = 'users'}
          class="px-6 py-3 rounded-xl border-[3px] border-black font-black uppercase tracking-tighter flex items-center gap-2 transition-all {activeTab === 'users' ? 'bg-[#6c40d6] text-white -translate-y-1 shadow-[4px_4px_0_#000]' : 'bg-white hover:bg-slate-50'}"
        >
          <Users size={20} /> Usuarios
        </button>
      </div>

      {#if message}
        <div class="mb-8 p-4 rounded-xl border-[3px] border-black flex items-center gap-3 font-black shadow-[4px_4px_0_#000] {message.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}" style="animation: slide-in-top 0.3s ease-out">
          {#if message.type === 'success'} <CheckCircle /> {:else} <AlertCircle /> {/if}
          {message.text}
        </div>
      {/if}

      {#if activeTab === 'exams'}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 {cardCls}">
            <h2 class="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-[#351b69]">
              <Globe size={28} class="text-[#6c40d6]" /> Ensayos Activos
            </h2>
            {#if globalExams.length === 0}
              <div class="py-20 text-center text-slate-400 font-bold border-[3px] border-dashed border-slate-300 rounded-2xl">
                No hay ensayos para mostrar.
              </div>
            {:else}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each globalExams as exam}
                  <div class="bg-[#f8f7ff] border-[3px] border-black rounded-xl p-4 flex flex-col justify-between hover:scale-[1.02] transition-transform">
                    <div>
                      <div class="flex justify-between items-start mb-2">
                        <span class="bg-[#6c40d6] text-white text-[10px] font-black px-2 py-1 rounded border-2 border-black uppercase">GLOBAL</span>
                        <span class="text-xs font-bold text-slate-500">{exam.metadata?.año || '2024'}</span>
                      </div>
                      <h3 class="font-black text-lg mb-1 leading-tight uppercase">{exam.metadata?.asignatura}</h3>
                      <p class="text-xs font-bold text-slate-600 uppercase">{exam.data.length} preguntas</p>
                    </div>
                    <div class="mt-4 pt-4 border-t-2 border-dashed border-black/10 flex justify-end">
                      <button onclick={() => handleDeleteGlobal(exam.id)} class="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors border-2 border-black bg-white shadow-[2px_2px_0_#000]">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                {/each}
              </div>
            {/if}
          </div>

          <div class="{cardCls}">
            <h2 class="text-xl font-black uppercase mb-4 flex items-center gap-2 text-[#351b69]">
              <Plus size={24} class="text-emerald-500" /> Nuevo Ensayo
            </h2>
            <textarea
              class="w-full h-80 bg-[#f4f2f9] border-[3px] border-black rounded-xl p-4 font-mono text-xs text-black focus:outline-none focus:ring-4 ring-[#6c40d6]/20 transition-all mb-4"
              placeholder={'{\n  "metadata": {...},\n  "preguntas": [...]\n}'}
              bind:value={jsonInput}
            ></textarea>
            <button
              onclick={handleUploadExam}
              disabled={actionLoading}
              class="w-full py-4 text-lg {btnPrimary} flex items-center justify-center gap-2"
            >
              {#if actionLoading} <Loader2 class="animate-spin" /> {:else} <Save /> PUBLICAR {/if}
            </button>
          </div>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="{cardCls}">
            <h2 class="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-[#351b69]">
              <Users size={28} class="text-[#6c40d6]" /> Usuarios
            </h2>
            <div class="space-y-3">
              {#if users.length === 0}
                <p class="text-center py-8 text-slate-400 font-bold uppercase text-xs">Vacío</p>
              {/if}
              {#each users as u}
                <div class="flex items-center justify-between p-4 bg-[#f8f7ff] border-[3px] border-black rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-100 border-2 border-black rounded-full flex items-center justify-center">
                      <Users size={20} class="text-indigo-600" />
                    </div>
                    <span class="font-bold text-lg">{u.username}</span>
                  </div>
                  <button onclick={() => handleDeleteUser(u._id, false)} class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0_#000]">
                    <UserMinus size={18} />
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <div class="{cardCls}">
            <h2 class="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-[#351b69]">
              <ShieldCheck size={28} class="text-[#6c40d6]" /> Administradores
            </h2>
            <div class="space-y-3">
              {#each admins as a}
                <div class="flex items-center justify-between p-4 bg-[#f1eeff] border-[3px] border-black rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-[#e0d6ff] border-2 border-black rounded-full flex items-center justify-center">
                      <ShieldCheck size={20} class="text-[#351b69]" />
                    </div>
                    <div class="flex flex-col">
                      <span class="font-bold text-lg">{a.username}</span>
                      <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-black {a.has_password ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}">
                        {a.has_password ? 'Clave Activa' : 'Solo Passkey'}
                      </span>
                    </div>
                  </div>
                  {#if a.username !== 'admin'}
                    <button onclick={() => handleDeleteUser(a._id, true)} class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0_#000]">
                      <ShieldAlert size={18} />
                    </button>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </main>
  {/if}
</div>
