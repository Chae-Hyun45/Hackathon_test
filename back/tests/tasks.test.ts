/*
 * Copilot Prompt:
 * Create basic API test cases using vitest:
 * 1. Test task creation with valid and invalid inputs
 * 2. Test fetching all tasks and specific task by ID
 * 3. Test task update (toggle completion)
 * 4. Test task deletion
 * 5. Test error handling (404, 400, 500)
 * 6. Test data persistence across operations
 */

import { describe, it, expect, beforeEach } from 'vitest'
import taskService from '../services/taskService'

describe('TaskService', () => {
  beforeEach(() => {
    // Clear all tasks before each test
    const allTasks = taskService.readAll()
    allTasks.forEach((task) => {
      taskService.delete(task.id)
    })
  })

  describe('create', () => {
    it('should create a new task with valid input', () => {
      const task = taskService.create({ text: 'Test task' })
      expect(task).toBeDefined()
      expect(task.text).toBe('Test task')
      expect(task.completed).toBe(false)
      expect(task.id).toBeDefined()
    })

    it('should throw error for empty text', () => {
      expect(() => {
        taskService.create({ text: '' })
      }).toThrow()
    })

    it('should throw error for text exceeding max length', () => {
      const longText = 'a'.repeat(101)
      expect(() => {
        taskService.create({ text: longText })
      }).toThrow()
    })
  })

  describe('readAll', () => {
    it('should return empty array initially', () => {
      const tasks = taskService.readAll()
      expect(tasks).toEqual([])
    })

    it('should return all created tasks', () => {
      taskService.create({ text: 'Task 1' })
      taskService.create({ text: 'Task 2' })
      const tasks = taskService.readAll()
      expect(tasks).toHaveLength(2)
    })
  })

  describe('update', () => {
    it('should toggle task completion', () => {
      const task = taskService.create({ text: 'Test task' })
      const updated = taskService.update(task.id, { completed: true })
      expect(updated.completed).toBe(true)
    })

    it('should update task text', () => {
      const task = taskService.create({ text: 'Old text' })
      const updated = taskService.update(task.id, { text: 'New text' })
      expect(updated.text).toBe('New text')
    })

    it('should throw error for non-existent task', () => {
      expect(() => {
        taskService.update('non-existent-id', { text: 'New text' })
      }).toThrow()
    })
  })

  describe('delete', () => {
    it('should delete a task', () => {
      const task = taskService.create({ text: 'Task to delete' })
      taskService.delete(task.id)
      expect(() => taskService.read(task.id)).toThrow()
    })

    it('should throw error when deleting non-existent task', () => {
      expect(() => {
        taskService.delete('non-existent-id')
      }).toThrow()
    })
  })
})
