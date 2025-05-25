import React, { useState } from 'react';

export default function QueryInput({ onQuery }) {
  const [input, setInput] = useState('');

  function submitQuery(e) {
    e.preventDefault();
    if (!input.trim()) return;
    onQuery(input.trim());
    setInput('');
  }

  return (
    <form onSubmit={submitQuery} className="mb-6">
      <label className="block font-semibold mb-2">Enter your query:</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about your codebase..."
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Ask
      </button>
    </form>
  );
}
