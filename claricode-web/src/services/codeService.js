const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function uploadCodebase(file) {
  const formData = new FormData();
  formData.append('codebase', file);

  const res = await fetch(`${API_URL}/code/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');

  const data = await res.json();
  return data.codebaseId; // backend returns an id
}

async function getExplanation({ role, query, codebaseId }) {
  const res = await fetch(`${API_URL}/code/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, query, codebaseId }),
  });

  if (!res.ok) throw new Error('Explanation failed');

  return await res.json(); // { text: "...", diagram: "mermaid text" }
}

export default { uploadCodebase, getExplanation };
