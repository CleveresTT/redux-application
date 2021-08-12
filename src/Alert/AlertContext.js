import React, {useContext, useReducer} from 'react'

const AlertContext = React.createContext()
//const AlertToggleContext = React.createContext()

export const useAlert = () => {
    return useContext(AlertContext)
}

//export const useToggleAlert = () => {
//    return useContext(AlertToggleContext)
//}

const reducer = (state, action) => {
    switch(action.type){
        case 'show': return {...state, visible: true, text: action.text} 
        case 'hide': return {...state, visible: false} 
        default: return state
    }
}

export const AlertProvider = ({children}) =>{
    ////const [alert, setAlert] = useState(false)
    ////const toggle = () => {setAlert(prev => !prev)}
    const [state, dispatch] = useReducer(reducer, {
        visible: false,
        text: ''
    })

    const showAlert = text => dispatch({type: 'show', text})
    const hideAlert = () => dispatch({type: 'hide'})


    return(
        <AlertContext.Provider value={{
            visible: state.visible,
            text: state.text,
            showAlert,
            hideAlert
        }}>
            {/*<AlertToggleContext.Provider value={toggle}>*/}
        {children}
            {/*</AlertToggleContext.Provider>*/}
        </AlertContext.Provider>
    )
}