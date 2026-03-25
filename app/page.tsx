// @ts-nocheck
"use client";

import React, { useState, useEffect } from 'react';

export default function QuadrantApp() {
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
    setTasks({ ...tasks, [q]: tasks[q].filter((t) => t.id !== id) });
  };

  const toggleTask = (q, id) => {
    setTasks({
      ...tasks,
      [q]: tasks[q].map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    });
  };

  if (!mounted) return null;

  const quadrants = [
    { id: 'q1', title: '🔥 DO', color: 'bg-[#FFEBEE]', border: 'border-red-300', text: 'text-red-600' },
    { id: 'q2', title: '🌱 PLAN', color: 'bg-green-50', border: 'border-green-300', text: 'text-green-700' },
    { id: 'q3', title: '⚡ ROUTINE', color: 'bg-[#FFFDE7]', border: 'border-yellow-500', text: 'text-yellow-700' },
    { id: 'q4', title: '📥 BACKLOG', color: 'bg-[#F5F5F5]', border: 'border-gray-400', text: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4 h-[calc(100vh-20px)] sm:h-[calc(100vh-40px)]">
        {quadrants.map((q) => (
          <div key={q.id} className={`${q.color} border-2 ${q.border} rounded-xl p-3 sm:p-5 flex flex-col shadow-sm overflow-hidden`}>
            <h2 className={`font-black text-sm sm:text-xl mb-2 sm:mb-4 ${q.text}`}>{q.title}</h2>
            <div className="flex mb-3 sm:mb-4 gap-1 sm:gap-2">
              <input
                type="text"
                value={inputs[q.id]}
                onChange={(e) => setInputs({ ...inputs, [q.id]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addTask(q.id)}
                placeholder="Add"
                className="flex-1 bg-white/80 border-none rounded-lg px-2 py-1.5 shadow-inner outline-none text-[11px] sm:text-xs min-w-0"
              />
              <button onClick={() => addTask(q.id)} className="bg-white p-1.5 rounded-lg shadow-sm text-gray-700 font-bold">+</