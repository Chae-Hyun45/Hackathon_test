/*
 * Copilot Prompt:
 * Create an in-memory task service layer with:
 * 1. Store tasks in a Map (id -> Task)
 * 2. Implement CRUD operations: create, read, readAll, update, delete
 * 3. Generate UUIDs for new tasks
 * 4. Validate input (non-empty text, max length)
 * 5. Update timestamps on modifications
 * 6. Handle not found errors gracefully
 * Note: This is in-memory storage; can be replaced with file/database later
 */

import { v4 as uuidv4 } from 'uuid'
import { Task, CreateTaskInput, UpdateTaskInput } from '@models/task'

class TaskService {
  private tasks: Map<string, Task> = new Map()

  create(input: CreateTaskInput): Task {
    if (!input.text || input.text.trim().length === 0) {
      throw new Error('Task text is required')
    }

    if (input.text.length > 100) {
      throw new Error('Task text must be 100 characters or less')
    }

    const now = new Date().toISOString()
    const task: Task = {
      id: uuidv4(),
      text: input.text.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    }

    this.tasks.set(task.id, task)
    console.log(`✓ Created task: ${task.id}`)
    return task
  }

  readAll(): Task[] {
    return Array.from(this.tasks.values())
  }

  read(id: string): Task {
    const task = this.tasks.get(id)
    if (!task) {
      throw new Error(`Task not found: ${id}`)
    }
    return task
  }

  update(id: string, input: UpdateTaskInput): Task {
    const task = this.read(id)

    if (input.text !== undefined) {
      if (input.text.trim().length === 0) {
        throw new Error('Task text cannot be empty')
      }
      if (input.text.length > 100) {
        throw new Error('Task text must be 100 characters or less')
      }
      task.text = input.text.trim()
    }

    if (input.completed !== undefined) {
      task.completed = input.completed
    }

    task.updatedAt = new Date().toISOString()
    this.tasks.set(id, task)
    console.log(`✓ Updated task: ${id}`)
    return task
  }

  delete(id: string): void {
    const exists = this.tasks.has(id)
    if (!exists) {
      throw new Error(`Task not found: ${id}`)
    }
    this.tasks.delete(id)
    console.log(`✓ Deleted task: ${id}`)
  }

  // Initialize with sample data (optional)
  initializeSampleData(): void {
    const sampleTasks: CreateTaskInput[] = [
      { text: '프로젝트 기획서 작성' },
      { text: 'API 설계 및 문서화' },
      { text: '프론트엔드 컴포넌트 개발' },
      { text: '백엔드 API 구현' },
      { text: '데이터베이스 스키마 설계' },
    ]

    sampleTasks.forEach((input) => {
      try {
        this.create(input)
      } catch (error) {
        console.error('Failed to create sample task:', error)
      }
    })
  }
}

export default new TaskService()
