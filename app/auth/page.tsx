"use client"; // Importante para que el Login funcione en el navegador

import { useState } from 'react';
import { Mail, Lock, User, LogIn, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
// USAMOS EL CLIENTE ESTÁNDAR DE SUPABASE, que es universalmente compatible.
import { createClient } from '@supabase/supabase-js'; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre Login y Registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Inicializamos el cliente de Supabase usando las variables de entorno
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      
      if (isLogin) {
        // --- LÓGICA DE LOGIN ---
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        result = { error };
      } else {
        // --- LÓGICA DE REGISTRO ---
        const { data, error } = await supabase.auth.signUp({ email, password });
        result = { error };
      }

      if (result.error) {
        alert('Error: ' + result.error.message);
      } else {
        if (!isLogin) {
            alert('Registro exitoso. Revisa tu correo electrónico para confirmar la cuenta.');
        }
        // Forzamos un refresh para recargar la sesión y entrar al dashboard
        router.refresh(); 
      }
    } catch (error: any) {
      alert('Error desconocido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl shadow-2xl p-8">
        
        <h1 className="text-3xl font-extrabold text-white text-center mb-2">
            Autosync Clinic
        </h1>
        <p className="text-center text-textSecondary mb-8">
            {isLogin ? 'Inicia sesión para acceder a tus expedientes.' : 'Regístrate para empezar.'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          
          {/* Campo Email */}
          <div>
            <label className="text-xs font-bold text-textSecondary uppercase flex items-center gap-1"><Mail size={14} /> Email</label>
            <input 
              required type="email"
              className="w-full bg-background border border-border rounded-lg p-3 text-white mt-1 focus:border-primary focus:outline-none"
              placeholder="tu@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="text-xs font-bold text-textSecondary uppercase flex items-center gap-1"><Lock size={14} /> Contraseña</label>
            <input 
              required type="password"
              className="w-full bg-background border border-border rounded-lg p-3 text-white mt-1 focus:border-primary focus:outline-none"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {/* Botón Principal */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-3 rounded-xl mt-6 flex justify-center items-center gap-2 transition-all shadow-lg shadow-primary/25 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : isLogin ? <LogIn size={20} /> : <User size={20} />}
            {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Registrarme'}
          </button>
        </form>

        {/* Enlace de cambio */}
        <div className="mt-6 text-center text-textSecondary">
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primaryHover font-medium flex items-center justify-center w-full"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia Sesión'}
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
}