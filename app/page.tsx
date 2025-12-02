"use client"; // <--- ESTO ES VITAL PARA QUE FUNCIONEN LOS CLICS

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ConsultationModal from './components/ConsultationModal';
import { Search, Plus, Bell, CalendarCheck, Clock, Activity } from 'lucide-react';

export default function Home() {
  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-textPrimary font-sans">
      {/* 1. Barra Lateral */}
      <Sidebar />

      {/* 2. Área Principal */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-6 w-1/2">
            <div>
              <h1 className="text-xl font-bold text-white">Hola, Dr.</h1>
              <p className="text-xs text-textSecondary">Sábado, 29 Noviembre</p>
            </div>
            <div className="relative group w-full max-w-md hidden md:block">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-textSecondary">
                <Search size={16} />
              </div>
              <input type="text" placeholder="Buscar paciente (Ctrl + K)..." className="w-full bg-surface border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-textPrimary placeholder-textSecondary shadow-sm" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl border border-border bg-surface text-textSecondary hover:text-white hover:border-primary/50 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full border border-surface"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
              <div className="w-full h-full rounded-full bg-surface border-2 border-transparent flex items-center justify-center overflow-hidden">
                <span className="font-bold text-xs">DR</span>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Panel de Control</h2>
              <p className="text-textSecondary">Tienes <span className="text-accent font-bold">4 pacientes</span> hoy y 2 tareas pendientes.</p>
            </div>
            
            {/* BOTÓN CONECTADO */}
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 flex items-center gap-2 transition-all active:scale-95 border border-primary/20"
            >
              <Plus size={20} />
              <span>Nueva Consulta</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider flex items-center gap-2"><CalendarCheck size={16} /> Próximos Pacientes</h3>
                <button className="text-xs text-primary hover:underline">Ver todo</button>
              </div>
              
              {/* Tarjetas Estáticas (Por ahora) */}
              <div className="bg-surface border border-border rounded-2xl p-5 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-xl">👩‍🦰</div>
                    <div>
                      <h4 className="font-bold text-lg text-white group-hover:text-primary">Ana García</h4>
                      <div className="flex items-center gap-2 text-sm mt-0.5">
                        <span className="text-accent bg-accent/10 px-2 py-0.5 rounded text-xs font-medium">Psicología</span>
                        <span className="text-textSecondary">• Sesión 4/10</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 bg-background/50 px-3 py-1 rounded-lg border border-border mb-1">
                        <Clock size={14} className="text-textSecondary"/>
                        <span className="font-bold text-white">10:00 AM</span>
                    </div>
                    <span className="text-xs text-success font-medium flex items-center gap-1">● Confirmado</span>
                  </div>
                </div>
              </div>

               <div className="bg-surface border border-border rounded-2xl p-5 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-xl">👨‍🦳</div>
                    <div>
                      <h4 className="font-bold text-lg text-white group-hover:text-primary">Carlos Ruiz</h4>
                      <div className="flex items-center gap-2 text-sm mt-0.5">
                        <span className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded text-xs font-medium">Medicina</span>
                        <span className="text-textSecondary">• Revisión Anual</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 bg-background/50 px-3 py-1 rounded-lg border border-border mb-1">
                        <Clock size={14} className="text-textSecondary"/>
                        <span className="font-bold text-white">11:30 AM</span>
                    </div>
                    <span className="text-xs text-yellow-500 font-medium flex items-center gap-1">● Pendiente</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider flex items-center gap-2"><Activity size={16} /> Rendimiento</h3>
              <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden">
                <div className="text-textSecondary text-sm mb-1 font-medium">Ingresos hoy</div>
                <div className="text-4xl font-bold text-white tracking-tight">$450<span className="text-lg text-textSecondary font-normal">.00</span></div>
                <div className="mt-6">
                    <div className="flex justify-between text-xs mb-2"><span className="text-white">Meta diaria</span><span className="text-accent">75%</span></div>
                    <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/50">
                    <div className="h-full w-[75%] bg-gradient-to-r from-primary to-accent"></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* EL MODAL ESTÁ AQUÍ, ESPERANDO A QUE DES CLIC */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}