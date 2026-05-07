/*
 * Copilot Prompt:
 * Create Express routes for task CRUD operations:
 * 1. GET / -> getAllTasks
 * 2. GET /:id -> getTaskById
 * 3. POST / -> createTask
 * 4. PATCH /:id -> updateTask (toggle completion by default)
 * 5. DELETE /:id -> deleteTask
 * Add basic input validation and error responses
 */

import { Router, Request, Response, NextFunction } from 'express'
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '@controllers/tasksController'

const router = Router()

// Validation middleware for task ID format
const validateTaskId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params
  // Simple UUID validation (adjust regex if needed)
  if (id && !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    res.status(400).json({ error: 'Invalid task ID format' })
    return
  }
  next()
}

// Routes
router.get('/', getAllTasks)
router.get('/:id', validateTaskId, getTaskById)
router.post('/', createTask)
router.patch('/:id', validateTaskId, updateTask)
router.delete('/:id', validateTaskId, deleteTask)

export default router
