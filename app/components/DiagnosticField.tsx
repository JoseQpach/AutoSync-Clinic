"use client";

import { Search, Tag, X } from 'lucide-react';
import { useState, useMemo } from 'react';

// --- MOCK DATA SIMULANDO CIE-11 / DSM-5 ---
const mockDiagnoses = [
  { code: 'F41.9', name: 'Trastorno de Ansiedad no especificado' },
  { code: 'F32.9', name: 'Episodio Depresivo mayor, sin especificar' },
  { code: 'F90.0', name: 'Trastorno por Déficit de Atención (TDAH)' },
  { code: 'F43.1', name: 'Trastorno de Estrés Postraumático (TEPT)' },
  { code: 'Z73.0', name: 'Problemas relacionados con Burnout' },
  { code: 'F40.0', name: 'Agorafobia' },
  { code: 'F10.2', name: 'Trastorno por Consumo de Alcohol, dependencia' },
];

interface DiagnosticFieldProps {
    onSelect: (code: string, name: string) => void;
    currentDx: { code: string; name: string } | null;
}

export default function DiagnosticField({ onSelect, currentDx }: DiagnosticFieldProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Lógica de búsqueda en tiempo real
  const filteredResults = useMemo(() => {
    if (!searchTerm) return [];
    return mockDiagnoses.filter(dx => 
      dx.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dx.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limitar a 5 resultados
  }, [searchTerm]);
  
  // Borrar el diagnóstico seleccionado
  const handleClear = () => {
      onSelect('', '');
      setSearchTerm('');
  };

  if (currentDx && currentDx.code) {
    // Vista cuando el DX ya fue seleccionado
    return (
        <div className="flex items-center justify-between bg-primary/20 border border-primary/40 rounded-xl p-4 text-white shadow-md">
            <div className='flex items-center gap-2'>
                <Tag size={18} className='text-primary' />
                <div>
                    <div className='font-bold text-sm'>{currentDx.code}</div>
                    <div className='text-xs text-textSecondary'>{currentDx.name}</div>
                </div>
            </div>
            <button onClick={handleClear} className='p-1 rounded-full text-danger hover:bg-danger/10 transition-colors'>
                <X size={16} />
            </button>
        </div>
    );
  }

  // Vista del buscador
  return (
    <div className="relative">
      <div className="flex items-center bg-background border border-border rounded-xl p-3 focus-within:border-primary transition-colors">
        <Search size={18} className="text-textSecondary mr-3" />
        <input
          type="text"
          placeholder="Buscar diagnóstico (ej: F41.9, ansiedad)"
          className="w-full bg-transparent text-white focus:outline-none placeholder-gray-600 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Retraso para permitir clic
        />
      </div>

      {/* Menú Desplegable de Resultados */}
      {(isFocused && searchTerm) && filteredResults.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-surface border border-primary/50 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {filteredResults.map((dx) => (
            <button
              key={dx.code}
              onClick={() => onSelect(dx.code, dx.name)}
              className="w-full text-left p-3 hover:bg-primary/10 transition-colors text-white border-b border-border last:border-b-0"
            >
              <div className='font-bold text-sm text-accent'>{dx.code}</div>
              <div className='text-xs text-textSecondary'>{dx.name}</div>
            </button>
          ))}
        </div>
      )}
      
      {/* Mensaje de no encontrado */}
      {(isFocused && searchTerm) && filteredResults.length === 0 && (
          <div className="absolute z-20 w-full mt-1 bg-surface border border-border rounded-xl p-3 text-textSecondary text-sm">
              No se encontraron coincidencias.
          </div>
      )}
    </div>
  );
}