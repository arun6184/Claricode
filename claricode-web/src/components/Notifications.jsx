import React, { useEffect, useState } from 'react';

export default function Notifications() {
  const [messages, setMessages] = useState([]);

  // For demo, simulate notifications
  useEffect(() => {
    const timer = setInterval(() => {
      setMessages((msgs) => [...msgs, { id: Date.now(), text: 'New AI analysis complete!' }]);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  if (messages.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 max-w-xs">
      {messages.map(({ id, text }) => (
        <div
          key={id}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          {text}
        </div>
      ))}
    </div>
  );
}
