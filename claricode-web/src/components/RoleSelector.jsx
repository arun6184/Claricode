import React from 'react';

export default function RoleSelector({ role, onChange }) {
  return (
    <div>
      <label className="mr-2 font-semibold">Select Role:</label>
      <select
        value={role}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-2"
      >
        <option value="developer">Developer</option>
        <option value="tester">Tester</option>
        <option value="manager">Manager</option>
      </select>
    </div>
  );
}
