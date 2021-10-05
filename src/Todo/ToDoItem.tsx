import React, {useContext} from 'react'
import Context from '../context'
import { IToDoItem } from './ToDoTypes'

const styles={
    li:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        border: '2px solid darkred',
        borderRadius: '2px',
        marginBottom: '0.5rem'
    }
}

const ToDoItem:React.FC<{todo:IToDoItem, index:number, onChange: (id:number)=>void}> = ({todo, index, onChange}) => {
    const removeToDo=useContext<(id:number)=>void>(Context)
    const classes=['container']

    if(todo.completed){
        classes.push('done')
    }

    return <li style={styles.li}>
        <label className={classes.join(' ')}>
            <input type="checkbox" onChange={()=>{onChange(todo.id)}} checked={todo.completed}></input>
            <span></span>
            <strong>{index+1}. </strong>
            {todo.title}
        </label>
        <button className="rm" onClick={/*()=>removeToDo(todo.id)*/ removeToDo.bind(null, todo.id)}>&times;</button>
    </li>
}

export default ToDoItem