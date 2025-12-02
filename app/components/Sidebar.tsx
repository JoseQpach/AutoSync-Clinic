"use client";

import { Calendar, Users, Home, Activity, Settings, LogOut } from 'lucide-react';
import Link from 'next/link'; 
import { usePathname, useRouter } from 'next/navigation'; // Importamos el useRouter
import { createClient } from '@supabase/supabase-js'; // Importamos el cliente estándar

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Inicializamos el router para la redirección
  
  // Inicializamos Supabase para el Logout
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Users, label: "Pacientes", href: "/pacientes" },
    { icon: Calendar, label: "Agenda", href: "/agenda" },
    { icon: Activity, label: "Clínica", href: "/consulta/medicina" },
  ];

  const handleLogout = async () => {
    // Cerramos la sesión en Supabase
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert('Error al cerrar sesión: ' + error.message);
    } else {
        // Redirigimos al Login después de cerrar
        router.push('/auth');
    }
  };

  return (
    <div className="h-screen w-20 md:w-64 bg-surface border-r border-border flex flex-col justify-between p-4 transition-all duration-300">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/30">A</div>
          <span className="font-bold text-xl hidden md:block text-white tracking-tight">Autosync</span>
        </div>

        {/* Menú de Navegación */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={index}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-textSecondary hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? "text-primary" : "group-hover:text-white"} />
                <span className="hidden md:block font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Botones de abajo y Logout */}
      <div className="space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-3 text-textSecondary hover:text-white transition-colors rounded-xl hover:bg-white/5">
          <Settings size={20} />
          <span className="hidden md:block">Ajustes</span>
        </button>
        <div className="border-t border-border my-2 pt-2">
             <button 
                onClick={handleLogout} // <--- FUNCIÓN DE LOGOUT CONECTADA
                className="w-full flex items-center gap-3 px-3 py-3 text-danger hover:bg-danger/10 rounded-xl transition-colors"
             >
                <LogOut size={20} />
                <span className="hidden md:block">Cerrar Sesión</span>
             </button>
        </div>
      </div>
    </div>
  );
}