'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Fingerprint, Loader2, ShieldCheck } from 'lucide-react';
import { startAuthentication } from '@simplewebauthn/browser';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const resOptions = await fetch('/api/admin/passkey/login/options', { method: 'POST' });
      const options = await resOptions.json();
      if (options.error) throw new Error(options.error);

      const asseResp = await startAuthentication({ optionsJSON: options });
      
      const resVerify = await fetch('/api/admin/passkey/login/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asseResp),
      });

      const verifyData = await resVerify.json();
      if (verifyData.error) throw new Error(verifyData.error);
      
      router.push('/admin');
    } catch (err: any) {
      if (err.name !== 'NotAllowedError') {
        setError(err.message || 'Error en login con Passkey');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ded9ed] p-5 font-sans">
      <div className="max-w-md w-full bg-white border-[4px] border-black rounded-3xl p-8 shadow-[8px_8px_0_#000]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-[#351b69] rounded-2xl border-[3px] border-black flex items-center justify-center text-white mb-4 shadow-[4px_4px_0_#000]">
            <ShieldCheck size={48} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase text-center leading-none text-black">
            Admin <span className="text-[#6c40d6]">aPAES</span>
          </h1>
          <p className="text-slate-500 font-bold text-center mt-2">
            Gestión de Ensayos Globales
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border-[3px] border-rose-500 rounded-xl p-4 mb-6 text-rose-600 font-bold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-1 ml-1 text-slate-400">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-[#f4f2f9] border-[3px] border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#6c40d6] transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-1 ml-1 text-slate-400">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-[#f4f2f9] border-[3px] border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#6c40d6] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6c40d6] text-white py-4 rounded-xl border-[4px] border-black font-black text-xl flex items-center justify-center gap-2 shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:bg-[#5b3eb8]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><LogIn size={20} /> Entrar con Clave</>}
          </button>
        </form>

        <div className="h-[2px] bg-black/10 my-8 relative">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-black text-slate-400 uppercase italic">O usa tu llave</span>
        </div>

        <button
          onClick={handlePasskeyLogin}
          disabled={loading}
          className="w-full bg-white text-black py-4 rounded-xl border-[4px] border-black font-black text-xl flex items-center justify-center gap-2 shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:bg-slate-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Fingerprint size={20} /> Entrar con Passkey</>}
        </button>

        <p className="mt-8 text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
          🔐 Acceso restringido a administradores.<br/>La clave normal se desactiva al añadir una Passkey.
        </p>
      </div>
    </div>
  );
}
