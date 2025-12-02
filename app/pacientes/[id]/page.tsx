"use client";

import { ArrowLeft, Edit, Clock, Calendar, User, Phone, Mail, Activity, AlertTriangle, MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar'; // <-- RUTA ABSOLUTA (Línea 5)
import { useParams } from 'next/navigation'; // <-- ESTA LÍNEA DEBE IR SEPARADA
const pacienteMock = {
    id: 'P001',
    nombre: 'Ana García',
    edad: 28,
    telefono: '+51 999 000 111',
    email: 'ana.g@ejemplo.com',
    tipo: 'Psicología',
    alergias: ['Ninguna'],
    historial: [
        { fecha: '25 Nov 2025', tipo: 'Psicología', titulo: 'Sesión 4: Ansiedad Laboral', nota: 'Se exploran técnicas de respiración. Muestra mejoría en el sueño. Pendiente: Tarea de mindfulness.' },
        { fecha: '18 Nov 2025', tipo: 'Psicología', titulo: 'Sesión 3: Estructura Familiar', nota: 'Trabajo sobre el genograma familiar. Identifica patrones de estrés en el entorno.' },
        { fecha: '01 Oct 2025', tipo: 'Medicina', titulo: 'Chequeo General', nota: 'Presión 120/80. Peso 65kg. Receta: Vitamina D. No hay observaciones relevantes.' },
    ]
};

export default function PatientProfilePage() {
    
    const params = useParams();
    const pacienteId = params.id;
    
    // Definimos la URL de la consulta basada en el tipo del paciente
    const consultaUrl = `/consulta/${pacienteMock.tipo.toLowerCase()}/${pacienteId}`;


    return (
        <div className="flex h-screen bg-background text-textPrimary font-sans">
            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                
                {/* Cabecera del Perfil */}
                <header className="h-20 border-b border-border bg-surface flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Link href="/pacientes" className="p-2 hover:bg-white/10 rounded-full text-textSecondary hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-white">
                            {pacienteMock.nombre} <span className="text-textSecondary font-normal text-lg">({pacienteMock.edad} años)</span>
                        </h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border bg-accent/10 text-accent border-accent/20`}>
                            {pacienteMock.tipo}
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 text-sm font-medium border border-border rounded-lg text-textSecondary hover:bg-white/5 transition-colors flex items-center gap-2">
                            <MessageSquare size={16} /> Mensaje Rápido
                        </button>
                        <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all">
                            <Edit size={16} /> Editar Datos
                        </button>
                    </div>
                </header>

                {/* Contenido del Perfil: Datos y Timeline */}
                <div className="flex-1 overflow-auto p-8 bg-background">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        
                        {/* COLUMNA IZQUIERDA: RESUMEN Y CONTACTO */}
                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider">Información Básica</h3>
                            
                            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone size={16} className="text-primary" />
                                    <span className="text-white">{pacienteMock.telefono}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail size={16} className="text-primary" />
                                    <span className="text-white">{pacienteMock.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <User size={16} className="text-primary" />
                                    <span className="text-white">ID: {pacienteId}</span>
                                </div>
                            </div>
                            
                            <div className="bg-danger/10 border border-danger/40 rounded-xl p-5 space-y-2">
                                <h4 className="font-bold text-danger flex items-center gap-2">
                                    <AlertTriangle size={18} /> Alergias y Riesgos
                                </h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {pacienteMock.alergias.map((alergia, i) => (
                                        <span key={i} className="px-3 py-1 bg-danger/20 text-danger border border-danger/50 rounded-full text-xs font-medium">
                                            {alergia}
                                        </span>
                                    ))}
                                    <span className="px-3 py-1 bg-surface border border-border text-textSecondary rounded-full text-xs cursor-pointer hover:bg-white/5">+ Agregar</span>
                                </div>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: TIMELINE DE SESIONES */}
                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-6">Historial de Citas</h3>
                            
                            {pacienteMock.historial.map((cita, index) => (
                                <div key={index} className="flex relative mb-8 pl-12 last:mb-0">
                                    
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50 group-hover:bg-primary transition-colors"></div>
                                    
                                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary z-10"></div>

                                    <div className="flex-1 bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors shadow-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-white text-base">{cita.titulo}</span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    cita.tipo === 'Psicología' ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'
                                                }`}>
                                                    {cita.tipo}
                                                </span>
                                            </div>
                                            <span className="text-xs text-textSecondary flex items-center gap-1"><Calendar size={12} /> {cita.fecha}</span>
                                        </div>
                                        <p className="text-textSecondary text-sm mt-1">{cita.nota}</p>
                                    </div>
                                </div>
                            ))}

                             {/* BOTÓN CONECTADO A LA CONSULTA */}
                             <div className="mt-8">
                                <Link 
                                    href={consultaUrl}
                                    className="w-full block text-center py-3 border border-dashed border-primary/50 text-primary rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={16}/> Iniciar Nueva Sesión de {pacienteMock.tipo} con {pacienteMock.nombre}
                                </Link>
                             </div>

                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}