"use client";

import { ChevronLeft, FileText, Download, Play, MessageSquare, AudioLines, File as FileIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define la estructura del recurso para tipado
interface Resource {
    id: string;
    title: string;
    url: string;
    type: string;
    date: string;
    status: 'Pendiente' | 'Completado';
}

const getIcon = (type: string) => {
    switch (type) {
        case 'Video / Lección':
            return <Play size={20} className="text-primary" />;
        case 'PDF / Documento':
            return <FileIcon size={20} className="text-primary" />;
        case 'Audio / Meditación':
            return <AudioLines size={20} className="text-primary" />;
        default:
            return <FileText size={20} className="text-primary" />;
    }
};

export default function MobileTasksPage() {
    const [resources, setResources] = useState<Resource[]>([]);

    // Carga los recursos desde LocalStorage al cargar la página
    useEffect(() => {
        const storedResources = localStorage.getItem('assigned_resources');
        if (storedResources) {
            setResources(JSON.parse(storedResources));
        } else {
            // Recurso de prueba si no hay nada guardado
            setResources([{
                id: 'R000',
                title: 'Ejercicio de Respiración 4-7-8',
                url: 'https://meditacion.com/478',
                type: 'Audio / Meditación',
                date: '10 Dic',
                status: 'Pendiente'
            }]);
        }
    }, []);

    const toggleStatus = (id: string) => {
        setResources(prevResources => {
            const updatedResources = prevResources.map(resource =>
                resource.id === id
                    ? { ...resource, status: resource.status === 'Pendiente' ? 'Completado' : 'Pendiente' }
                    : resource
            );
            // Opcional: Guardar el cambio en LocalStorage si quieres persistencia
            // localStorage.setItem('assigned_resources', JSON.stringify(updatedResources));
            return updatedResources;
        });
    };

    return (
        <div className="bg-background min-h-screen text-textPrimary flex justify-center">
            <div className="w-full max-w-sm border-x border-border bg-surface shadow-2xl">
                
                {/* Header Tareas */}
                <header className="flex items-center p-4 border-b border-border bg-background sticky top-0">
                    <Link href="/mobile" className="p-2 -ml-2">
                        <ChevronLeft size={24} className="text-primary" />
                    </Link>
                    <h1 className="text-lg font-bold text-white flex-1 text-center pr-10">Mis Tareas Asignadas</h1>
                </header>

                {/* Lista de Tareas */}
                <div className="p-4 space-y-4">
                    {resources.length === 0 ? (
                        <p className="text-textSecondary text-center mt-8">No tienes tareas asignadas por ahora. ¡A disfrutar!</p>
                    ) : (
                        resources.map((resource) => (
                            <div key={resource.id} className="bg-background border border-border rounded-xl p-4 space-y-3 shadow-md">
                                <div className='flex justify-between items-start'>
                                    <div className='flex items-center gap-3'>
                                        {getIcon(resource.type)}
                                        <div>
                                            <h3 className='text-white font-bold'>{resource.title}</h3>
                                            <p className='text-xs text-textSecondary'>{resource.type} - Asignado el {resource.date}</p>
                                        </div>
                                    </div>
                                    <span 
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            resource.status === 'Completado' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                                        }`}
                                    >
                                        {resource.status}
                                    </span>
                                </div>

                                {/* Acciones */}
                                <div className="flex justify-between items-center border-t border-border pt-3 mt-3">
                                    <a 
                                        href={resource.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary text-sm font-medium hover:text-primary/70 transition-colors flex items-center gap-1"
                                    >
                                        <Download size={16}/> Ver Recurso
                                    </a>
                                    
                                    <button 
                                        onClick={() => toggleStatus(resource.id)}
                                        className={`text-sm py-1 px-3 rounded-full transition-colors ${
                                            resource.status === 'Pendiente' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-success/50 text-white hover:bg-success'
                                        }`}
                                    >
                                        {resource.status === 'Pendiente' ? 'Marcar como Hecho' : 'Deshacer'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Barra de Navegación Inferior (Simulada) */}
                <footer className="fixed bottom-0 w-full max-w-sm bg-background border-t border-border flex justify-around p-3">
                    <div className='flex flex-col items-center text-primary'>
                        <CalendarCheck size={24} />
                        <span className='text-xs mt-1'>Citas</span>
                    </div>
                    <div className='flex flex-col items-center text-textSecondary'>
                        <MessageSquare size={24} />
                        <span className='text-xs mt-1'>Chat</span>
                    </div>
                    <Link href="/mobile/tasks" className='flex flex-col items-center text-textSecondary'>
                         <FileText size={24} />
                        <span className='text-xs mt-1'>Tareas</span>
                    </Link>
                </footer>
            </div>
        </div>
    );
}