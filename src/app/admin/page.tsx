'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Globe, Plus, Trash2, Fingerprint, LogOut, 
  Loader2, CheckCircle, Package, AlertCircle, Save
} from 'lucide-react';
import { startRegistration } from '@simplewebauthn/browser';

export default function AdminDashboard() {
  const [session, setSession] = useState<{ username: string } | null>(null);
  const [globalExams, setGlobalExams] = useState<any[]>([]);
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSession();
    fetchGlobalExams();
  }, []);

  const fetchSession = async () => {
    try {
      // Reuse user session check but check admin cookie effectively
      // Or better, a dedicated admin session check
      const res = await fetch('/api/admin/global-exams'); // If this returns 401, we are not logged in as admin
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setSession({ username: 'Admin' }); // Simplified
    } catch {
      router.push('/admin/login');
    }
  };

  const fetchGlobalExams = async () => {
    try {
      const res = await fetch('/api/admin/global-exams');
      if (res.ok) {
        const data = await res.json();
        setGlobalExams(data);
      }
    } finally {
      setLoading(false);
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

      showMsg('Passkey añadida correctamente', 'success');
    } catch (err: any) {
      showMsg(err.message, 'error');
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

      showMsg('Ensayo global publicado', 'success');
      setJsonInput('');
      fetchGlobalExams();
    } catch (err: any) {
      showMsg(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGlobal = async (id: number) => {
    if (!confirm('¿Eliminar este ensayo global para todos los usuarios?')) return;
    try {
      await fetch('/api/admin/global-exams', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchGlobalExams();
      showMsg('Ensayo eliminado', 'success');
    } catch (err: any) {
      showMsg(err.message, 'error');
    }
  };

  const handleLogout = async () => {
    // Simple way to clear cookie if not using a dedicated logout API yet
    // I already created /api/auth/session for users, let's create /api/admin/logout
    await fetch('/api/auth/session', { method: 'DELETE' }); // This clears auth_user_id, but user might have auth_admin_id
    // For now, let's just clear both or assume same mechanism
    document.cookie = 'auth_admin_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-3">
              <Package size={40} className="text-[#6c40d6]" />
              Panel de <span className="text-[#6c40d6]">Control</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">
              Administración de Ensayos Globales
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleAddPasskey}
              disabled={actionLoading}
              className="flex items-center gap-2 bg-slate-800 border-2 border-black px-4 py-2 rounded-xl font-bold text-sm shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Fingerprint size={18} /> Añadir Passkey
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-900/50 border-2 border-black px-4 py-2 rounded-xl font-bold text-sm shadow-[4px_4px_0_#000] text-rose-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <LogOut size={18} /> Salir
            </button>
          </div>
        </header>

        {message && (
          <div className={`mb-8 p-4 rounded-xl border-2 flex items-center gap-3 font-bold animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-rose-500/10 border-rose-500 text-rose-400'}`}>
            {message.type === 'success' ? <CheckCircle /> : <AlertCircle />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border-[3px] border-black rounded-2xl p-6 shadow-[6px_6px_0_#000]">
              <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                <Globe size={24} className="text-indigo-400" />
                Ensayos Globales Activos
              </h2>

              {globalExams.length === 0 ? (
                <div className="py-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
                  No hay ensayos publicados. Sube uno a la derecha.
                </div>
              ) : (
                <div className="space-y-4">
                  {globalExams.map(exam => (
                    <div key={exam.id} className="bg-slate-800 border-2 border-black rounded-xl p-4 flex justify-between items-center group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#6c40d6] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">GLOBAL</span>
                          <h3 className="font-bold text-lg leading-tight">{exam.metadata?.asignatura}</h3>
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase">{exam.data.length} preguntas • {exam.metadata?.año || '2024'}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteGlobal(exam.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-slate-900 border-[3px] border-black rounded-2xl p-6 shadow-[6px_6px_0_#000]">
              <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Plus size={24} className="text-emerald-400" />
                Subir Nuevo
              </h2>
              <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Pega el JSON del ensayo aquí</p>
              
              <textarea
                className="w-full h-80 bg-slate-800 border-2 border-black rounded-xl p-4 font-mono text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder={'{\n  "metadata": { "asignatura": "..." },\n  "preguntas": [...]\n}'}
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
              />

              <button
                onClick={handleUploadExam}
                disabled={actionLoading}
                className="w-full mt-4 bg-emerald-600 text-white py-4 rounded-xl border-[4px] border-black font-black text-xl flex items-center justify-center gap-2 shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                {actionLoading ? <Loader2 className="animate-spin" /> : <><Save /> Publicar Ensayo</>}
              </button>
            </div>
            
            <div className="bg-[#6c40d6]/10 border-[3px] border-[#6c40d6]/30 rounded-2xl p-6">
              <h3 className="font-black text-sm uppercase mb-2 text-indigo-300 flex items-center gap-2">
                <AlertCircle size={16} /> Recordatorio
              </h3>
              <p className="text-xs text-indigo-100/70 font-semibold leading-relaxed">
                Los ensayos subidos aquí aparecerán automáticamente en la sección "Practicar" de todos los usuarios registrados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
