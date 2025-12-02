"use client";

import { useState } from 'react';
import { X, Send, Loader2, Link as LinkIcon, Save } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pacienteId: string; 
}

export default function AssignResourceModal({ isOpen, onClose, onSuccess, pacienteId }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido_url: '',
    tipo: 'Audio'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // SIMULACIÓN DE GUARDADO EXITOSO EN MEMORIA LOCAL
    setTimeout(() => {
        const actuales = JSON.parse(localStorage.getItem('mis_pacientes') || '[]');
        const nuevoRecurso = { 
            titulo: formData.titulo,
            contenido_url: formData.contenido_url,
            tipo: formData.tipo,
            pacienteId: pacienteId,
            asignado: Date.now()
        };
        // Guarda un registro simulado para el paciente (simula la inserción)
        localStorage.setItem('recursos_asignados', JSON.stringify([nuevoRecurso, ...JSON.parse(localStorage.getItem('recursos_asignados') || '[]')]));
        
        setLoading(false);
        onSuccess();
        onClose();
        alert('✅ ¡TAREA ASIGNADA CON ÉXITO! (Guardado en memoria local)');
    }, 1000); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-surface border border-border w-full max-w-md rounded-2xl shadow-2xl p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Asignar Recurso a {pacienteId === 'P001' ? 'Ana García' : 'Paciente ID:' + pacienteId}</h2>
          <button onClick={onClose}><X className="text-textSecondary hover:text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-textSecondary uppercase">Título de la Tarea</label>
            <input 
              required
              className="w-full bg-background border border-border rounded-lg p-3 text-white mt-1"
              placeholder="Ej: Audio de Respiración Profunda"
              value={formData.titulo}
              onChange={e => setFormData({...formData, titulo: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-textSecondary uppercase">Tipo de Recurso</label>
            <select 
              className="w-full bg-background border border-border rounded-lg p-3 text-white focus:border-primary focus:outline-none mt-1"
              value={formData.tipo}
              onChange={e => setFormData({...formData, tipo: e.target.value})}
            >
              <option value="Audio">Audio / Meditación</option>
              <option value="PDF">PDF / Lectura</option>
              <option value="Formulario">Formulario de Evaluación</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-textSecondary uppercase flex items-center gap-1"><LinkIcon size={14} /> Enlace al Contenido (URL)</label>
            <input 
              required
              className="w-full bg-background border border-border rounded-lg p-3 text-white focus:border-primary focus:outline-none mt-1"
              placeholder="https://drive.google.com/ejercicio.mp3"
              value={formData.contenido_url}
              onChange={e => setFormData({...formData, contenido_url: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-3 rounded-xl mt-4 flex justify-center items-center gap-2 transition-all shadow-lg shadow-primary/25 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
            {loading ? 'Asignando...' : 'Asignar Tarea'}
          </button>
        </form>

      </div>
    </div>
  );
}