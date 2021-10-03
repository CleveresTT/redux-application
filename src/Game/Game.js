import React, {useState} from 'react'
import { connect, useDispatch } from 'react-redux'
import { toggleModal } from '../redux/actions'

function GameApp({gameState}){
    
    const dispatch = useDispatch()

    let key=0;
    let colorFrame;
    let colorItem;

    const [b, sb] = useState([
        {id:1, items: [{id: 1, isDraggable: true, itemStyles:{}}, {id: 2, isDraggable: true, itemStyles:{}}, {id: 3, isDraggable: true, itemStyles:{}}, {id: 4, isDraggable: true, itemStyles:{}}]},
        {id:2, items: [{id: 5, isDraggable: true, itemStyles:{}}, {id: 6, isDraggable: true, itemStyles:{}}, {id: 7, isDraggable: true, itemStyles:{}}, {id: 8, isDraggable: true, itemStyles:{}}]},
        {id:3, items: [{id: 9, isDraggable: true, itemStyles:{}}, {id: 10, isDraggable: true, itemStyles:{}}, {id: 11, isDraggable: true, itemStyles:{}}, {id: 12, isDraggable: true, itemStyles:{}}]},
        {id:4, items: [{id: 13, isDraggable: true, itemStyles:{}}, {id: 14, isDraggable: true, itemStyles:{}}, {id: 15, isDraggable: true, itemStyles:{}}, {id: 16, isDraggable: true, itemStyles:{}}]}
    ])

    const [currentFrame, setCurrentFrame] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const [gameEndState, setGameEndState] = useState(0)
    const [resetState, setResetState] = useState('none')

    const resetGame = () => {
        sb([
            {id:1, items: [{id: 1, isDraggable: true, itemStyles:{}}, {id: 2, isDraggable: true, itemStyles:{}}, {id: 3, isDraggable: true, itemStyles:{}}, {id: 4, isDraggable: true, itemStyles:{}}]},
            {id:2, items: [{id: 5, isDraggable: true, itemStyles:{}}, {id: 6, isDraggable: true, itemStyles:{}}, {id: 7, isDraggable: true, itemStyles:{}}, {id: 8, isDraggable: true, itemStyles:{}}]},
            {id:3, items: [{id: 9, isDraggable: true, itemStyles:{}}, {id: 10, isDraggable: true, itemStyles:{}}, {id: 11, isDraggable: true, itemStyles:{}}, {id: 12, isDraggable: true, itemStyles:{}}]},
            {id:4, items: [{id: 13, isDraggable: true, itemStyles:{}}, {id: 14, isDraggable: true, itemStyles:{}}, {id: 15, isDraggable: true, itemStyles:{}}, {id: 16, isDraggable: true, itemStyles:{}}]}
        ])
        setGameEndState(0)
        setResetState('none')
    }

    const ending = () => {
        dispatch(toggleModal({modalStateAttr:"flex", content: 'Успех!'}))
        setTimeout(()=>{
            setResetState('block')
            dispatch(toggleModal({modalStateAttr:"none", content: ''}))
        },1000)
    }

    const setUnDraggable = (frame) => {
        frame.items.forEach(item =>{
            item.isDraggable=false
        })
        if (frame.id===1){
            frame.items.forEach(item =>{
                item.itemStyles = {backgroundColor: "rgb(153, 0, 0)", border: "3px solid rgb(153, 0, 0)", cursor: "default"} //"background-color: rgb(201, 0, 0); border: 3px solid rgb(201, 0, 0);"
            })
        }
        if (frame.id===2){
            frame.items.forEach(item =>{
                item.itemStyles = {backgroundColor: "rgb(218, 218, 52)", border: "3px solid rgb(218, 218, 52)", cursor: "default"} //"background-color: rgb(201, 0, 0); border: 3px solid rgb(201, 0, 0);"
            })
        }
        if (frame.id===3){
            frame.items.forEach(item =>{
                item.itemStyles = {backgroundColor: "rgb(59, 59, 204)", border: "3px solid rgb(59, 59, 204)", cursor: "default"} //"background-color: rgb(201, 0, 0); border: 3px solid rgb(201, 0, 0);"
            })
        }
        if (frame.id===4){
            frame.items.forEach(item =>{
                item.itemStyles = {backgroundColor: "green", border: "3px solid green", cursor: "default"} //"background-color: rgb(201, 0, 0); border: 3px solid rgb(201, 0, 0);"
            })
        }
        setGameEndState(gameEndState+1)
        console.log(gameEndState)
        if (gameEndState===3) ending()
    }

    const dropHandlerReRender = (e, frame) => {
        if (frame.id===1 && 
            frame.items[0]?.id===1 && 
            frame.items[1]?.id===8 && 
            frame.items[2]?.id===11 && 
            frame.items[3]?.id===14 && 
            frame.items.length===4
        ) setUnDraggable(frame)

        if (frame.id===2 && 
            frame.items[0]?.id===2 && 
            frame.items[1]?.id===5 && 
            frame.items[2]?.id===12 && 
            frame.items[3]?.id===15 && 
            frame.items.length===4
        ) setUnDraggable(frame)

        if (frame.id===3 && 
            frame.items[0]?.id===3 && 
            frame.items[1]?.id===6 && 
            frame.items[2]?.id===9 && 
            frame.items[3]?.id===16 && 
            frame.items.length===4
        ) setUnDraggable(frame)

        if (frame.id===4 && 
            frame.items[0]?.id===4 && 
            frame.items[1]?.id===7 && 
            frame.items[2]?.id===10 && 
            frame.items[3]?.id===13 && 
            frame.items.length===4
        ) setUnDraggable(frame)

        sb(b.map(f => {
            if(f.id === frame.id){
                return frame
            }
            if(f.id === currentFrame.id){
                return currentFrame
            }
            return f
        }))

        e.target.style.boxShadow = "none"
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className==="redItem" || e.target.className==="yellowItem" || e.target.className==="blueItem" || e.target.className==="greenItem"){
            e.target.style.boxShadow = "0 4px 3px black"
        }
    }

    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = "none"
    }

    const dragStartHandler = (e, frame, item) => {
        setCurrentFrame(frame)
        setCurrentItem(item)
    }
    
    const dragEndHandler = (e) => {
        e.target.style.boxShadow = "none"
    }

    const dropItemHandler = (e, frame, item) => {
        e.stopPropagation()
        if (frame.items.length === 6){
            e.target.style.boxShadow = "none"
            return
        } 
        const currentIndex = currentFrame.items.indexOf(currentItem)
        const dropIndex = frame.items.indexOf(item)

        if(currentFrame===frame){
            const temp= frame.items[dropIndex]
            frame.items[dropIndex] = frame.items[currentIndex]
            frame.items[currentIndex] = temp
        }
        else{
            currentFrame.items.splice(currentIndex, 1)
            frame.items.splice(dropIndex + 1, 0, currentItem)
        }
        dropHandlerReRender(e, frame)
    }

    const dropFrameHandler = (e, frame) => {
        if (frame.items.length === 6){
            e.target.style.boxShadow = "none"
            return
        } 
        frame.items.push(currentItem)
        const currentIndex = currentFrame.items.indexOf(currentItem)
        currentFrame.items.splice(currentIndex, 1)
        dropHandlerReRender(e, frame)
    }

    return(
        <div className="wrapper" style={{display: gameState}}>
            <button className="resetButton" style={{display: resetState}} onClick={()=>resetGame()}>Начать заново</button>
            <div className="game">
                {b.map(frame => {
                    if(frame.id===1) colorFrame="redFrame"
                    if(frame.id===2) colorFrame="yellowFrame"
                    if(frame.id===3) colorFrame="blueFrame"
                    if(frame.id===4) colorFrame="greenFrame"
                    return(
                    <div className={colorFrame} 
                        key={key++}
                        onDragOver={e => dragOverHandler(e)}
                        onDrop={e => dropFrameHandler(e, frame)}
                    >
                        {frame.items.map(item=>{
                            if(item.id===1 || item.id===8 || item.id===11 || item.id===14) colorItem="redItem"
                            if(item.id===2 || item.id===5 || item.id===12 || item.id===15) colorItem="yellowItem"
                            if(item.id===3 || item.id===6 || item.id===9 || item.id===16) colorItem="blueItem"
                            if(item.id===4 || item.id===7 || item.id===10 || item.id===13) colorItem="greenItem"
                            return(
                            <div className={colorItem} 
                                key={key++} 
                                style={item.itemStyles}
                                draggable={item.isDraggable}
                                onDragOver={e => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragStart={e => dragStartHandler(e, frame, item)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDrop={e => dropItemHandler(e, frame, item)}
                            >
                                {item.id}
                            </div>)
                        })}
                    </div>)
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        gameState: state.game
    }
}

export default connect(mapStateToProps, null)(GameApp)