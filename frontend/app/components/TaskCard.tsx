import React from 'react';

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'launched';
  assignees: string[];
  due_date: string;
  priority: 'normal' | 'high';
}

interface TaskCardProps {
  task: Task;
  onUpdateStatus?: (taskId: string, newStatus: Task['status']) => void;
}

export default function TaskCard({ task, onUpdateStatus }: TaskCardProps) {
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
        {task.priority === 'high' && (
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.assignees.slice(0, 3).map((assignee, index) => (
            <div
              key={index}
              className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center"
              title={assignee}
            >
              <span className="text-white text-xs font-medium">
                {getInitials(assignee)}
              </span>
            </div>
          ))}
          {task.assignees.length > 3 && (
            <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-medium">+{task.assignees.length - 3}</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          {formatDueDate(task.due_date)}
        </div>
      </div>
    </div>
  );
}