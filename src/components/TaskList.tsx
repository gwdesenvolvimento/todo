import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Task } from './Task'
import style from './TaskList.module.css'
import { TaskListEmpty } from './TaskListEmpty'

interface TaskItem {
    id: number,
    content: string,
    done: boolean,
}
export function TaskList () {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('')
    const [tasksDone, setTasksDone] = useState(0)  

    function handleDoneClick (id : number) {
        const newList = tasks.map((item : TaskItem) => {
            if ( item.id === id) {
                return {
                    ...item,
                    done : !item?.done
                }
            }
            return item
        });
        setTasks(newList)
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
                        {tasks.filter(item => item.done).length}
                    </div>
                </div>
            </header>

            {tasks.length > 0 ? 
                tasks.map((task : TaskItem) => {
                    return (
                        <Task 
                            key={task.id} 
                            id={task.id} 
                            content={task.content} 
                            done={task.done}
                            onMarkDone={handleDoneClick}
                            onDeleteTask={deleteTask}
                        />        
                    )
                }) : 
                <TaskListEmpty />
            }

        </div>
    )
}