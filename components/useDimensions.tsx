import { useState, useRef, useLayoutEffect } from "react";

// Primarily used to get dimensions of the markdown container, for sizing the SVG background of boxed text.
// This is to ensure the SizedSvg component has a fixed corner size but dynamic dimensions, which requires
// arithmetic on the container dimensions.

// OUTER size: includes padding.
export function useDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    // The observer "watches" the physical DOM element
    const observer = new ResizeObserver((entries) => {
      // Get first (only) entry: observed element
      const entry = entries[0];
      if (entry) {
        // Update state with new dimensions
        const { inlineSize, blockSize } = entry.borderBoxSize[0];
        setDimensions({
          width: inlineSize,
          height: blockSize,
        });
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Return the 'ref' to attach to the HTML and the 'dimensions' to use in logic
  return [ref, dimensions] as const;
}