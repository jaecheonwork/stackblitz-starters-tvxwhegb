// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState<any>({ q1: [], q2: [], q3: [], q4: [] });
  const [inputs, setInputs] = useState<any>({ q1: '', q2: '', q3: '', q4: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('my-tasks');
    if (saved) setTasks(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks, mounted]);

  const add = (q: string) => {
    if (!inputs[q].trim()) return;
    setTasks({ ...tasks, [q]: [...tasks[q], { id: Date.now(), text: inputs[q], completed: false }] });
    setInputs({ ...inputs, [q]: '' });
  };

  if (!mounted) return null;

  return (
    <div className="p-4 grid grid-cols-2 gap-4 min-h-screen bg-gray-100 font-sans">
      {['q1', 'q2', 'q3', 'q4'].map((q) => (
        <div key={q} className="bg-white p-4 rounded-xl shadow border-2 border-gray-200">
          <h2 className="font-bold mb-2">{q.toUpperCase()}</h2>
          <div className="flex gap-2 mb-4">
            <input 
              value={inputs[q]} 
              onChange={(e) => setInputs({...inputs, [q]: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && add(q)}
              className="border p-1 flex-1 rounded text-sm" 
            />
            <button onClick={() => add(q)} className="bg-black text-white px-2 rounded">+</button>
          </div>
          <div className="space-y-2">
            {tasks[q].map((t: any) => (
              <div key={t.id} className="text-sm p-2 bg-gray-50 rounded border">{t.text}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
