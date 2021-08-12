import React from 'react'
import ToDoListApp from './ToDoListApp'
import CalculatorApp from './CalculatorApp'
import Modal from './Modal/Modal'
import { toggleCalc, toggleModal, toggleToDo } from './redux/actions'
import { connect } from 'react-redux'

class App extends React.Component {

    toggleCalculator = () => {
        if(this.props.toDoListState === 'block')
            this.props.toggleToDo('none')
        if(this.props.calculatorState==='none'){
            this.props.toggleModal({modalStateAttr:"flex", content: 'Включен калькулятор'})
            setTimeout(()=>{
                this.props.toggleCalc('block')
                this.props.toggleModal({modalStateAttr:"none", content: ''})
            },1000)
            return
        }
        else
            return this.props.toggleCalc('none')
    }

    toggleToDoList = () => {
        if(this.props.calculatorState === 'block')
            this.props.toggleCalc('none')
        if(this.props.toDoListState==='none'){
            this.props.toggleModal({modalStateAttr:"flex", content: 'Включен список дел'})
            setTimeout(()=>{
                this.props.toggleToDo('block')
                this.props.toggleModal({modalStateAttr:"none", content: ''})
            },1000)
            return
        }
        else
            return this.props.toggleToDo('none')
    }

    render(){

    return (
        <div>
            <Modal />
            <div className='appButtons'>
                <button className='calcAppButton' 
                    onClick={
                        this.toggleCalculator
                    }>Калькулятор</button>
                <button className='toDoListAppButton' 
                    onClick={
                        this.toggleToDoList
                    }>Список дел</button></div>
            <hr></hr>
            <CalculatorApp />
            <ToDoListApp  />
        </div>
    )
    }
}

const mapStateToProps = state =>{
    return {
        calculatorState: state.calc,
        toDoListState: state.list,
        modalState: state.modal
    }
}

const mapDispatchToProps = {
    toggleCalc,
    toggleToDo,
    toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(App)