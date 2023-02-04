import { Trash } from 'phosphor-react'
import style from './Task.module.css'

interface TaskProps {
    id: number,
    content: string,
    done: boolean,
    onMarkDone: (id : number) => void,
    onDeleteTask: (id : number) => void,
    onMarkUndone: (id : number) => void
}

export function Task({id, content, done, onMarkDone, onDeleteTask, onMarkUndone} : TaskProps) {
    function handleDoneTask(){
        onMarkDone(id)
    }
    function handleDeleteTask(){
        onDeleteTask(id)
    }
    return (    
        <div className={style.task}>
            <div className={style.radioContainer}>
                <label onClick={handleDoneTask}>
                    <input type="checkbox" id="radio1" />
                    <div className={style.customRadio}>
                        <span></span>
                    </div>
                </label>
            </div>
            <div className={style.taskContent}>
                {content}
            </div>
            
            <div className={style.radioContainer}>
                <button onClick={handleDeleteTask} type="button" className={style.btnDeleteTask}>
                    <Trash size={24}/>
                </button>
            </div>
            
        </div>
    )
}
