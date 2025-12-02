"use client";

import { Clock, CalendarCheck, FileText, User, Menu, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MobileDashboard() {
    // Datos simulados de la próxima cita
    const nextAppointment = {
        date: 'Miércoles, 15 Dic',
        time: '11:00 AM',
        doctor: 'Dr(a). [Tu Nombre]',
        type: 'Psicología'
    };
    // Contadores simulados (en un futuro, leerá de Supabase)
    const pendingTasks = 3; 

    return (
        <div className="bg-background min-h-screen text-textPrimary flex justify-center">
            <div className="w-full max-w-sm border-x border-border bg-surface shadow-2xl">
                
                {/* Header Móvil Superior */}
                <header className="flex justify-between items-center p-4 border-b border-border bg-background sticky top-0">
                    <div className="flex items-center gap-2">
                        <div className='w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold'>A</div>
                        <h1 className="text-lg font-bold text-white">Hola, Ana</h1>
                    </div>
                    <Menu size={24} className="text-primary" />
                </header>

                {/* Contenido Principal */}
                <div className="p-4 space-y-6">
                    
                    {/* Tarjeta de Próxima Cita (El foco principal) */}
                    <h2 className="text-sm font-bold text-textSecondary uppercase">Tu Próxima Cita</h2>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 shadow-md space-y-3">
                        <div className='flex justify-between items-center text-sm font-medium text-primary'>
                            <div className='flex items-center gap-2'><Clock size={16}/> {nextAppointment.time}</div>
                            <span className='text-xs bg-primary px-2 py-0.5 rounded-full text-white'>{nextAppointment.type}</span>
                        </div>
                        <div className='text-white font-bold text-xl'>
                            {nextAppointment.date}
                        </div>
                        <div className='text-xs text-textSecondary'>
                            Con {nextAppointment.doctor}
                        </div>
                        <button className='w-full bg-primary/20 text-primary py-2 rounded-lg text-sm font-medium mt-3 hover:bg-primary/30 transition-colors'>
                            Confirmar Asistencia
                        </button>
                    </div>

                    {/* Tareas Pendientes (Link a la otra página) */}
                    <Link href="/mobile/tasks" className="block">
                        <div className="bg-background border border-border rounded-xl p-4 flex justify-between items-center hover:border-primary/50 transition-colors">
                            <div className='flex items-center gap-3'>
                                <FileText size={20} className='text-accent'/>
                                <div>
                                    <h3 className='text-white font-bold'>Tareas Asignadas</h3>
                                    <p className='text-xs text-danger'>3 pendientes</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className='text-textSecondary' />
                        </div>
                    </Link>

                    {/* Botón de Mensajería */}
                    <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-3">
                        <User size={20} className='text-white/70'/>
                        <span className='text-sm text-white/70'>Mensaje seguro a tu terapeuta</span>
                    </div>

                </div>

                <div className='mt-8 p-4 border-t border-border'>
                    <p className='text-xs text-textSecondary text-center'>Conectado a Autosync Clinic. Tu información es privada.</p>
                </div>
            </div>
        </div>
    );
}