import React, { useState } from 'react';
import codeService from '../services/codeService';

export default function CodeUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const id = await codeService.uploadCodebase(file);
      onUpload(id);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Upload Codebase (ZIP):</label>
      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        disabled={!file || uploading}
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
