"use client";

import React, { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState<any>({ q1: [], q2: [], q3: [], q4: [] });
  const [inputs, setInputs] = useState<any>({ q1: '', q2: '', q3: '', q4: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('my-quadrant-tasks');
    if (saved) setTasks(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('my-quadrant-tasks', JSON.stringify(tasks));
  }, [tasks, mounted]);

  const addTask = (q: string) => {
    if (!inputs[q].trim()) return;
    setTasks({ ...tasks, [q]: [...tasks[q], { id: Date.now(), text: inputs[q], completed: false }] });
    setInputs({ ...inputs, [q]: '' });
  };

  if (!mounted) return null;

  const quadrants = [
    { id: 'q1', title: '🔥 DO', color: 'bg-[#FFEBEE]', border: 'border-red-300', text: 'text-red-600' },
    { id: 'q2', title: '🌱 PLAN', color: 'bg-[#E8F5E9]', border: 'border-green-300', text: 'text-green-700' },
    { id: 'q3', title: '⚡ ROUTINE', color: 'bg-[#FFFDE7]', border: 'border-yellow-400', text: 'text-yellow-700' },
    { id: 'q4', title: '📥 BACKLOG', color: 'bg-[#F5F5F5]', border: 'border-gray-300', text: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 h-[90vh]">
        {quadrants.map((q) => (
          <div key={q.id} className={`${q.color} border-2 ${q.border} rounded-2xl p-4 flex flex-col shadow-sm`}>
            <h2 className={`font-black text-lg mb-3 ${q.text}`}>{q.title}</h2>
            <div className="flex mb-3 gap-2">
              <input
                value={inputs[q.id]}
                onChange={(e) => setInputs({ ...inputs, [q.id]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addTask(q.id)}
                className="flex-1 bg-white/80 border-none rounded-lg px-3 py-2 text-xs shadow-inner outline-none"
                placeholder="Add task"
              />
              <button onClick={() => addTask(q.id)} className="bg-white px-3 rounded-lg shadow-sm text-lg font-bold">+</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {tasks[q.id].map((task: any) => (
                <div key={task.id} className="bg-white/90 p-2 rounded-lg text-xs shadow-sm text-left">
                  {task.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
