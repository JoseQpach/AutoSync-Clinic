"use client";

import Sidebar from '../components/Sidebar';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalIcon, Clock, MoreVertical } from 'lucide-react';

export default function AgendaPage() {
  const horas = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  const dias = ["Lunes 01", "Martes 02", "Miércoles 03", "Jueves 04", "Viernes 05"];

  return (
    <div className="flex h-screen bg-background text-textPrimary font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Cabecera de la Agenda */}
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-surface">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white">Agenda</h1>
                <div className="flex items-center bg-background border border-border rounded-lg p-1">
                    <button className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={18} /></button>
                    <span className="px-4 text-sm font-medium">Noviembre 2025</span>
                    <button className="p-1 hover:bg-white/10 rounded"><ChevronRight size={18} /></button>
                </div>
            </div>
            
            <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-medium text-textSecondary hover:text-white transition-colors">Hoy</button>
                <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
                    <Plus size={16} /> Nueva Cita
                </button>
            </div>
        </header>

        {/* Rejilla del Calendario */}
        <div className="flex-1 overflow-auto bg-background p-6">
            <div className="min-w-[1000px]"> {/* Asegura scroll horizontal si es muy pequeño */}
                
                {/* Cabecera de Días */}
                <div className="grid grid-cols-6 mb-4">
                    <div className="w-20"></div> {/* Espacio para horas */}
                    {dias.map((dia, i) => (
                        <div key={i} className="text-center">
                            <span className={`text-sm font-bold ${i === 2 ? 'text-primary' : 'text-textSecondary'}`}>{dia}</span>
                            {i === 2 && <div className="h-1 w-1 bg-primary rounded-full mx-auto mt-1"></div>} {/* Indicador de "Hoy" */}
                        </div>
                    ))}
                </div>

                {/* Cuerpo de Horas */}
                <div className="relative">
                    {/* Líneas de fondo */}
                    {horas.map((hora, i) => (
                        <div key={i} className="grid grid-cols-6 h-24 border-t border-border/30 group hover:bg-white/[0.02] transition-colors">
                            <div className="relative -top-3 text-xs text-textSecondary text-right pr-4">{hora}</div>
                            <div className="border-l border-border/30"></div>
                            <div className="border-l border-border/30"></div>
                            <div className="border-l border-border/30"></div>
                            <div className="border-l border-border/30"></div>
                            <div className="border-l border-border/30"></div>
                        </div>
                    ))}

                    {/* CITA 1: Lunes 10:00 - Confirmada */}
                    <div className="absolute top-48 left-[calc(16.66%_+_5rem)] w-[calc(16.66%_-_1rem)] h-20 bg-primary/20 border-l-4 border-primary rounded-md p-2 hover:brightness-110 cursor-pointer transition-all ml-2">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-primary-200">10:00 - 11:00</span>
                            <MoreVertical size={14} className="text-primary/50" />
                        </div>
                        <div className="font-bold text-sm text-white mt-1">Ana García</div>
                        <div className="text-xs text-primary/70 flex items-center gap-1 mt-1"><CalIcon size={10} /> Psicología</div>
                    </div>

                    {/* CITA 2: Miércoles 09:00 - Pendiente */}
                    <div className="absolute top-24 left-[calc(49.98%_+_5rem)] w-[calc(16.66%_-_1rem)] h-20 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-md p-2 hover:brightness-110 cursor-pointer transition-all ml-2">
                         <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-yellow-500">09:00 - 10:00</span>
                            <MoreVertical size={14} className="text-yellow-500/50" />
                        </div>
                        <div className="font-bold text-sm text-white mt-1">Carlos Ruiz</div>
                        <div className="text-xs text-yellow-500/70 flex items-center gap-1 mt-1"><CalIcon size={10} /> Medicina</div>
                    </div>

                     {/* CITA 3: Jueves 13:00 - Cancelada/Hueco */}
                     <div className="absolute top-[30rem] left-[calc(66.64%_+_5rem)] w-[calc(16.66%_-_1rem)] h-20 bg-border/30 border border-dashed border-textSecondary/50 rounded-md p-2 hover:bg-white/5 cursor-pointer transition-all ml-2 flex flex-col items-center justify-center text-textSecondary group">
                        <span className="text-xs font-medium group-hover:text-white">Hueco Disponible</span>
                        <Plus size={16} className="mt-1 opacity-50 group-hover:opacity-100"/>
                    </div>

                </div>
            </div>
        </div>
      </main>
    </div>
  );
}