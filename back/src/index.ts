/*
 * Copilot Prompt:
 * Create the main Express server entry point with:
 * 1. Initialize Express app and configure CORS
 * 2. Mount middleware: express.json(), error handler
 * 3. Mount routes: /api/tasks
 * 4. Implement basic error handling middleware
 * 5. Start server on PORT from environment (default 3000)
 * 6. Log server startup info
 */
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { config } from '@config/env'
import tasksRouter from '@routes/tasks'
import { errorHandler } from '@middlewares/errorHandler'


const app: Express = express()

// Middleware
app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())

// Routes
app.use('/api/tasks', tasksRouter)

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', path: req.path })
})

// Error handling middleware
app.use(errorHandler)

// Start server
const PORT = config.port
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ Environment: ${config.nodeEnv}`)
  console.log(`✓ CORS enabled for: ${config.corsOrigin}`)
})

export default app
