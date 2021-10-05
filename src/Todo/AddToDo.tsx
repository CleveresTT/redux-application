import React, {FormEvent, useState} from 'react'
import PropTypes from 'prop-types'

function useInputValue(defaultValue=''){
    const [value, setValue]=useState<string>(defaultValue)

    return{
        bind:{
            className: 'inp',
            value,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

const AddToDo:React.FC<{onCreate:(title:string)=>void}> = ({onCreate}) => {
    const input = useInputValue('')
    
    function submitHandler(event: FormEvent){
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