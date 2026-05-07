/*
 * Copilot Prompt:
 * Define the Task model interface with:
 * 1. id: string (UUID)
 * 2. text: string (task content)
 * 3. completed: boolean (completion status)
 * 4. createdAt: string (ISO date)
 * 5. updatedAt: string (ISO date)
 */

export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateTaskInput {
  text: string
}

export interface UpdateTaskInput {
  text?: string
  completed?: boolean
}
