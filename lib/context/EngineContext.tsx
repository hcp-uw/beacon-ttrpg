'use client'; // Required in Next.js App Router (?)
import { createContext, useContext, useMemo } from 'react';
import { ModuleRegistry, ReflectionMaps } from '@/lib/engine/registry';

const EngineContext = createContext<any>(null);

export function EngineProvider({ reflection, children }: { reflection: string, children: React.ReactNode }) {
  const activeRuleset = useMemo(() => {
    const moduleIds = ReflectionMaps[reflection] || ["Core 1.0"]; //default is Core 1.0, will probbaly create as 
    // a global constant somewhere in the future for easier use
    
    // each Reflection contains an array of modules, usually ["Core X.X", "ReflectionName X.X"]
    // Merge modules: later modules in the array override earlier ones
    return moduleIds.reduce((acc, id) => {
      const moduleData = ModuleRegistry[id];
      return {
        ...acc,
        
        ancestries: { ...acc.ancestries, ...moduleData.ancestries },
        classes: { ...acc.classes, ...moduleData.classes },
        jobs: { ...acc.jobs, ...moduleData.jobs },
        talents: { ...acc.talents, ...moduleData.talents },
        loot: { ...acc.loot, ...moduleData.loot },
        supplies: { ...acc.supplies, ...moduleData.supplies },
        weapons: { ...acc.weapons, ...moduleData.weapons },
        supportItems: { ...acc.supportItems, ...moduleData.supportItems },
        techniques: { ...acc.techniques, ...moduleData.techniques },
        npcs: { ...acc.npcs, ...moduleData.npcs },
        templates: { ...acc.templates, ...moduleData.templates },
      };
    }, { ancestries: {}, ancestryTraits: {}, classes: {}, jobs: {}, talents: {}, loot: {}, supplies: {}, weapons: {}, supportItems: {}, techniques: {}, npcs: {}, templates: {} });
  }, [reflection]);

  return (
    <EngineContext.Provider value={activeRuleset}>
      {children}
    </EngineContext.Provider>
  );
}

export const useEngine = () => useContext(EngineContext);