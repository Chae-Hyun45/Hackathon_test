/*
 * Copilot Prompt:
 * Create environment configuration module:
 * 1. Load variables from .env file using dotenv
 * 2. Provide typed configuration object
 * 3. Set sensible defaults for development
 * 4. Export config for use throughout app
 */

import dotenv from 'dotenv'

dotenv.config()

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}

export default config
