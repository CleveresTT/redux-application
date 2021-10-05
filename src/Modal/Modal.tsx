import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../redux/rootReduser'
import { IModalState } from '../redux/types'
import './Modal.css'

const Modal:React.FC<{modalState?:IModalState}> = ({modalState}) => {

    return(
        <div className='modal' style={{display: modalState?.modalStateAttr}}>
            <div className='modal-body' >
                <h1 >{modalState?.content}</h1>
                <div className='animation'></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) =>{
    return{
        modalState: state.modal
    }
}

export default connect(mapStateToProps, null)(Modal)