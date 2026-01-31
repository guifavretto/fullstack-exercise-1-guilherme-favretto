import React from 'react';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'launched';
  assignees: string[];
  due_date: string;
  priority: 'normal' | 'high';
}

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskStatus?: (taskId: string, newStatus: Task['status']) => void;
}

export default function KanbanBoard({ tasks, onUpdateTaskStatus }: KanbanBoardProps) {
  const columns = [
    { id: 'pending', title: 'Pending', color: 'gray' },
    { id: 'in_progress', title: 'In Progress', color: 'yellow' },
    { id: 'completed', title: 'Completed', color: 'green' },
    { id: 'launched', title: 'Launched', color: 'purple' }
  ];

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getColumnColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      gray: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' }
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="flex-1 overflow-x-auto p-6">
      <div className="flex space-x-6 min-w-max">
        {columns.map(column => {
          const columnTasks = getTasksByStatus(column.id as Task['status']);
          const colorClasses = getColumnColorClasses(column.color);
          
          return (
            <div key={column.id} className="w-80 flex-shrink-0">
              <div className={`${colorClasses.bg} ${colorClasses.border} border rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-semibold ${colorClasses.text}`}>
                    {column.title}
                  </h3>
                  <span className={`text-xs ${colorClasses.text} font-medium`}>
                    {columnTasks.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {columnTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdateStatus={onUpdateTaskStatus}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}