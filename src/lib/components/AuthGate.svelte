<script lang="ts">
  import { onMount } from 'svelte';
  import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
  import { Fingerprint, LogIn, UserPlus, LogOut, ChevronRight, Loader2 } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { children } = $props();

  let user = $state<{ authenticated: boolean; username?: string } | null>(null);
  let loading = $state(true);
  let authError = $state<string | null>(null);
  let usernameInput = $state('');
  let isRegistering = $state(false);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      user = data;
    } catch (err) {
      console.error('Session check failed', err);
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    if (!$page.url.pathname.startsWith('/admin')) {
      checkSession();
    } else {
      loading = false;
    }
  });

  const handleRegister = async () => {
    authError = null;
    loading = true;
    try {
      const resOptions = await fetch('/api/auth/registration/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput || `Usuario-${Math.floor(Math.random() * 10000)}` }),
      });

      const options = await resOptions.json();
      if (options.error) throw new Error(options.error);

      // SimpleWebAuthn browser expects the object
      const attResp = await startRegistration({ optionsJSON: options });

      const resVerify = await fetch('/api/auth/registration/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attResp),
      });

      const verifyData = await resVerify.json();
      if (verifyData.error) throw new Error(verifyData.error);

      await checkSession();
    } catch (err: any) {
      authError = err.message;
    } finally {
      loading = false;
    }
  };

  const handleLogin = async () => {
    authError = null;
    loading = true;
    try {
      const resOptions = await fetch('/api/auth/login/options', { method: 'POST' });
      const options = await resOptions.json();
      if (options.error) throw new Error(options.error);

      const asseResp = await startAuthentication({ optionsJSON: options });

      const resVerify = await fetch('/api/auth/login/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asseResp),
      });

      const verifyData = await resVerify.json();
      if (verifyData.error) throw new Error(verifyData.error);

      await checkSession();
    } catch (err: any) {
      authError = err.message;
    } finally {
      loading = false;
    }
  };

  const handleLogout = async () => {
    loading = true;
    try {
      await fetch('/api/auth/session', { method: 'DELETE' });
      user = { authenticated: false };
    } finally {
      loading = false;
    }
  };
</script>

{#if $page.url.pathname.startsWith('/admin')}
  {@render children()}
{:else if loading && !user}
  <div class="min-h-screen flex items-center justify-center bg-[#ded9ed]">
    <Loader2 class="w-12 h-12 text-[#6c40d6] animate-spin" />
  </div>
{:else if user && !user.authenticated}
  <div class="min-h-screen flex items-center justify-center bg-[#ded9ed] p-5 font-sans">
    <div class="max-w-md w-full bg-white border-[4px] border-black rounded-3xl p-8 shadow-[8px_8px_0_#000]">
      <div class="flex flex-col items-center mb-8">
        <div class="w-20 h-20 bg-[#6c40d6] rounded-2xl border-[3px] border-black flex items-center justify-center text-white mb-4 shadow-[4px_4px_0_#000]">
          <Fingerprint size={48} strokeWidth={2.5} />
        </div>
        <h1 class="text-3xl font-black tracking-tighter uppercase text-center leading-none">
          Bienvenido a <span class="text-[#6c40d6]">aPAES</span>
        </h1>
        <p class="text-slate-500 font-bold text-center mt-2">
          Estudia o muere, gordo.
        </p>
      </div>

      {#if authError}
        <div class="bg-rose-50 border-[3px] border-rose-500 rounded-xl p-4 mb-6 text-rose-600 font-bold text-sm">
          Error: {authError}
        </div>
      {/if}

      <div class="space-y-4">
        {#if isRegistering}
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-black uppercase tracking-widest mb-1 ml-1 text-slate-500" for="nickname">Nickname (Opcional)</label>
              <input
                id="nickname"
                type="text"
                placeholder="Ej: FuturoPuntajeNacional"
                class="w-full px-4 py-3 border-[3px] border-black rounded-xl font-bold focus:outline-none focus:border-[#6c40d6] transition-colors"
                bind:value={usernameInput}
              />
            </div>
            <button
              onclick={handleRegister}
              disabled={loading}
              class="w-full bg-[#6c40d6] text-white py-4 rounded-xl border-[4px] border-black font-black text-xl flex items-center justify-center gap-2 shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              {#if loading}
                <Loader2 class="animate-spin" />
              {:else}
                <UserPlus /> Crear Passkey
              {/if}
            </button>
            <button
              onclick={() => isRegistering = false}
              class="w-full text-slate-500 font-bold text-sm hover:underline"
            >
              Ya tengo una cuenta, entrar
            </button>
          </div>
        {:else}
          <div class="space-y-4">
            <button
              onclick={handleLogin}
              disabled={loading}
              class="w-full bg-[#298d5c] text-white py-4 rounded-xl border-[4px] border-black font-black text-xl flex items-center justify-center gap-2 shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              {#if loading}
                <Loader2 class="animate-spin" />
              {:else}
                <LogIn /> Entrar
              {/if}
            </button>
            <div class="h-[1px] bg-black/10 my-6 relative">
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-black text-slate-400">O</span>
            </div>
            <button
              onclick={() => isRegistering = true}
              class="w-full bg-white text-black py-4 rounded-xl border-[4px] border-black font-black text-xl flex items-center justify-center gap-2 shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:bg-slate-50"
            >
              <UserPlus /> Nueva Cuenta
            </button>
          </div>
        {/if}
      </div>

      <p class="mt-8 text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest px-4">
        Sin correos. Sin contraseñas. Solo tu dispositivo. 🛡️
      </p>
    </div>
  </div>
{:else}
  <div class="fixed top-4 right-4 z-[999]">
    <button
      onclick={handleLogout}
      class="bg-white/80 backdrop-blur-sm border-2 border-black px-3 py-1.5 rounded-lg font-black text-xs flex items-center gap-2 shadow-[2px_2px_0_#000] hover:bg-rose-50 hover:border-rose-500 hover:text-rose-500 transition-all"
    >
      <LogOut size={14} /> {user?.username}
    </button>
  </div>
  {@render children()}
{/if}

<style>
  :global(:root) {
    --primary: #6c40d6;
  }
</style>
