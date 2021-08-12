import React, {useEffect, useState} from 'react'

function useLogger(value){
    useEffect(()=>{
        console.log("Change: ", value)
    }, [value])
}

function useInput(initial){
    const [value, setValue] = useState(initial)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const clear = () => setValue('')

    return ({
        bind: {value, onChange, clear},
        value,
        clear
    })
}

function Hooks(){
    //const [name, setName] = useState('')
    //const [lastName, setLastName] = useState('')

    //function nameChangeHendler(event){
    //    return setName(event.target.value)
    //}

    //function lastNameChangeHendler(event){
    //    return setLastName(event.target.value)
    //}
    const name = useInput('')
    const lastName = useInput('')

    useLogger(name.value)


    return(
        <div>   
            {/*<input type='text' value={name} onChange={nameChangeHendler}></input>*/}
            {/*<input type='text' value={lastName} onChange={lastNameChangeHendler}></input>*/}
            {/*<hr></hr>*/}
            {/*<h1>{name}</h1>*/}
            {/*<h1>{lastName}</h1>*/}
            <input type='text' /*value={input.value} onChange={input.onChange}*/ {...name.bind}></input>
            <input type='text' /*value={input.value} onChange={input.onChange}*/ {...lastName.bind}></input>
            <button onClick={() => {name.clear(); lastName.clear()}}>Clear</button>
            <hr></hr>
            <h1>{name.value}</h1>
            <h1>{lastName.value}</h1>
        </div>
    )
}

export default Hooks