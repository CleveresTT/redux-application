import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import Context from '../context'

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

function ToDoItem({todo, index, onChange}){
    const {removeToDo}=useContext(Context)
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

ToDoItem.propTypes={
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    OnChange: PropTypes.func.isRequired,
}

export default ToDoItem