import arbiter from "../arbiter/arbiter"
import { getCastleDirections } from "../arbiter/getMoves"
import { GameMode } from "../constant"
import { useAppContext } from "../contexts/Context"
import { makeDrillNotation } from "../drillManager/drillManager"
import drillTrainer from "../drillManager/drillTrainer"
import { getNewMoveNotation } from "../helper"
import { openDrillSucess, openFailedSqaure, updateDrillSequence } from "../reducer/actions/drill"
import { makeNewDrillMove } from "../reducer/actions/drillCreation"
import { detectCheckmate, detectInsufficentMaterial, detectStalemate, updateCastling } from "../reducer/actions/game"
import { clearCandidates, makeNewMove } from "../reducer/actions/move"
import { openPromotion } from "../reducer/actions/popup"


//Hook designed to handle application logic 
const useChessMoves = () => {

    const {appState,dispatch} = useAppContext()
    const currentPosition = appState.position[appState.position.length-1]
    const prevPosition = appState.position[appState.position.length-2]


    const candidateMove = (x,y) => {
        return appState.candidateMoves?.some(
            m => m[0] === x && m[1] === y
        )
    }
    const openPromotionBox = ({piece,rank,file,x,y})  => 
        dispatch(openPromotion({
            piece,
            rank : rank,
            file : file,
            x,
            y,
        }))
            
    const updateCastleHistory = ({piece,rank,file,x,y}) =>{
        const castleDirection = getCastleDirections({
            castleDirection : appState.castleDirection,
            piece,rank,file,
            x,y,
        })
        if(castleDirection) {
            return castleDirection
        }
        else {
            return
        }
    }


    const attemptMove = ({piece,rank,file,x,y}) => {
        
        if(appState.gameMode === GameMode.analysis 
            || appState.gameMode === GameMode.drill) {
            //Checking for valid move before sending to execute move 
            //Pawn Promotion is special case that gets validated in Pieces.js and executed in PromotionBox.js
            if(candidateMove(x,y)){
                if((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
                    openPromotionBox({piece,rank,file,x,y})
                    return
                }
                executeMove({piece,rank,file,x,y})
            }
        }

        else if(appState.gameMode === GameMode.play) {
            const drillSequence = appState.drillSequence
            const drillPointer = appState.drillPointer
            const drillMoves = drillSequence.moves


            //Check for correct move, end of drill adn failed moves 
            if(drillTrainer.isCorrectMove({rank,file,x,y,drillPointer,drillMoves})) {

                dispatch(updateDrillSequence())
                executeMove({
                        piece,
                        rank,
                        file,
                        x,
                        y,
                        promotesTo: drillMoves[drillPointer].promotes,})
          
                

                if(drillMoves.length-1 <=drillPointer) 
                    dispatch(openDrillSucess())
                else {

                }
            }

            else if(candidateMove(x,y)) {
                dispatch(openFailedSqaure({x,y}))
            }
            
            else return 
        }



    }



    const executeMove = ({piece,rank,file,x,y,promotesTo}) => {

        const opponent = piece.startsWith('w')? 'b': 'w'
        const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'w' : 'b'}`]


        //Updating board position 
        const newCastleHistory = updateCastleHistory({piece,rank,file,x,y})
        dispatch(updateCastling(newCastleHistory))


        const newPosition = arbiter.performMove({
            position : currentPosition,
            piece,rank,file,
            x,y,promotesTo
        })



        const newMove = getNewMoveNotation({
            piece,promotesTo,rank,file,x,y,
            position: currentPosition, prevPosition,
            newPosition,opponent,castleDirection,
        })

        dispatch(makeNewMove({newPosition,newMove,newCastleHistory}))


        //Saving moves for drill
        if(appState.gameMode === GameMode.drill) {
            dispatch(makeNewDrillMove(makeDrillNotation({rank,file,x,y,promotesTo})))
        }

        //End of game scenarios for Analysis mode 
        if(appState.gameMode === GameMode.analysis) {
               
            if(arbiter.isStalemate(newPosition,opponent,castleDirection))
                dispatch(detectStalemate())
            

            if(arbiter.insufficentMaterial(newPosition))
                dispatch(detectInsufficentMaterial())
    
            
            if(arbiter.isCheckmate(newPosition,opponent,castleDirection))
                dispatch(detectCheckmate(piece[0]))
            
        }

        dispatch(clearCandidates())
    }



     return{attemptMove,executeMove}
    
}

export default useChessMoves