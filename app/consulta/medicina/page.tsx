"use client";

import { useState } from 'react';
import { Save, ArrowLeft, Thermometer, Activity, Weight, Pill, Plus } from 'lucide-react';
import Link from 'next/link';

export default function MedicinaPage() {
  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans flex flex-col">
      
      {/* Header Médico (Diferente color de acento) */}
      <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/5 rounded-full text-textSecondary hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-bold text-white text-lg">Consulta: Carlos Ruiz</h1>
            <div className="flex items-center gap-2 text-xs text-success">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Paciente en sala
            </div>
          </div>
        </div>

        <button className="bg-success hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-success/20">
            <Save size={16} />
            Finalizar Consulta
        </button>
      </header>

      {/* Grid de Datos Clínicos */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Fila 1: Signos Vitales (Tarjetas Neón) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Presión */}
                <div className="bg-surface border border-border p-4 rounded-xl relative overflow-hidden group hover:border-accent transition-all">
                    <div className="absolute right-2 top-2 text-accent/20 group-hover:text-accent/40 transition-colors"><Activity size={40} /></div>
                    <label className="text-xs text-textSecondary font-bold uppercase">Presión Arterial</label>
                    <div className="flex items-baseline gap-1 mt-1">
                        <input type="text" placeholder="120/80" className="bg-transparent text-2xl font-bold text-white w-24 focus:outline-none placeholder-gray-700" />
                        <span className="text-xs text-textSecondary">mmHg</span>
                    </div>
                </div>

                {/* Temperatura */}
                <div className="bg-surface border border-border p-4 rounded-xl relative overflow-hidden group hover:border-orange-500 transition-all">
                    <div className="absolute right-2 top-2 text-orange-500/20 group-hover:text-orange-500/40 transition-colors"><Thermometer size={40} /></div>
                    <label className="text-xs text-textSecondary font-bold uppercase">Temperatura</label>
                    <div className="flex items-baseline gap-1 mt-1">
                        <input type="text" placeholder="36.5" className="bg-transparent text-2xl font-bold text-white w-20 focus:outline-none placeholder-gray-700" />
                        <span className="text-xs text-textSecondary">°C</span>
                    </div>
                </div>

                {/* Peso */}
                <div className="bg-surface border border-border p-4 rounded-xl relative overflow-hidden group hover:border-blue-500 transition-all">
                    <div className="absolute right-2 top-2 text-blue-500/20 group-hover:text-blue-500/40 transition-colors"><Weight size={40} /></div>
                    <label className="text-xs text-textSecondary font-bold uppercase">Peso</label>
                    <div className="flex items-baseline gap-1 mt-1">
                        <input type="text" placeholder="70.5" className="bg-transparent text-2xl font-bold text-white w-20 focus:outline-none placeholder-gray-700" />
                        <span className="text-xs text-textSecondary">kg</span>
                    </div>
                </div>

                {/* IMC (Calculado auto visualmente) */}
                <div className="bg-surface/50 border border-border p-4 rounded-xl flex flex-col justify-center items-center">
                    <span className="text-xs text-textSecondary">IMC Estimado</span>
                    <span className="text-xl font-bold text-success">Normal</span>
                </div>
            </div>

            {/* Fila 2: Diagnóstico y Receta */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Columna Izquierda: Diagnóstico */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Activity size={18} className="text-accent"/> Diagnóstico CIE-10
                        </h3>
                        <textarea className="w-full h-24 bg-background/50 border border-border rounded-lg p-3 text-white focus:border-accent focus:outline-none resize-none" placeholder="Escribe el diagnóstico..."></textarea>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Pill size={18} className="text-purple-400"/> Receta Médica
                            </h3>
                            <button className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 hover:bg-purple-500/20 transition-colors flex items-center gap-1">
                                <Plus size={12} /> Agregar Medicamento
                            </button>
                        </div>
                        
                        {/* Lista de medicamentos simulada */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                                <div className="p-2 bg-purple-500/10 rounded text-purple-400"><Pill size={16} /></div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-white">Amoxicilina 500mg</div>
                                    <div className="text-xs text-textSecondary">Tomar cada 8 horas por 7 días</div>
                                </div>
                                <button className="text-textSecondary hover:text-danger">×</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Datos Rápidos */}
                <div className="space-y-4">
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <h4 className="font-bold text-sm text-white mb-3">Alergias</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-danger/10 text-danger border border-danger/20 rounded-full text-xs font-bold">Penicilina</span>
                            <span className="px-3 py-1 bg-surface border border-border text-textSecondary rounded-full text-xs hover:text-white cursor-pointer">+ Añadir</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}