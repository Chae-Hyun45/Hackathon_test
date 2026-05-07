/*
 * Copilot Prompt:
 * Create a TaskItem component for individual task display with:
 * 1. Display task text and completion status
 * 2. Checkbox to toggle completion (optimistic update)
 * 3. Delete button with confirmation
 * 4. Show created/updated date in tooltip or small text
 * 5. Apply Toss-style glassmorphism card design
 * 6. Support hover effects and smooth transitions
 * 7. Add strikethrough text for completed tasks
 * 8. Ensure keyboard accessibility: Tab navigation, Space/Enter to toggle
 * 9. Include ARIA live region for status updates
 */

import { useDispatch } from 'react-redux'
import { AppDispatch } from '@features/store'
import { toggleTaskAsync, deleteTaskAsync } from '@features/tasksSlice'
import { Task } from '@api/tasks'
import styles from './TaskItem.module.css'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleToggle = async () => {
    try {
      await dispatch(toggleTaskAsync(task.id)).unwrap()
    } catch (err) {
      console.error('Failed to toggle task:', err)
    }
  }

  const handleDelete = async () => {
    if (confirm('정말로 이 작업을 삭제하시겠습니까?')) {
      try {
        await dispatch(deleteTaskAsync(task.id)).unwrap()
      } catch (err) {
        console.error('Failed to delete task:', err)
      }
    }
  }

  const createdDate = new Date(task.createdAt).toLocaleDateString('ko-KR')

  return (
    <div className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className={styles.checkbox}
          aria-label={`작업 완료: ${task.text}`}
        />
        <div className={styles.textContainer}>
          <p className={styles.text}>{task.text}</p>
          <span className={styles.date} title={`생성됨: ${createdDate}`}>
            {createdDate}
          </span>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className={styles.deleteBtn}
        aria-label={`삭제: ${task.text}`}
        title="작업 삭제"
      >
        ✕
      </button>
    </div>
  )
}
