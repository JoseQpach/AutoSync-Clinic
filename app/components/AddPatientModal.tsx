"use client";

import { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
// Ya no importamos Supabase

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Para avisar que se guardó
}

export default function AddPatientModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    telefono: '',
    tipo: 'Medicina'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // SIMULACIÓN DE GUARDADO EN MEMORIA DEL NAVEGADOR
    setTimeout(() => {
      const actuales = JSON.parse(localStorage.getItem('mis_pacientes') || '[]');
      const nuevoPaciente = { 
        ...formData, 
        estado: 'Activo', 
        id: Date.now() // ID único para la demo
      };
      
      localStorage.setItem('mis_pacientes', JSON.stringify([nuevoPaciente, ...actuales]));
      
      setLoading(false);
      onSuccess();
      onClose();
      setFormData({ nombre: '', edad: '', telefono: '', tipo: 'Medicina' });
    }, 500); // Pequeña pausa para que se sienta real (0.5 segundos)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-surface border border-border w-full max-w-md rounded-2xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Nuevo Paciente</h2>
          <button onClick={onClose}><X className="text-textSecondary hover:text-white" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-textSecondary uppercase">Nombre Completo</label>
            <input required className="w-full bg-background border border-border rounded-lg p-3 text-white mt-1" 
              placeholder="Ej: Maria Perez" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-textSecondary uppercase">Edad</label>
              <input required type="number" className="w-full bg-background border border-border rounded-lg p-3 text-white mt-1" 
                value={formData.edad} onChange={e => setFormData({...formData, edad: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-textSecondary uppercase">Tipo</label>
              <select className="w-full bg-background border border-border rounded-lg p-3 text-white mt-1" 
                value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                <option value="Medicina">Medicina</option>
                <option value="Psicología">Psicología</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-textSecondary uppercase">Teléfono</label>
            <input required className="w-full bg-background border border-border rounded-lg p-3 text-white mt-1" 
              value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-3 rounded-xl mt-4 flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />} Guardar
          </button>
        </form>
      </div>
    </div>
  );
}