import arbiter from "../../arbiter/arbiter";
import { GameMode } from "../../constant";
import { useAppContext } from "../../contexts/Context"
import { updateDrillSequence } from "../../reducer/actions/drill";
import { generateCandidateMoves } from "../../reducer/actions/move";

const Piece = ({
    rank,
    file,
    piece,
}) => {

    const {appState,dispatch} = useAppContext()
    const {turn, castleDirection, position : currentPosition,drillSequence} = appState

    //give information on the piece specifically piece type ie: bk, rank, and file (so you know which piece is moved and from what original spot). Removes the original piece's png with a delay so you can see piece while dragging
    const onDragStart = e=> {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain',`${piece},${rank},${file}`)
        setTimeout(() => {
            e.target.style.display = 'none'
        })
        
        //Probably will want to refactor this 
        if(appState.gameMode === GameMode.play) {
            if(drillSequence.length <= 0) return
            const drillRank = Number(drillSequence[0].from[0])
            const drillFile = Number(drillSequence[0].from[1])
           if(turn === piece[0]) {
                if(rank === drillRank && file === drillFile) {
                    const candidateMoves = [[drillSequence[0].to[0],drillSequence[0].to[1]]]
                    dispatch(updateDrillSequence())
                    dispatch(generateCandidateMoves({candidateMoves}))
                }
                    
           }

        }


        else if(turn === piece[0]) {
            const candidateMoves = 
                arbiter.getValidMoves({
                    position : currentPosition[currentPosition.length-1],
                    prevPosition : currentPosition[currentPosition.length-2],
                    castleDirection : castleDirection[turn],
                    piece,
                    rank,
                    file
                })
                console.log(candidateMoves)
            dispatch(generateCandidateMoves({candidateMoves}))
        }
        
    }
    //prevents target.style.display so piece will stay on original tile when illegal move is made 
    const onDragEnd = e=> e.target.style.display = 'block'

    return (
        <div 
            className= {`piece ${piece} p-${file}${rank}`}
            draggable={true}
            onDragEnd = {onDragEnd}
            onDragStart={onDragStart}
            />
        )

}

export default Piece 