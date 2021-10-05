import React from 'react'

function Loader(){
    return (
    <div style={{display: 'flex', justifyContent: 'center', margin: '0.5rem'}}>
        <div className="lds-hourglass"></div>
    </div>)
}

export default Loader

//export default () => (<div style={{display: 'flex', justifyContent: 'center', margin: '0.5rem'}}><div className="lds-hourglass"></div></div>)