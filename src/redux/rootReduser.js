import { combineReducers } from "redux"
import { calculatorReduser } from "./calcReduser"
import { CALC, MODAL, TODO_LIST } from "./types"

function calcReduser(state='none', action){
    switch(action.type){
        case CALC:{
            state = action.payload
            return state
        }
        default: return state
    }
}

function listReduser(state='none', action){
    switch(action.type){
        case TODO_LIST:{
            state = action.payload
            return state
        }
        default: return state
    }
}

function modalReduser(state={ modalStateAttr: 'none', content: '' }, action){
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
    modal: modalReduser,
    result: calculatorReduser
})