"use client";

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, Plus, MoreHorizontal, Loader2 } from 'lucide-react';
import AddPatientModal from '../components/AddPatientModal';

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar pacientes desde la memoria del navegador (LocalStorage)
  const cargarPacientes = () => {
    const datosGuardados = localStorage.getItem('mis_pacientes');
    if (datosGuardados) {
      setPacientes(JSON.parse(datosGuardados));
    }
  };

  useEffect(() => {
    cargarPacientes();
    // Limpieza de datos viejos de Supabase
    localStorage.removeItem('supabase_project_data'); 
  }, []);

  return (
    <div className="flex h-screen bg-background text-textPrimary font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-surface">
            <div>
                <h1 className="text-2xl font-bold text-white">Directorio de Pacientes</h1>
                <p className="text-xs text-textSecondary">Total: {pacientes.length} expedientes (Modo Demostración)</p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
                <Plus size={16} /> Nuevo Paciente
            </button>
        </header>

        <div className="p-6 pb-0">
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-lg">
                    <Search className="absolute left-3 top-2.5 text-textSecondary" size={18} />
                    <input type="text" placeholder="Buscar..." className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
            <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-xl">
                {pacientes.length === 0 ? (
                  <div className="p-10 text-center text-textSecondary">
                    No hay pacientes. ¡Crea el primero! (Los datos se guardarán en tu navegador)
                  </div>
                ) : (
                  <table className="w-full text-left">
                      <thead className="bg-background/50 border-b border-border">
                          <tr>
                              <th className="p-4 text-xs font-bold text-textSecondary uppercase">Paciente</th>
                              <th className="p-4 text-xs font-bold text-textSecondary uppercase">Contacto</th>
                              <th className="p-4 text-xs font-bold text-textSecondary uppercase">Tipo</th>
                              <th className="p-4 text-xs font-bold text-textSecondary uppercase">Estado</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                          {pacientes.map((p, index) => (
                              <tr key={index} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                  <td className="p-4">
                                      <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                                              {p.nombre ? p.nombre.substring(0,2).toUpperCase() : 'NN'}
                                          </div>
                                          <div>
                                              <div className="font-bold text-white group-hover:text-primary transition-colors">{p.nombre}</div>
                                              <div className="text-xs text-textSecondary">{p.edad} años</div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="p-4 text-sm text-textSecondary">{p.telefono}</td>
                                  <td className="p-4 text-sm text-textSecondary">{p.tipo}</td>
                                  <td className="p-4">
                                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                                          {p.estado}
                                      </span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                )}
            </div>
        </div>
      </main>
      
      <AddPatientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={cargarPacientes} 
      />
    </div>
  );
}