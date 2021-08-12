import React from 'react'
import { connect } from 'react-redux'
import './Modal.css'

function Modal({modalState}){

    return(
        <div className='modal' style={{display: modalState.modalStateAttr}}>
            <div className='modal-body' >
                <h1 >{modalState.content}</h1>
                <div className='animation'></div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        modalState: state.modal
    }
}

export default connect(mapStateToProps, null)(Modal)