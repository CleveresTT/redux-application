import React from 'react'
import ToDoListApp from './Todo/ToDoListApp'
import CalculatorApp from './Calculator/CalculatorApp'
import Modal from './Modal/Modal'
import GameApp from './Game/Game'
import { toggleCalc, toggleModal, toggleGame, toggleToDo } from './redux/actions'
import { connect } from 'react-redux'
import { RootState } from './redux/rootReduser'
import { IModalState, showActionType, showModalAction } from './redux/types'

interface AppProps{
    calculatorState: string,
    toDoListState: string,
    gameState: string,
    modalState: IModalState,
    toggleCalc(newState:string): showActionType,
    toggleToDo(newState:string): showActionType,
    toggleGame(newState:string): showActionType,
    toggleModal(newState:IModalState): showModalAction
}

class App extends React.Component<AppProps,{}> {

    toggleCalculator = () => {
        if(this.props.toDoListState === 'block' || this.props.gameState === "flex"){
            this.props.toggleToDo('none')
            this.props.toggleGame('none')
        }
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
        if(this.props.calculatorState === 'block' || this.props.gameState === "flex"){
            this.props.toggleCalc('none')
            this.props.toggleGame('none')
        }
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

    toggleGame = () => {
        if(this.props.calculatorState === 'block' || this.props.toDoListState === 'block'){
            this.props.toggleCalc('none')
            this.props.toggleToDo('none')
        }
        if(this.props.gameState==='none'){
            this.props.toggleModal({modalStateAttr:"flex", content: 'Включена игра'})
            setTimeout(()=>{
                this.props.toggleGame('flex')
                this.props.toggleModal({modalStateAttr:"none", content: ''})
            },1000)
            return
        }
        else
            return this.props.toggleGame('none')
    }

    render(){

    return (
        <div>
            <Modal />
            <div className='appButtons'>
                <button className='calcAppButton' 
                    onClick={
                        this.toggleCalculator
                    }>Калькулятор
                </button>
                <button className='toDoListAppButton' 
                    onClick={
                        this.toggleToDoList
                    }>Список дел
                </button>
                <button className='gameAppButton' 
                    onClick={
                        this.toggleGame
                    }>Игра
                </button>
            </div>
            <hr/>
            <CalculatorApp />
            <ToDoListApp  />
            <GameApp  />
        </div>
    )
    }
}

const mapStateToProps = (state: RootState) =>{
    return {
        calculatorState: state.calc,
        toDoListState: state.list,
        gameState: state.game,
        modalState: state.modal,
    }
}

const mapDispatchToProps = {
    toggleCalc,
    toggleToDo,
    toggleGame,
    toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)