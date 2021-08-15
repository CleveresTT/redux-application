import React, {useEffect} from 'react'
import ToDoList from './ToDoList'
import Context from '../context'
import Loader from '../Loader'
import { connect } from 'react-redux'

const AddToDo = React.lazy(() => new Promise(resolve => {setTimeout(() => {resolve(import('./AddToDo'))},0)}))

function ToDoListApp({toDoListState}) {

  const toDoListStyles = {
    display: toDoListState
  }

  const [todos, setToDos]=React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setToDos(todos)
          setLoading(false)
        }, 0)
      })
  }, [])

  function toggleToDo(id){
    setToDos(
      todos.map(todo=>{
      if (todo.id===id){
        todo.completed=!todo.completed;
      }
      return todo
    })
    )
  }

  function removeToDo(id){
    setToDos(todos.filter(todo=>todo.id!==id))
  }

  function addToDo(title){
    setToDos(todos.concat([{
      title,
      id: Date.now(),
      completed: false,
    }]))
  }

  return (
    <Context.Provider value={{removeToDo: removeToDo}}>
    <div className="wrapper" style={toDoListStyles}>
      <h1 style={{display: 'flex', justifyContent: 'center', color: 'darkred'}}>ToDo List:</h1>
      <React.Suspense fallback={<p>Loading...</p>}>
        <AddToDo onCreate={addToDo}></AddToDo>
      </React.Suspense>
      {loading && <Loader></Loader>}
      {todos.length ? <ToDoList todos={todos} OnToggle={toggleToDo}></ToDoList> : loading ? null : <p style={{display: 'flex', justifyContent: 'center', color: 'darkred', fontSize: '22px'}} >No todos</p>}
      
    </div>
    </Context.Provider>
  );
}

const mapStateToProps = state =>{
  return {
    toDoListState: state.list
  }
}

export default connect(mapStateToProps, null)(ToDoListApp);
