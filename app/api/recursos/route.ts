import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';

// VARIABLES (El ID de tu proyecto y la llave maestra)
const SUPABASE_URL = 'https://ckhjcgkyvrrzxcmimklp.supabase.co';
// ⚠️ CLAVE SECRETA: REEMPLAZA ESTE TEXTO CON TU SERVICE_ROLE KEY
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNraGpjZ3lrdnJyenhjbWlta2xwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDQ2MDc2OSwiZXhwIjoyMDgwMDM2NzY5fQ.DGX3rSzjZppUe43aQYtAOVP8RqlDWPuH4jiZWPFVcAw'; 

// Aplicamos .trim() para limpiar espacios y usamos la clave secreta
const supabase = createClient(
  SUPABASE_URL.trim(), 
  SERVICE_ROLE_KEY.trim() 
)

export async function POST(request: NextRequest) {
  try {
    const datos = await request.json()
    
    // Insertamos el recurso
    const { data, error } = await supabase
      .from('recursos') 
      .insert([
        {
            // Usamos un ID de paciente fijo (1) para probar la inserción
            paciente_id: 1, 
            titulo: datos.titulo,
            contenido_url: datos.contenido_url,
            tipo: datos.tipo,
            status: datos.status,
        }
      ])
      .select()

    if (error) {
        console.error("Supabase Error:", error);
        throw error;
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: error.message || 'Error desconocido' }, { status: 500 })
  }
}