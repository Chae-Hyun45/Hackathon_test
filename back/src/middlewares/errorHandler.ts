/*
 * Copilot Prompt:
 * Create centralized error handling middleware:
 * 1. Accept error, request, response, and next parameters
 * 2. Log errors with timestamp and context
 * 3. Return consistent error response format
 * 4. Handle different error types: validation, not found, server errors
 * 5. Don't expose internal error details in production
 */

import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  status?: number
  details?: unknown
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.status || 500
  const message = error.message || 'Internal Server Error'

  // Log error details
  console.error(`[ERROR] ${new Date().toISOString()} - Status: ${status}`)
  console.error(`[ERROR] Message: ${message}`)
  console.error(`[ERROR] Path: ${req.method} ${req.path}`)

  // Handle specific error messages
  let clientMessage = message
  if (message.includes('Task not found')) {
    res.status(404).json({ error: 'Task not found' })
    return
  }

  if (message.includes('required') || message.includes('must be') || message.includes('cannot')) {
    res.status(400).json({ error: message })
    return
  }

  // Generic error response
  res.status(status).json({
    error: clientMessage,
    path: req.path,
    timestamp: new Date().toISOString(),
  })
}
