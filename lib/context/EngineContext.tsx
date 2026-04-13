'use client'; // Required in Next.js App Router (?)
import { createContext, useContext, useMemo } from 'react';
import { ModuleRegistry, ReflectionMaps } from '@/lib/engine/registry';

const EngineContext = createContext<any>(null);

export function EngineProvider({ reflection, children }: { reflection: string, children: React.ReactNode }) {
  const activeRuleset = useMemo(() => {
    const moduleIds = ReflectionMaps[reflection] || ["Core 1.0"]; //default is Core 1.0, will probably create as 
    // a global constant somewhere in the future for easier use
    const categories = [
      "ancestries", "classes", "jobs", "talents", "loot", 
      "supplies", "weapons", "supportItems", "techniques", 
      "npcs", "templates"
    ];
    
    // each Reflection contains an array of modules, usually ["Core X.X", "ReflectionName X.X"]
    // Merge modules: later modules in the array override earlier ones
    return moduleIds.reduce((acc, id) => {
      const moduleData = ModuleRegistry[id];
      categories.forEach(cat => {
        acc[cat] = { ...acc[cat], ...(moduleData[cat] || {}) };
      });

      return acc;
    }, categories.reduce((o, key) => ({ ...o, [key]: {} }), {} as any));
  }, [reflection]);

  return (
    <EngineContext.Provider value={activeRuleset}>
      {children}
    </EngineContext.Provider>
  );
}

export const useEngine = () => useContext(EngineContext);