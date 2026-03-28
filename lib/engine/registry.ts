import { core10 } from '@/data/modules/core-1-0';
import { koronil14 } from '@/data/modules/koronil-1-4';

// This is your "Source of Truth" for what modules are available
export const ModuleRegistry: Record<string, any> = {
  "Core 1.0": core10,
  "Koronil 1.4": koronil14,
};

// This maps a "Reflection" to a specific list of modules
export const ReflectionMaps: Record<string, string[]> = {
  "Core": ["Core 1.0"],
  "Core 1.0":["Core 1.0"],
  "Koronil 1.4": ["Core 1.0", "Koronil 1.4"]
};