import { ClipboardText } from 'phosphor-react'
import style from './TaskList.module.css'

export function TaskListEmpty() {
    return (
        <div className={style.contentList}>
            <ClipboardText size={56} />

            <div className={style.dontHaveTasks}>
                <span>Você ainda não tem tarefas cadastradas</span><br/>
                <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
        </div>
    )
}

