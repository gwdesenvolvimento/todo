import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Task } from './Task'
import style from './TaskList.module.css'
import { TaskListEmpty } from './TaskListEmpty'

export function TaskList () {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('')
    const [tasksDone, setTasksDone] = useState(0)
    useEffect(() => {
    },[tasks])

    function handleDoneClick (id) {
        const updatedTodos = tasks.map(todo => 
            todo.id === id ? {...todo, done: true} : todo
        );
        setTasks(updatedTodos);
    }

    function handleDoneClickFalse (id) {
        const updatedTodos = tasks.map(todo => 
            todo.id === id ? {...todo, done: false} : todo
        );
        setTasks(updatedTodos);
    }

    function handleCreateNewTask(event : FormEvent) {
        event.preventDefault()
        
        let newTask = {
            id: tasks.length + 1,
            content: task,
            done: false
        }
        setTasks([...tasks, newTask])

        setTask('') 
    }

    function handleNewTask(event : ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setTask(event.target.value)
    }

    function deleteTask(id : number) {
        const tasksWithoutDeletedOne = tasks.filter(item => {
            return item.id != id
        }) 
 
        setTasks(tasksWithoutDeletedOne)
    }

    return (
        <div>

            <form onSubmit={handleCreateNewTask} className={style.newTaskForm}>
                <input 
                    type="text" 
                    placeholder='Adicione uma nova tarefa' 
                    className={style.formInput}
                    value={task}
                    required
                    onChange={handleNewTask}
                />
                <button type='submit'>
                    Criar <PlusCircle size={32} />
                </button>
            </form>

            <header className={style.header}>  
                <div className={style.counterSpaces}>
                    <span className={style.createdTasksText}>Tarefas criadas</span>
                    <div className={style.counter}>
                        {tasks.length}
                    </div>
                </div>

                <div className={style.counterSpaces}>
                    <span className={style.doneTasksText}>Concluídas</span>
                    <div className={style.counter}>
                        {tasksDone}
                    </div>
                </div>
            </header>

            {tasks.length > 0 ? 
                tasks.map(task => {
                    return (
                        <Task 
                            key={task.id} 
                            id={task.id} 
                            content={task.content} 
                            done={task.done}
                            onMarkDone={handleDoneClick}
                            onMarkUndone={handleDoneClickFalse}
                            onDeleteTask={deleteTask}
                        />        
                    )
                }) : 
                <TaskListEmpty />
            }

        </div>
    )
}