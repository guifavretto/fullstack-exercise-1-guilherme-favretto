'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProjectHeader from './components/ProjectHeader';
import KanbanBoard from './components/KanbanBoard';
import { TaskService, Task, TaskCreate } from './services/taskService';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await TaskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = async () => {
    const newTask: TaskCreate = {
      title: 'New Task',
      status: 'pending',
      assignees: ['user1'],
      due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      priority: 'normal'
    };

    try {
      const createdTask = await TaskService.createTask(newTask);
      setTasks(prev => [...prev, createdTask]);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      await TaskService.updateTask(taskId, { status: newStatus });
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Search query:', query);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onAddNew={handleAddNew} />
      <div className="flex-1 flex flex-col">
        <Header onSearch={handleSearch} />
        <ProjectHeader onAddNew={handleAddNew} />
        <KanbanBoard tasks={tasks} onUpdateTaskStatus={handleUpdateTaskStatus} />
      </div>
    </div>
  );
}