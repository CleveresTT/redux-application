import { RESET, END, FRAMES, CURRENT_FRAME, CURRENT_ITEM, RESET_GAME, Item, IGamestate, ActionType, Frame } from "./types";
import {toggle} from '../Game/Game'

const initialState:IGamestate = {
    frames: [
        {id:1, items: [{id: 1, isDraggable: true, itemStyles:{}}, {id: 2, isDraggable: true, itemStyles:{}}, {id: 3, isDraggable: true, itemStyles:{}}, {id: 4, isDraggable: true, itemStyles:{}}]},
        {id:2, items: [{id: 5, isDraggable: true, itemStyles:{}}, {id: 6, isDraggable: true, itemStyles:{}}, {id: 7, isDraggable: true, itemStyles:{}}, {id: 8, isDraggable: true, itemStyles:{}}]},
        {id:3, items: [{id: 9, isDraggable: true, itemStyles:{}}, {id: 10, isDraggable: true, itemStyles:{}}, {id: 11, isDraggable: true, itemStyles:{}}, {id: 12, isDraggable: true, itemStyles:{}}]},
        {id:4, items: [{id: 13, isDraggable: true, itemStyles:{}}, {id: 14, isDraggable: true, itemStyles:{}}, {id: 15, isDraggable: true, itemStyles:{}}, {id: 16, isDraggable: true, itemStyles:{}}]}
    ],
    reset: 'none',
    currentFrame: {id: 0, items: []},
    currentItem: {id: 0, isDraggable: true, itemStyles:{}}
}

let endProgress = 0

export function gameProgressReduser(state=initialState, action: ActionType):IGamestate{
    switch(action.type){
        case CURRENT_ITEM:{
            return {...state, currentItem: action.payload}
        }
        case CURRENT_FRAME:{
            return {...state, currentFrame: action.payload}
        }
        case FRAMES:{
            const newFrames = state.frames.map((f:Frame) => {
                if(f.id === action.payload.id){
                    return action.payload
                }
                if(f.id === state.currentFrame.id){
                    return state.currentFrame
                }
                return f
            })
            return {...state, frames: newFrames}
        }
        case END:{
            if(action.payload.id===1)
                if (action.payload.items[0]?.id===1 && 
                    action.payload.items[1]?.id===8 && 
                    action.payload.items[2]?.id===11 && 
                    action.payload.items[3]?.id===14 && 
                    action.payload.items.length===4
                ){
                    action.payload.items.forEach((item: Item) =>{
                        item.isDraggable=false
                        item.itemStyles = {backgroundColor: "rgb(153, 0, 0)", border: "3px solid rgb(153, 0, 0)", cursor: "default"}
                    })
                    endProgress++
                }
            if(action.payload.id===2)
                if (action.payload.items[0]?.id===2 && 
                    action.payload.items[1]?.id===5 && 
                    action.payload.items[2]?.id===12 && 
                    action.payload.items[3]?.id===15 && 
                    action.payload.items.length===4
                ){
                    action.payload.items.forEach((item: Item) =>{
                        item.isDraggable=false
                        item.itemStyles = {backgroundColor: "rgb(218, 218, 52)", border: "3px solid rgb(218, 218, 52)", cursor: "default"}
                    })
                    endProgress++
                }
            if(action.payload.id===3)
                if (action.payload.items[0]?.id===3 && 
                    action.payload.items[1]?.id===6 && 
                    action.payload.items[2]?.id===9 && 
                    action.payload.items[3]?.id===16 && 
                    action.payload.items.length===4
                ){
                    action.payload.items.forEach((item: Item) =>{
                        item.isDraggable=false
                        item.itemStyles = {backgroundColor: "rgb(59, 59, 204)", border: "3px solid rgb(59, 59, 204)", cursor: "default"}
                    })
                    endProgress++
                }
            if(action.payload.id===4)
                if (action.payload.items[0]?.id===4 && 
                    action.payload.items[1]?.id===7 && 
                    action.payload.items[2]?.id===10 && 
                    action.payload.items[3]?.id===13 && 
                    action.payload.items.length===4
                ){
                    action.payload.items.forEach((item: Item) =>{
                        item.isDraggable=false
                        item.itemStyles = {backgroundColor: "green", border: "3px solid green", cursor: "default"}
                    })
                    endProgress++
                }
            if (endProgress===4) {
                endProgress=0
                toggle()
            }
            return state
        } 
        case RESET:{
            return {...state, reset: action.payload}
        }
        case RESET_GAME:{
            const initialFrames = [
                {id:1, items: [{id: 1, isDraggable: true, itemStyles:{}}, {id: 2, isDraggable: true, itemStyles:{}}, {id: 3, isDraggable: true, itemStyles:{}}, {id: 4, isDraggable: true, itemStyles:{}}]},
                {id:2, items: [{id: 5, isDraggable: true, itemStyles:{}}, {id: 6, isDraggable: true, itemStyles:{}}, {id: 7, isDraggable: true, itemStyles:{}}, {id: 8, isDraggable: true, itemStyles:{}}]},
                {id:3, items: [{id: 9, isDraggable: true, itemStyles:{}}, {id: 10, isDraggable: true, itemStyles:{}}, {id: 11, isDraggable: true, itemStyles:{}}, {id: 12, isDraggable: true, itemStyles:{}}]},
                {id:4, items: [{id: 13, isDraggable: true, itemStyles:{}}, {id: 14, isDraggable: true, itemStyles:{}}, {id: 15, isDraggable: true, itemStyles:{}}, {id: 16, isDraggable: true, itemStyles:{}}]}
            ]
            return {...state, frames: initialFrames, reset: 'none', currentFrame: {id: 0, items: []}, currentItem: {id: 0, isDraggable: true, itemStyles:{}}}
        }
        default: return state
    }
}