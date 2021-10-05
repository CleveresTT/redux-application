import React from 'react'
import ToDoItem from './ToDoItem';
import { IToDoItem } from './ToDoTypes';

const styles={
    ul:{
      listStyle: 'none', //list-style
      margin: 0,
      padding: 0
    }
  }

const ToDoList:React.FC<{todos:Array<IToDoItem>, OnToggle:(id:number)=>void}> = ({todos, OnToggle}) =>{
    return(
        <ul style={styles.ul}>
            { todos.map( (todo, index )=> {
                return <ToDoItem todo={todo} key={todo.id} index={index} onChange={OnToggle}></ToDoItem>
            }) }
        </ul>
    );
}

export default ToDoList