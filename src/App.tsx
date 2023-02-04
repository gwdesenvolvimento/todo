import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import styles from './App.module.css'

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <main>
          <TaskList />
        </main>
      </div>
    </div>
  )
}

export default App
