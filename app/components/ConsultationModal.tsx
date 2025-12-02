"use client";

import { X, Brain, Stethoscope, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelect = (type: string) => {
    onClose();
    // Navegación inteligente
    if (type === 'psicologia') {
      router.push('/consulta/psicologia');
    }
    if (type === 'medicina') {
      router.push('/consulta/medicina');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center p-6 border-b border-border bg-background/50">
          <h2 className="text-xl font-bold text-white">Iniciar Nueva Consulta</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-textSecondary" />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-8">
          <p className="text-textSecondary mb-6">Selecciona el protocolo clínico para hoy:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Opción 1: Psicología */}
            <button 
              onClick={() => handleSelect('psicologia')}
              className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all group text-left"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain size={24} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-white group-hover:text-primary">Psicología</h3>
                <p className="text-xs text-textSecondary mt-1">TCC, Anamnesis y Evolución</p>
              </div>
            </button>

            {/* Opción 2: Medicina (YA ARREGLADA) */}
            <button 
              onClick={() => handleSelect('medicina')}
              className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border bg-background/50 hover:border-success hover:bg-success/5 transition-all group text-left"
            >
              <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center group-hover:scale-110 transition-transform">
                <Stethoscope size={24} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-white group-hover:text-success">Medicina</h3>
                <p className="text-xs text-textSecondary mt-1">Constantes, Examen físico</p>
              </div>
            </button>

            {/* Opción 3: Libre */}
            <button className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border bg-background/50 hover:border-white hover:bg-white/5 transition-all group text-left">
              <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity size={24} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-white">Formato Libre</h3>
                <p className="text-xs text-textSecondary mt-1">Notas rápidas sin estructura</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}