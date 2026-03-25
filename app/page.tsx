"use client";

import React, { useState, useEffect } from 'react';

// 💡 깐깐한 심사관을 위한 완벽한 신분증(Type) 발급!
type Task = { id: number; text: string; completed: boolean };
type TasksState = { [key: string]: Task[] };
type InputsState = { [key: string]: string };

export default function QuadrantApp() {
  const [tasks, setTasks] = useState<TasksState>({ q1: [], q2: [], q3: [], q4: [] });
  const [inputs, setInputs] = useState<InputsState>({ q1: '', q2: '', q3: '', q4: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('my-quadrant-tasks');
    if (saved) setTasks(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('my-quadrant-tasks', JSON.stringify(tasks));
  }, [tasks, mounted]);

  // 💡 여기! q가 문자(string)라고 명확히 알려줍니다.
  const addTask = (q: string) => {
    if (!inputs[q].trim()) return;
    setTasks({ 
      ...tasks, 
      [q]: [...tasks[q], { id: Date.now(), text: inputs[q], completed: false }] 
    });
    setInputs({ ...inputs, [q]: '' });
  };

  const deleteTask = (q: string, id: number) => {
    setTasks({ ...tasks, [q]: tasks[q].filter(task => task.id !== id) });
  };

  const toggleTask = (q: string, id: number) => {
    setTasks({
      ...tasks,
      [q]: tasks[q].map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    });
  };

  if (!mounted) return null;

  // 💡 처음에 보여드린 그 예쁜 아이콘들
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

  // 💡 처음에 보여드린 알록달록한 테두리와 배경색
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
          <div key={q.id} className={`${q.color} border-2 ${q.border} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col
