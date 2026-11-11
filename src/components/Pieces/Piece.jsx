import arbiter from "../../arbiter/arbiter";
import { GameMode } from "../../constant";
import { useAppContext } from "../../contexts/Context"
import { closeFailedSqaure, updateDrillSequence } from "../../reducer/actions/drill";
import { generateCandidateMoves } from "../../reducer/actions/move";

const Piece = ({
    rank,
    file,
    piece,
}) => {

    const {appState,dispatch} = useAppContext()
    const {turn, castleDirection, position : currentPosition} = appState

    const canDrag = appState.gameMode === GameMode.play? piece.startsWith(appState.drillSequence.id[0]): true 

    //Handles piece dragging and calls arbiter to handle legal piece moves 
    const onDragStart = e=> {
    
     const rect = e.currentTarget.getBoundingClientRect();

    console.log({
        tag: e.currentTarget.tagName,
        width: rect.width,
        height: rect.height
    }); 
        if(appState.failedSqaure)                
            dispatch(closeFailedSqaure())
              
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain',`${piece},${rank},${file}`)
        setTimeout(() => {
            e.target.style.display = 'none'
        })
        
        if(turn === piece[0]) {
            const candidateMoves = 
                arbiter.getValidMoves({
                    position : currentPosition[currentPosition.length-1],
                    prevPosition : currentPosition[currentPosition.length-2],
                    castleDirection : castleDirection[turn],
                    piece,
                    rank,
                    file
                })
            dispatch(generateCandidateMoves({candidateMoves}))
        }
        
    }
    //prevents target.style.display so piece will stay on original tile when illegal move is made 
    const onDragEnd = e=> e.target.style.display = 'block'

    return (
        <div 
            className= {`piece ${piece} p-${file}${rank}`}
            draggable={canDrag}
            onDragEnd = {onDragEnd}
            onDragStart={onDragStart}
            />
        )

}

export default Piece 