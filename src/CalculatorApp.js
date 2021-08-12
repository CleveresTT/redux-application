import React, {useEffect, useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { resultAction, toggleColor } from './redux/actions'

function CalculatorApp({calcState}){

    const calcStyles = {
        display: calcState
    }

    const result = useSelector(state => state.result.result)
    const colored = useSelector(state => state.result.color)
    const dispatch = useDispatch()

    function useInputValue(defaultValue=''){
        const [value, setValue] = useState(defaultValue)

        useEffect(()=>{
            try {
                dispatch(resultAction(input.value()))
                dispatch(toggleColor('lightgray'))
            } catch {
                dispatch(resultAction('error'))
            }
        }, [value])
    
        return{
            bind:{
                className: 'in',
                id: 'in',
                value,
                onChange: event => { 
                    if (event.nativeEvent.data>=0 || 
                        event.nativeEvent.data<=9 || 
                        event.nativeEvent.data==='.' || 
                        event.nativeEvent.data==='+' || 
                        event.nativeEvent.data==='*' || 
                        event.nativeEvent.data==='-' || 
                        event.nativeEvent.data==='/' || 
                        event.nativeEvent.data==='=' || 
                        event.nativeEvent.inputType==='deleteContentBackward')
                           setValue(event.target.value)
                    else {}
                }
            },
            clear: () => setValue(''),
            backspace: () => {setValue(value.substring(0, value.length - 1))},
            value: () => value,
            addChar: (char) => {setValue(value+char)},
        }
    }

    const input = useInputValue('')

    document.addEventListener('keydown', event => {
        if ((event.key).match(/Enter/)) calc(event.key);
    });

    function calc(value) {
        if(!value)
            dispatch(resultAction(''))
        if (value.match(/=|Enter/)) {
            try {
                dispatch(resultAction(input.value()))
                dispatch(toggleColor('black'))
            } catch {
                dispatch(resultAction('error'))
            }
        } else if (value === 'C') {
            input.clear();
        } else if (value.match(/CE/)) {
            input.backspace();
        } else {
            input.addChar(value);
        }
    }

    const buttonOptions = value => {
        return{
            onClick: () => calc(value),
            onMouseDown: e => e.preventDefault()
        }
    }

    return (
        <div className="calc" style={calcStyles}>
            <input {...input.bind}></input>
            <span>
                <output style={{color: colored}}>{result}</output><button {...buttonOptions('')}>Clear</button>
            </span>
            <div className="buttonsGrid">
                <button {...buttonOptions('(')}>(</button><button {...buttonOptions(')')}>)</button><button {...buttonOptions('C')}>C</button><button {...buttonOptions('CE')}>CE</button>
                <button {...buttonOptions('+')}>+</button><button {...buttonOptions('7')}>7</button><button {...buttonOptions('8')}>8</button><button {...buttonOptions('9')}>9</button>
                <button {...buttonOptions('-')}>-</button><button {...buttonOptions('4')}>4</button><button {...buttonOptions('5')}>5</button><button {...buttonOptions('6')}>6</button>
                <button {...buttonOptions('*')}>*</button><button {...buttonOptions('1')}>1</button><button {...buttonOptions('2')}>2</button><button {...buttonOptions('3')}>3</button>
                <button {...buttonOptions('/')}>/</button><button {...buttonOptions('0')}>0</button><button {...buttonOptions('.')}>.</button><button {...buttonOptions('=')}>=</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        calcState: state.calc
    }
}

export default connect(mapStateToProps, null)(CalculatorApp)