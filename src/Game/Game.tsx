import React, { SyntheticEvent } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { toggleCurrentFrame, toggleCurrentItem, toggleEnd, toggleFrames, toggleModal, toggleReset, toggleResetGame } from '../redux/actions'
import { RootState } from '../redux/rootReduser'
import { Frame, Item } from '../redux/types'

let end=false

export const toggle = () => {
    end=true
}

const GameApp:React.FC<{gameState?: string}> = ({gameState}) => {
    const dispatch = useDispatch()
    const resetState = useSelector((state: RootState) => state.gameProgress.reset)
    const currentItem = useSelector((state: RootState) => state.gameProgress.currentItem)
    const currentFrame = useSelector((state: RootState) => state.gameProgress.currentFrame)
    const frames = useSelector((state: RootState) => state.gameProgress.frames)

    let key: number = 0;
    let colorFrame: string;
    let colorItem: string;

    const dropHandlerReRender = (e: SyntheticEvent, frame: Frame) => {
        dispatch(toggleEnd(frame))
        if (end===true){
            dispatch(toggleModal({modalStateAttr:"flex", content: 'Успех!'}))
            end=false
            setTimeout(()=>{
                dispatch(toggleReset('block'))
                dispatch(toggleModal({modalStateAttr:"none", content: ''}))
            },1000)
        }
        dispatch(toggleFrames(frame));
        (e.target as HTMLElement).style.boxShadow = "none"
    }

    const dragOverHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        if ((e.target as HTMLElement).className==="redItem" || (e.target as HTMLElement).className==="yellowItem" || (e.target as HTMLElement).className==="blueItem" || (e.target as HTMLElement).className==="greenItem"){
            (e.target as HTMLElement).style.boxShadow = "0 4px 3px black"
        }
    }

    const dragLeaveHandler = (e: SyntheticEvent) => {
        (e.target as HTMLElement).style.boxShadow = "none"
    }

    const dragStartHandler = (e: SyntheticEvent, frame: Frame, item: Item) => {
        dispatch(toggleCurrentFrame(frame))
        dispatch(toggleCurrentItem(item))
    }
    
    const dragEndHandler = (e: SyntheticEvent) => {
        (e.target as HTMLElement).style.boxShadow = "none"
    }

    const dropItemHandler = (e: SyntheticEvent, frame: Frame, item: Item) => {
        e.stopPropagation()
        if (frame.items.length === 6){
            (e.target as HTMLElement).style.boxShadow = "none"
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

    const dropFrameHandler = (e: React.SyntheticEvent, frame: Frame) => {
        if (frame.items.length === 6){
            (e.target as HTMLElement).style.boxShadow = "none"
            return
        } 
        frame.items.push(currentItem)
        const currentIndex = currentFrame.items.indexOf(currentItem)
        currentFrame.items.splice(currentIndex, 1)
        dropHandlerReRender(e, frame)
    }

    return(
        <div className="wrapper" style={{display: gameState}}>
            <button className="resetButton" style={{display: resetState}} onClick={()=>dispatch(toggleResetGame())}>Начать заново</button>
            <div className="game">
                {frames.map(frame => {
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

const mapStateToProps = (state: RootState) => {
    return{
        gameState: state.game
    }
}

export default connect(mapStateToProps, null)(GameApp)