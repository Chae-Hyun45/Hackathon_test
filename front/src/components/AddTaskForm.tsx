/*
 * Copilot Prompt:
 * Create an AddTaskForm component with the following:
 * 1. Input field for new task text
 * 2. Submit button to create task
 * 3. Integrate with Redux: dispatch createTaskAsync on submit
 * 4. Handle loading state and errors
 * 5. Clear input field after successful submission
 * 6. Validate input (non-empty, reasonable length)
 * 7. Apply Toss-style design: smooth input field, rounded corners
 * 8. Support keyboard shortcuts: Enter to submit
 * 9. Add ARIA labels and keyboard accessibility
 */

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@features/store'
import { createTaskAsync } from '@features/tasksSlice'
import styles from './AddTaskForm.module.css'

export default function AddTaskForm() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.tasks)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) {
      alert('작업 내용을 입력해주세요.')
      return
    }

    if (input.length > 100) {
      alert('작업은 100자 이하여야 합니다.')
      return
    }

    try {
      await dispatch(createTaskAsync(input.trim())).unwrap()
      setInput('')
    } catch (err) {
      console.error('Failed to create task:', err)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="새로운 작업을 입력하세요..."
          aria-label="새로운 작업 입력"
          className={styles.input}
          maxLength={100}
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading || !input.trim()}
          aria-label="작업 추가"
        >
          {loading ? '추가 중...' : '추가'}
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.charCount}>{input.length}/100</div>
    </form>
  )
}
