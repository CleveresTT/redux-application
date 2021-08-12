import React, {useState} from 'react'
import PropTypes from 'prop-types'

function useInputValue(defaultValue=''){
    const [value, setValue]=useState(defaultValue)

    return{
        bind:{
            className: 'inp',
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddToDo({onCreate}){
    const input = useInputValue('')
    
    function submitHandler(event){
        event.preventDefault();

        if (input.value().trim()){
            onCreate(input.value())
            input.clear()
        }
    }

    return(
        <form className='f' onSubmit={submitHandler}>
            <input {...input.bind}></input>
            <button className='but' type="submit">Add Todo</button>
        </form>
    )
}

AddToDo.propTypes={
    onCreate: PropTypes.func.isRequired
}

export default AddToDo