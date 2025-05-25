import React, { useState, useEffect } from 'react';
import RoleSelector from '../components/RoleSelector';
import CodeUploader from '../components/CodeUploader';
import QueryInput from '../components/QueryInput';
import ExplanationDisplay from '../components/ExplanationDisplay';
import Notifications from '../components/Notifications';

export default function Dashboard() {
  const [role, setRole] = useState('developer');
  const [codebaseId, setCodebaseId] = useState(null);
  const [query, setQuery] = useState('');
  const [explanation, setExplanation] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Claricode Dashboard</h1>
        <RoleSelector role={role} onChange={setRole} />
      </header>

      <section>
        <CodeUploader onUpload={(id) => setCodebaseId(id)} />
      </section>

      <section>
        <QueryInput onQuery={setQuery} />
      </section>

      <section>
        <ExplanationDisplay
          role={role}
          query={query}
          codebaseId={codebaseId}
          onExplain={setExplanation}
        />
      </section>

      <Notifications />
    </div>
  );
}

