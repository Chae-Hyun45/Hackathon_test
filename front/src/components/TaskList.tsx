/*
 * Copilot Prompt:
 * Create a TaskList component that:
 * 1. Renders a list of Task items
 * 2. Accepts tasks array and passes to TaskItem components
 * 3. Show empty state message when no tasks
 * 4. Implement filtering options (All, Active, Completed)
 * 5. Apply Toss-style design: card-based layout with shadows
 * 6. Ensure proper spacing and responsive grid
 * 7. Use semantic HTML: <ul>, <li>
 * 8. Include ARIA roles for accessibility
 */

import { useState } from 'react'
import { Task } from '@api/tasks'
import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

type FilterType = 'all' | 'active' | 'completed'

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className={styles.container}>
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          전체 ({tasks.length})
        </button>
        <button
          className={`${styles.filterBtn} ${filter === 'active' ? styles.active : ''}`}
          onClick={() => setFilter('active')}
        >
          진행 중 ({tasks.filter((t) => !t.completed).length})
        </button>
        <button
          className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
        >
          완료 ({tasks.filter((t) => t.completed).length})
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            {filter === 'all'
              ? '작업이 없습니다. 새로운 작업을 추가해보세요!'
              : filter === 'active'
                ? '진행 중인 작업이 없습니다!'
                : '완료된 작업이 없습니다!'}
          </p>
        </div>
      ) : (
        <ul className={styles.list} role="list">
          {filteredTasks.map((task) => (
            <li key={task.id} role="listitem">
              <TaskItem task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
