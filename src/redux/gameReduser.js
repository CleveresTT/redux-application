import {  } from "./types";

export function calculatorReduser(state={result:'',color:'black'}, action){
    switch(action.type){
        case RESULT:{
            if(!action.payload)
                return {...state, result:''}
            if(action.payload==='error')
                return {...state, result:'error'}
            return {...state, result: Compute(action.payload)}
        }
        case COLOR:{
            return {...state, color: action.payload}
        }
        default: return state
    }
}