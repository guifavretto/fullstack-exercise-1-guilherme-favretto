import React from 'react';

interface ProjectHeaderProps {
  onAddNew?: () => void;
}

export default function ProjectHeader({ onAddNew }: ProjectHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-900">Website Redesign</h2>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-medium">JD</span>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-medium">AB</span>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-medium">+2</span>
            </div>
          </div>
          
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Share
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Automation
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <nav className="flex space-x-8">
          <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Overview</a>
          <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">List</a>
          <a href="#" className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Board</a>
          <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Calendar</a>
          <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Files</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Due Date</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Assignee</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Priority</option>
          </select>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Advance Filters
          </button>
          <button 
            onClick={onAddNew}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            + Add New
          </button>
        </div>
      </div>
    </div>
  );
}