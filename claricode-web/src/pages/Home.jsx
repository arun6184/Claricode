import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Claricode</h1>
      <p className="mb-4 text-lg">Role-aware AI assistant for understanding codebases.</p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
