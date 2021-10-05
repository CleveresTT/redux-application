import { CALC, TODO_LIST, GAME, MODAL, RESULT, COLOR,
     RESET, END, FRAMES, CURRENT_FRAME, CURRENT_ITEM, 
     RESET_GAME, Frame, Item, FrameActionType, 
     ItemActionType, ResetAction, ResetGameAction, CalcActionType, 
     IModalState, showActionType, showModalAction } from "./types";

export function toggleCalc(newState:string): showActionType{
    return{
        type: CALC,
        payload: newState
    }
}

export function toggleToDo(newState:string): showActionType{
    return{
        type: TODO_LIST,
        payload: newState
    }
}

export function toggleGame(newState:string): showActionType{
    return{
        type: GAME,
        payload: newState
    }
}

export function toggleModal(newState:IModalState): showModalAction{
    return{
        type: MODAL,
        payload: newState
    }
}

export function resultAction(inputState:string):CalcActionType{
    return{
        type: RESULT,
        payload: inputState
    }
}

export function toggleColor(color:string):CalcActionType{
    return{
        type: COLOR,
        payload: color
    }
}

export function toggleResetGame(): ResetGameAction{
    return{
        type: RESET_GAME
    }
}

export function toggleEnd(frame: Frame): FrameActionType{
    return{
        type: END,
        payload: frame
    }
}

export function toggleFrames(frame: Frame): FrameActionType{
    return{
        type: FRAMES,
        payload: frame
    }
}

export function toggleCurrentFrame(frame: Frame): FrameActionType{
    return{
        type: CURRENT_FRAME,
        payload: frame
    }
}

export function toggleCurrentItem(item: Item): ItemActionType{
    return{
        type: CURRENT_ITEM,
        payload: item
    }
}

export function toggleReset(display: string): ResetAction{
    return{
        type: RESET,
        payload: display
    }
}