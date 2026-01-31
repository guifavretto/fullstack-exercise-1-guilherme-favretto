const API_BASE_URL = 'http://localhost:8000';

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'launched';
  assignees: string[];
  due_date: string;
  priority: 'normal' | 'high';
}

export interface TaskCreate {
  title: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'launched';
  assignees?: string[];
  due_date?: string;
  priority?: 'normal' | 'high';
}

export interface TaskUpdate {
  title?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'launched';
  assignees?: string[];
  due_date?: string;
  priority?: 'normal' | 'high';
}

export class TaskService {
  static async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  }

  static async createTask(task: TaskCreate): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  }

  static async updateTask(id: string, updates: TaskUpdate): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  }

  static async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }
}