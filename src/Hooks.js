import React from 'react'
import Alert from './Alert/Alert'
import Main from './Main'
import { AlertProvider } from './Alert/AlertContext'


//export const AlertContext = React.createContext()

function Hooks(){
    //const [alert, setAlert] = useState(false)

    //const toggleAlert = () => {setAlert(prev => !prev)}

    return(
        <AlertProvider>
            <div>  
                <Alert></Alert>
                <Main toggle={()=>{}}></Main>
            </div>
        </AlertProvider>
    )
}

export default Hooks