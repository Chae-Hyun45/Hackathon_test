/*
 * Copilot Prompt:
 * Create REST API controllers for task operations:
 * 1. getAll: GET /tasks - Return all tasks
 * 2. getById: GET /tasks/:id - Return specific task
 * 3. create: POST /tasks - Create new task with validation
 * 4. update: PATCH /tasks/:id - Toggle completion or update text
 * 5. delete: DELETE /tasks/:id - Delete task with confirmation
 * Use try-catch for error handling and pass to error middleware
 */

import { Request, Response, NextFunction } from 'express'
import taskService from '@services/taskService'
import { CreateTaskInput, UpdateTaskInput } from '@models/task'

export const getAllTasks = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const tasks = taskService.readAll()
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

export const getTaskById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params
    const task = taskService.read(id)
    res.json(task)
  } catch (error) {
    next(error)
  }
}

export const createTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const input: CreateTaskInput = req.body

    if (!input.text) {
      res.status(400).json({ error: 'Text is required' })
      return
    }

    const task = taskService.create(input)
    res.status(201).json(task)
  } catch (error) {
    next(error)
  }
}

export const updateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params
    const input: UpdateTaskInput = req.body

    // If no body, toggle completion (common use case)
    if (Object.keys(input).length === 0) {
      const currentTask = taskService.read(id)
      const task = taskService.update(id, { completed: !currentTask.completed })
      res.json(task)
      return
    }

    const task = taskService.update(id, input)
    res.json(task)
  } catch (error) {
    next(error)
  }
}

export const deleteTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params
    taskService.delete(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
