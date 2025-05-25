import React, { useEffect, useState } from 'react';
import DiagramRenderer from './DiagramRenderer';
import codeService from '../services/codeService';

export default function ExplanationDisplay({ role, query, codebaseId, onExplain }) {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [diagramData, setDiagramData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || !codebaseId) return;

    async function fetchExplanation() {
      setLoading(true);
      setError(null);
      try {
        const response = await codeService.getExplanation({ role, query, codebaseId });
        setExplanation(response.text);
        setDiagramData(response.diagram); // could be Mermaid/PlantUML text
        onExplain && onExplain(response.text);
      } catch (err) {
        setError(err.message || 'Failed to fetch explanation');
      } finally {
        setLoading(false);
      }
    }

    fetchExplanation();
  }, [role, query, codebaseId, onExplain]);

  if (!query) return null;

  return (
    <div className="bg-white rounded shadow p-4">
      {loading && <p>Loading explanation...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {explanation && <p className="whitespace-pre-wrap">{explanation}</p>}
      {diagramData && <DiagramRenderer diagramText={diagramData} />}
    </div>
  );
}
