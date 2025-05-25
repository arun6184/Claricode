import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DiagramRenderer({ diagramText }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagramText) return;

    mermaid.initialize({ startOnLoad: true });
    try {
      mermaid.render(
        'diagram',
        diagramText,
        (svgCode) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svgCode;
          }
        },
        containerRef.current
      );
    } catch (e) {
      if (containerRef.current) containerRef.current.innerHTML = `<pre>${e.message}</pre>`;
    }
  }, [diagramText]);

  return (
    <div
      ref={containerRef}
      className="my-4 border p-2 rounded bg-gray-50 overflow-auto"
      aria-label="Diagram visualization"
    />
  );
}
