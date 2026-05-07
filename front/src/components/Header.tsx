/*
 * Copilot Prompt:
 * Create a Header component with the following features:
 * 1. Display app title "Todo Checklist"
 * 2. Show completed/total task count
 * 3. Include a dark mode toggle button
 * 4. Apply Toss-style design: clean layout, subtle gradient background
 * 5. Ensure mobile-responsive design
 * 6. Add accessibility: proper heading levels, ARIA labels
 */

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@features/store'
import { toggleDarkMode } from '@features/tasksSlice'
import styles from './Header.module.css'

export default function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.items)
  const isDarkMode = useSelector((state: RootState) => state.tasks.isDarkMode)

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>✓ Todo Checklist</h1>
          <p className={styles.subtitle}>
            {completedCount} / {totalCount} 완료됨
          </p>
        </div>
        <button
          className={styles.themeToggle}
          onClick={handleThemeToggle}
          aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
