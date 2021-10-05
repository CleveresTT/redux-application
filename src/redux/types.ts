export const CALC:string = 'TOGGLE_CALC'
export const TODO_LIST:string = "TOGGLE_TODO_LIST"
export const GAME:string = "TOGGLE_GAME"
export const MODAL:string = "TOGGLE_MODAL"

export const RESULT:string = "RESULT"
export const COLOR:string = "COLOR"

export const FRAMES:string = 'FRAMES'
export const CURRENT_FRAME:string = "CURRENT_FRAME"
export const CURRENT_ITEM:string = "CURRENT_ITEM"
export const END:string = "END"
export const RESET:string = "RESET"
export const RESET_GAME:string = "RESET_GAME"

//////////////////////////////////////////////

export interface IModalState{
    modalStateAttr: string,
    content: string
}

//////////////////////////////////////////////

export interface ICalcState{
    result: string | number,
    color: string
}

//////////////////////////////////////////////

export interface IGamestate{
    frames: ArrayOfFrames, 
    reset: string, 
    currentFrame: Frame, 
    currentItem: Item
}

export interface Item{
    id: number,
    isDraggable: boolean,
    itemStyles: {
        backgroundColor?: string,
        border?: string,
        cursor?: string
    }
}
export type Frame = {id:number, items:Array<Item>}
export type ArrayOfFrames = Array<Frame>

///////////////////////////////////////////////

interface showCalcAction{
    type: typeof CALC,
    payload: string
}

interface showToDoAction{
    type: typeof TODO_LIST,
    payload: string
}

interface showGameAction{
    type: typeof GAME,
    payload: string
}

export interface showModalAction{
    type: typeof MODAL,
    payload: IModalState
}

export type showActionType = showCalcAction | showGameAction | showToDoAction

///////////////////////////////////////////////

interface ResultAction{
    type: typeof RESULT,
    payload: string
}

interface ColorAction{
    type: typeof COLOR,
    payload: string
}

export type CalcActionType = ResultAction | ColorAction

///////////////////////////////////////////////

export interface ResetGameAction{
    type: typeof RESET_GAME,
    payload?: any
}

interface EndAction{
    type: typeof END,
    payload: Frame
}

interface FramesAction{
    type: typeof FRAMES,
    payload: Frame
}

interface CurrentFrameAction{
    type: typeof CURRENT_FRAME,
    payload: Frame
}

interface CurrentItemAction{
    type: typeof CURRENT_ITEM,
    payload: Item
}

export interface ResetAction{
    type: typeof RESET,
    payload: string
}

export type FrameActionType = EndAction | CurrentFrameAction | FramesAction
export type ItemActionType = CurrentItemAction
export type ActionType = FrameActionType | CurrentItemAction | ResetGameAction | ResetAction