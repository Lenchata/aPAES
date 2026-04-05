"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Globe, Plus, Trash2, Fingerprint, LogOut,
  Loader2, CheckCircle, Package, AlertCircle, Save,
  Users, ShieldCheck, UserMinus, ShieldAlert
} from 'lucide-react';
import { startRegistration } from '@simplewebauthn/browser';

// ────────────────────────────────────────────────────────────────────────────
// Panel de Administración (Renovado)
// ────────────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'exams' | 'users'>('exams');
  const [globalExams, setGlobalExams] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSessionAndInitialData();
  }, []);

  const fetchSessionAndInitialData = async () => {
    try {
      const res = await fetch('/api/admin/global-exams');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const exams = await res.json();
      setGlobalExams(exams);

      const resUsers = await fetch('/api/admin/users');
      const resAdmins = await fetch('/api/admin/admins');
      if (resUsers.ok) setUsers(await resUsers.json());
      if (resAdmins.ok) setAdmins(await resAdmins.json());

      setLoading(false);
    } catch {
      router.push('/admin/login');
    }
  };

  const showMsg = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddPasskey = async () => {
    setActionLoading(true);
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
      // Refresh admins to show status
      const resAd = await fetch('/api/admin/admins');
      if (resAd.ok) setAdmins(await resAd.json());
    } catch (err: any) {
      if (err.name !== 'NotAllowedError') {
        showMsg(err.message, 'error');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleUploadExam = async () => {
    if (!jsonInput.trim()) return;
    setActionLoading(true);
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
      setJsonInput('');
      const resEx = await fetch('/api/admin/global-exams');
      setGlobalExams(await resEx.json());
    } catch (err: any) {
      showMsg(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGlobal = async (id: number) => {
    if (!confirm('¿Eliminar este ensayo global?')) return;
    try {
      await fetch('/api/admin/global-exams', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setGlobalExams(prev => prev.filter(e => e.id !== id));
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

      if (isAdminSection) setAdmins(prev => prev.filter(a => a.id !== id));
      else setUsers(prev => prev.filter(u => u.id !== id));
      showMsg('Registro eliminado', 'success');
    } catch (err: any) {
      showMsg(err.message, 'error');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    document.cookie = 'auth_admin_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#ded9ed] text-[#351b69]"><Loader2 className="animate-spin w-12 h-12" /></div>;
  }

  // Estilos compartidos con portal de usuario
  const bg = "bg-[#ded9ed]";
  const navBg = "bg-[#351b69]";
  const cardCls = "bg-white border-[4px] border-black rounded-2xl p-6 shadow-[6px_6px_0_#000]";
  const btnPrimary = "bg-[#6c40d6] text-white border-[3px] border-black rounded-xl font-black shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all";

  return (
    <div className={`min-h-screen ${bg} text-black font-sans pb-20`}>
      {/* Header Estilo aPAES */}
      <header className={`h-20 ${navBg} border-b-[4px] border-black flex items-center justify-between px-8 shadow-lg sticky top-0 z-50`}>
        <div className="flex items-center gap-3">
          <img src="/apaes.svg" alt="logo" className="w-30 h-30" />
          <h1 className="text-2xl text-white font-bowlby tracking-widest" style={{ WebkitTextStroke: "1px black", textShadow: "2px 2px 0 #000" }}>
            aPAES <span className="text-[#6c40d6] opacity-90">ADMIN</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddPasskey}
            className="hidden md:flex items-center gap-2 bg-[#6c40d6] text-white px-4 py-2 rounded-lg font-black border-2 border-black shadow-[2px_2px_0_#000] hover:-translate-y-0.5 transition-all"
          >
            <Fingerprint size={18} /> Configurar Passkey
          </button>
          <button onClick={handleLogout} className="text-white/80 hover:text-white transition-colors">
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Pestañas */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-6 py-3 rounded-xl border-[3px] border-black font-black uppercase tracking-tighter flex items-center gap-2 transition-all ${activeTab === 'exams' ? 'bg-[#6c40d6] text-white -translate-y-1 shadow-[4px_4px_0_#000]' : 'bg-white hover:bg-slate-50'}`}
          >
            <Package size={20} /> Ensayos
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl border-[3px] border-black font-black uppercase tracking-tighter flex items-center gap-2 transition-all ${activeTab === 'users' ? 'bg-[#6c40d6] text-white -translate-y-1 shadow-[4px_4px_0_#000]' : 'bg-white hover:bg-slate-50'}`}
          >
            <Users size={20} /> Usuarios
          </button>
        </div>

        {message && (
          <div className={`mb-8 p-4 rounded-xl border-[3px] border-black flex items-center gap-3 font-black shadow-[4px_4px_0_#000] animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
            {message.type === 'success' ? <CheckCircle /> : <AlertCircle />}
            {message.text}
          </div>
        )}

        {/* Contenido Dinámico */}
        {activeTab === 'exams' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 ${cardCls}`}>
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-[#351b69]">
                <Globe size={28} className="text-[#6c40d6]" /> Ensayos Activos
              </h2>
              {globalExams.length === 0 ? (
                <div className="py-20 text-center text-slate-400 font-bold border-[3px] border-dashed border-slate-300 rounded-2xl">
                  No hay ensayos para mostrar.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {globalExams.map(exam => (
                    <div key={exam.id} className="bg-[#f8f7ff] border-[3px] border-black rounded-xl p-4 flex flex-col justify-between hover:scale-[1.02] transition-transform">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-[#6c40d6] text-white text-[10px] font-black px-2 py-1 rounded border-2 border-black uppercase">GLOBAL</span>
                          <span className="text-xs font-bold text-slate-500">{exam.metadata?.año || '2024'}</span>
                        </div>
                        <h3 className="font-black text-lg mb-1 leading-tight uppercase">{exam.metadata?.asignatura}</h3>
                        <p className="text-xs font-bold text-slate-600 uppercase">{exam.data.length} preguntas</p>
                      </div>
                      <div className="mt-4 pt-4 border-t-2 border-dashed border-black/10 flex justify-end">
                        <button onClick={() => handleDeleteGlobal(exam.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors border-2 border-black bg-white shadow-[2px_2px_0_#000]">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={cardCls}>
              <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2 text-[#351b69]">
                <Plus size={24} className="text-emerald-500" /> Nuevo Ensayo
              </h2>
              <textarea
                className="w-full h-80 bg-[#f4f2f9] border-[3px] border-black rounded-xl p-4 font-mono text-xs text-black focus:outline-none focus:ring-4 ring-[#6c40d6]/20 transition-all mb-4"
                placeholder={'{\n  "metadata": {...},\n  "preguntas": [...]\n}'}
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
              />
              <button
                onClick={handleUploadExam}
                disabled={actionLoading}
                className={`w-full py-4 text-lg ${btnPrimary} flex items-center justify-center gap-2`}
              >
                {actionLoading ? <Loader2 className="animate-spin" /> : <><Save /> PUBLICAR</>}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={cardCls}>
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-[#351b69]">
                <Users size={28} className="text-[#6c40d6]" /> Usuarios
              </h2>
              <div className="space-y-3">
                {users.length === 0 && <p className="text-center py-8 text-slate-400 font-bold uppercase text-xs">Vacío</p>}
                {users.map(u => (
                  <div key={u.id} className="flex items-center justify-between p-4 bg-[#f8f7ff] border-[3px] border-black rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 border-2 border-black rounded-full flex items-center justify-center">
                        <Users size={20} className="text-indigo-600" />
                      </div>
                      <span className="font-bold text-lg">{u.username}</span>
                    </div>
                    <button onClick={() => handleDeleteUser(u.id, false)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0_#000]">
                      <UserMinus size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardCls}>
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-[#351b69]">
                <ShieldCheck size={28} className="text-[#6c40d6]" /> Administradores
              </h2>
              <div className="space-y-3">
                {admins.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-4 bg-[#f1eeff] border-[3px] border-black rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#e0d6ff] border-2 border-black rounded-full flex items-center justify-center">
                        <ShieldCheck size={20} className="text-[#351b69]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{a.username}</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-black ${a.has_password ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {a.has_password ? 'Clave Activa' : 'Solo Passkey'}
                        </span>
                      </div>
                    </div>
                    {a.username !== 'admin' && (
                      <button onClick={() => handleDeleteUser(a.id, true)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0_#000]">
                        <ShieldAlert size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
