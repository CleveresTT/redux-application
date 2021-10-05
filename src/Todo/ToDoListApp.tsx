import React, {useState, useEffect} from 'react'
import ToDoList from './ToDoList'
import Loader from '../Loader'
import { connect } from 'react-redux'
import { RootState } from '../redux/rootReduser'
import { IToDoItem } from './ToDoTypes'
import Context from '../context'

const AddToDo = React.lazy(() => import('./AddToDo'))

const ToDoListApp:React.FC<{toDoListState?: string}> = ({toDoListState}) => {

  const toDoListStyles = {
    display: toDoListState
  }

  const [todos, setToDos]=useState<Array<IToDoItem>>([])
  const [loading, setLoading] = useState<boolean>(true)

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

  function toggleToDo(id: number):void{
    setToDos(
      todos.map((todo: IToDoItem)=>{
      if (todo.id===id){
        todo.completed=!todo.completed;
      }
      return todo
    })
    )
  }

  function removeToDo(id: number):void{
    setToDos(todos.filter((todo: IToDoItem)=>todo.id!==id))
  }

  function addToDo(title: string):void{
    setToDos(todos.concat([{
      title,
      id: Date.now(),
      completed: false,
    }]))
  }

  return (
    <Context.Provider value={removeToDo}>
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

const mapStateToProps = (state: RootState) =>{
  return {
    toDoListState: state.list
  }
}

export default connect(mapStateToProps, null)(ToDoListApp);
