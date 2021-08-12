import React, {useState, useEffect, useRef, useMemo, useCallback, useContext} from 'react'
//import { useToggleAlert } from './Alert/AlertContext'
import { useAlert } from './Alert/AlertContext'

function Main(){
    //const toggle = useToggleAlert()
    const {showAlert} = useAlert()

    return(
        <div>  
            <h1>Context</h1>
            <button onClick={() => showAlert('Main.js')}>Показать alert</button>
        </div>
    )
}

export default Main