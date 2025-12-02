"use client";

import { useState } from 'react';
import { Clock, Save, ArrowLeft, Mic, Paperclip, History, Zap, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock Data para el ejemplo
const pacienteMock = {
    nombre: 'Ana García',
    tipo: 'Psicología',
    historial: [
        { fecha: '25 Nov 2025', titulo: 'Sesión 4: Ansiedad Laboral', nota: 'El paciente reporta mejoría en el sueño...' },
    ]
};

export default function PsicologiaPage() {
  const [notas, setNotas] = useState('');
  const [summary, setSummary] = useState(''); // Estado para guardar el resumen de IA
  const [isSummarizing, setIsSummarizing] = useState(false); // Estado para el spinner
  const params = useParams();
  const pacienteId = params.id; 

  const handleSummarize = () => {
    if (notas.length < 50) {
        alert('Escribe al menos 50 caracteres para un buen resumen.');
        return;
    }
    
    setIsSummarizing(true);

    // --- SIMULACIÓN DE LLAMADA A LA IA ---
    // Aquí es donde iría la llamada a la API de Gemini/OpenAI
    setTimeout(() => {
        const resumenSimulado = `[RESUMEN IA] El paciente se centró en la gestión del estrés laboral y la mejora de la higiene del sueño. Se identificaron disparadores de ansiedad los lunes por la mañana. Se acuerda mantener la práctica de mindfulness y explorar técnicas de reestructuración cognitiva en la próxima sesión.`;
        setSummary(resumenSimulado);
        setIsSummarizing(false);
    }, 2500); // Espera de 2.5 segundos para simular el procesamiento
  };

  const handleSave = () => {
    // LÓGICA FINAL DE GUARDADO: Aquí se enviarían las notas y el resumen (si existe) a la base de datos
    alert(`Notas listas para guardar. Resumen generado: ${summary ? 'Sí' : 'No'}.`);
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans flex flex-col">
      
      {/* Barra Superior de la Sesión */}
      <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href={`/pacientes/${pacienteId}`} className="p-2 hover:bg-white/5 rounded-full text-textSecondary hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-bold text-white text-lg">Sesión con {pacienteMock.nombre}</h1>
            <div className="flex items-center gap-2 text-xs text-accent">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              En curso • 00:14:32
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-textSecondary hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-border transition-all" title="Grabar Sesión">
            <Mic size={20} />
          </button>
          <button 
            onClick={handleSave}
            className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all"
          >
            <Save size={16} />
            Guardar y Cerrar
          </button>
        </div>
      </header>

      {/* Área de Trabajo (Split View) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Lado Izquierdo: Editor de Notas */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm text-textSecondary">Estado de ánimo del paciente (1-10):</span>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button key={num} className="w-8 h-8 rounded hover:bg-primary hover:text-white text-textSecondary text-sm font-medium transition-colors focus:bg-primary focus:text-white">
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">Notas de Evolución</label>
                <textarea 
                    className="w-full h-[30vh] bg-surface border border-border rounded-xl p-6 text-lg leading-relaxed focus:outline-none focus:border-primary/50 text-textPrimary placeholder-gray-600 resize-none shadow-inner"
                    placeholder="Escribe aquí los detalles de la sesión..."
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                ></textarea>
            </div>
            
            {/* Botón de Automatización de Resumen */}
            <button 
                onClick={handleSummarize}
                disabled={isSummarizing || notas.length < 50}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isSummarizing || notas.length < 50 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-accent hover:bg-cyan-500 text-white shadow-md shadow-accent/20'
                }`}
            >
                {isSummarizing ? <Loader2 className="animate-spin h-4 w-4" /> : <Zap size={16} />}
                {isSummarizing ? 'Generando resumen...' : 'Resumir con IA (Automatizar)'}
            </button>

            {/* Resultado del Resumen (Si existe) */}
            {summary && (
                <div className="bg-primary/10 border border-primary/50 rounded-xl p-4 mt-6">
                    <h4 className="text-white font-bold flex items-center gap-2 mb-2"><Zap size={16} className="text-primary"/> Resumen Automático para Expediente</h4>
                    <p className="text-textSecondary whitespace-pre-line">{summary}</p>
                </div>
            )}

            <div className="flex gap-4 pt-4">
                <button className="flex items-center gap-2 text-sm text-textSecondary hover:text-white px-4 py-2 border border-border rounded-lg hover:bg-surface transition-all">
                    <Paperclip size={16} />
                    Adjuntar Tarea / PDF
                </button>
            </div>

          </div>
        </div>

        {/* Lado Derecho: Historial y Contexto */}
        <div className="w-80 border-l border-border bg-surface/50 p-4 hidden xl:block overflow-auto">
            <div className="flex items-center gap-2 mb-6 text-textSecondary">
                <History size={18} />
                <h3 className="font-bold text-sm">Historial Reciente</h3>
            </div>
             {/* Contenido del historial aquí... */}
        </div>

      </div>
    </div>
  );
}