/*
 * Copilot Prompt:
 * Create a Redux Toolkit slice for tasks management with the following:
 * 1. State structure: { items: Task[], loading: boolean, error: string | null, isDarkMode: boolean }
 * 2. Reducers: addTask, toggleTask, deleteTask, setTasks, toggleDarkMode, setError
 * 3. Extra reducers for async thunks: fetchTasksAsync, createTaskAsync, toggleTaskAsync, deleteTaskAsync
 * 4. Handle loading and error states properly
 * 5. Ensure immutable state updates using Redux Toolkit
 */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTasks, createTask, toggleTask, deleteTask, Task } from '@api/tasks'

export type { Task };

export interface TasksState {
  items: Task[]
  loading: boolean
  error: string | null
  isDarkMode: boolean
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
  isDarkMode: localStorage.getItem('darkMode') === 'true',
}

// Async thunks
export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {
  return await fetchTasks()
})

export const createTaskAsync = createAsyncThunk(
  'tasks/createTask',
  async (text: string) => {
    return await createTask(text)
  }
)

export const toggleTaskAsync = createAsyncThunk('tasks/toggleTask', async (id: string) => {
  return await toggleTask(id)
})

export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await deleteTask(id)
  return id
})

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('darkMode', state.isDarkMode.toString())
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    // Fetch tasks
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch tasks'
      })

    // Create task
    builder
      .addCase(createTaskAsync.pending, (state) => {
        state.error = null
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create task'
      })

    // Toggle task
    builder
      .addCase(toggleTaskAsync.pending, (state) => {
        state.error = null
      })
      .addCase(toggleTaskAsync.fulfilled, (state, action) => {
        const task = state.items.find((t) => t.id === action.payload.id)
        if (task) {
          task.completed = action.payload.completed
          task.updatedAt = action.payload.updatedAt
        }
      })
      .addCase(toggleTaskAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to toggle task'
      })

    // Delete task
    builder
      .addCase(deleteTaskAsync.pending, (state) => {
        state.error = null
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload)
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete task'
      })
  },
})

export const { toggleDarkMode, setTasks, setError } = tasksSlice.actions
export default tasksSlice.reducer
