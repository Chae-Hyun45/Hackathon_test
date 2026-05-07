/*
 * Copilot Prompt:
 * Implement a TypeScript API client for Todo tasks with the following functions:
 * - fetchTasks(): GET /api/tasks - Retrieve all tasks
 * - createTask(text: string): POST /api/tasks - Create new task
 * - toggleTask(id: string): PATCH /api/tasks/:id - Toggle task completion
 * - deleteTask(id: string): DELETE /api/tasks/:id - Delete task
 * Handle errors gracefully and return typed responses
 */

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await apiClient.get<Task[]>('/tasks')
    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

export const createTask = async (text: string): Promise<Task> => {
  try {
    const response = await apiClient.post<Task>('/tasks', { text })
    return response.data
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}

export const toggleTask = async (id: string): Promise<Task> => {
  try {
    const response = await apiClient.patch<Task>(`/tasks/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Error toggling task:', error)
    throw error
  }
}

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/tasks/${id}`)
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

export default apiClient
