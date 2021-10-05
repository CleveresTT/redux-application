import { combineReducers } from "redux"
import { calculatorReduser } from "./calcReduser"
import { gameProgressReduser } from "./gameReduser"
import { CALC, MODAL, GAME, TODO_LIST, showActionType, showModalAction, IModalState } from "./types"

function calcReduser(state='none', action: showActionType): string{
    switch(action.type){
        case CALC:{
            state = action.payload
            return state
        }
        default: return state
    }
}

function listReduser(state='none', action: showActionType): string{
    switch(action.type){
        case TODO_LIST:{
            state = action.payload
            return state
        }
        default: return state
    }
}

function gameReduser(state='none', action: showActionType): string{
    switch(action.type){
        case GAME:{
            state = action.payload
            return state
        }
        default: return state
    }
}

function modalReduser(state={ modalStateAttr: 'none', content: '' }, action: showModalAction): IModalState{
    switch(action.type){
        case MODAL:{
            state = action.payload
            return state
        }
        default: return state
    }
}

export const rootReduser = combineReducers({
    calc: calcReduser,
    list: listReduser,
    game: gameReduser,
    modal: modalReduser,
    result: calculatorReduser,
    gameProgress: gameProgressReduser
})

export type RootState = ReturnType<typeof rootReduser> 