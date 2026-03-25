// @ts-nocheck
"use client";

import React, { useState, useEffect } from 'react';

const QuadrantApp = () => {
  const [tasks, setTasks] = useState({ q1: [], q2: [], q3: [], q4: [] });
  const [inputs, setInputs] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('my-quadrant-tasks');
    if (saved) setTasks(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('my-quadrant-tasks', JSON.stringify(tasks));
  }, [tasks, mounted]);

  const addTask = (q) => {
    if (!inputs[q].trim()) return;
    setTasks({ 
      ...tasks, 
      [q]: [...tasks[q], { id: Date.now(), text: inputs[q], completed: false }] 
    });
    setInputs({ ...inputs, [q]: '' });
  };

  const deleteTask = (q, id) => {
    setTasks({ ...tasks, [q]: tasks[q].filter(task => task.id !== id) });
  };

  const toggleTask = (q, id) => {
    setTasks({
      ...tasks,
      [q]: tasks[q].map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    });
  };

  if (!mounted) return null;

  const CutePlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  );
  const CuteTrashIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
    </svg>
  );
  
  const SquareIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  );
  
  const CheckedSquareIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <polyline points="9 12 12 15 16 9"></polyline>
    </svg>
  );

  const quadrants = [
    { id: 'q1', title: '🔥 DO', color: 'bg-[#FFEBEE]', border: 'border-red-300', text: 'text-red-600' },
    { id: 'q2', title: '🌱 PLAN', color: 'bg-green-50', border: 'border-green-300', text: 'text-green-700' },
    { id: 'q3', title: '⚡ ROUTINE', color: 'bg-[#FFFDE7]', border: 'border-yellow-500', text: 'text-yellow-700' },
    { id: 'q4', title: '📥 BACKLOG', color: 'bg-[#F5F5F5]', border: 'border-gray-400', text: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4 h-[calc(100vh-20px)] sm:h-[calc(100vh-40px)] min-h-[400px]">
        {quadrants.map((q) => (
          <div key={q.id} className={`${q.color} border-2 ${q.border} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col shadow-sm overflow-hidden`}>
            <h2 className={`font-black text-sm sm:text-xl mb-2 sm:mb-4 whitespace-nowrap overflow-hidden text-ellipsis ${q.text}`}>{q.title}</h2>
            
            <div className="flex mb-3 sm:mb-4 gap-1 sm:gap-2">
              <input
                type="text"
                value={inputs[q.id]}
                onChange={(e) => setInputs({ ...inputs, [q.id]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addTask(q.id)}
                placeholder="Add"
                className="flex-1 bg-white/80 border-none rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-inner outline-none text-[11px] sm:text-xs focus:ring-2 focus:ring-black/5 min-w-0"
              />
              <button onClick={() => addTask(q.id)} className="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm hover:scale-110 transition-transform text-gray-700 flex-shrink-0 flex items-center justify-center">
                <CutePlusIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
              {tasks[q.id].map((task) => (
                <div 
                  key={task.id} 
                  className={`bg-white/90 p-2 sm:p-3 rounded-lg flex justify-between items-center group shadow-sm hover:shadow-md transition-all ${task.completed ? 'opacity-60 bg-gray-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2 flex-1 overflow-hidden cursor-pointer" onClick={() => toggleTask(q.id, task.id)}>
                    <button className="flex-shrink-0 hover:scale-110 transition-transform">
                      {task.completed ? <CheckedSquareIcon /> : <SquareIcon />}
                    </button>
                    <span className={`text-[11px] sm:text-xs font-medium truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.text}
                    </span>
                  </div>

                  <button onClick={() => deleteTask(q.id, task.id)} className="text-gray-300 hover:text-red-500 transition-colors ml-1 sm:ml-2 flex-shrink-0">
                    <CuteTrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuadrantApp;