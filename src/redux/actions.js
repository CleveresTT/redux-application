import { CALC, TODO_LIST, GAME, MODAL, RESULT, COLOR } from "./types";

export function toggleCalc(newState){
    return{
        type: CALC,
        payload: newState
    }
}

export function toggleToDo(newState){
    return{
        type: TODO_LIST,
        payload: newState
    }
}

export function toggleGame(newState){
    return{
        type: GAME,
        payload: newState
    }
}

export function toggleModal(newState){
    return{
        type: MODAL,
        payload: newState
    }
}

export function resultAction(inputState){
    return{
        type: RESULT,
        payload: inputState
    }
}

export function toggleColor(color){
    return{
        type: COLOR,
        payload: color
    }
}