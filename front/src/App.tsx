/*
 * Copilot Prompt:
 * Create the main App component for a modern Todo checklist with the following features:
 * 1. Render Header, AddTaskForm, and TaskList components
 * 2. Use Redux Toolkit for state management (tasks slice)
 * 3. Implement light/dark theme toggle
 * 4. Apply Toss-style design: glassmorphism cards, soft shadows, pastel colors
 * 5. Ensure responsive layout (mobile-first)
 * 6. Include accessibility: semantic HTML, ARIA labels
 * 7. Manage tasks state with Redux actions: addTask, toggleTask, deleteTask
 * 8. Fetch tasks from backend on mount
 */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@features/store'
import { setTasks, Task } from '@features/tasksSlice'
import Header from '@components/Header'
import AddTaskForm from '@components/AddTaskForm'
import TaskList from '@components/TaskList'
import { fetchTasks } from '@api/tasks'
import './App.css'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.items)
  const loading = useSelector((state: RootState) => state.tasks.loading)
  const error = useSelector((state: RootState) => state.tasks.error)
  const isDarkMode = useSelector((state: RootState) => state.tasks.isDarkMode)

  // Fetch tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks()
        dispatch(setTasks(data as Task[]))
      } catch (err) {
        console.error('Failed to fetch tasks:', err)
      }
    }

    loadTasks()
  }, [dispatch])

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <AddTaskForm />
          {loading ? (
            <div className="loading">작업을 불러오는 중...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <TaskList tasks={tasks} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
