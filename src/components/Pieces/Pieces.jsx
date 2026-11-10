import './Pieces.css'
import Piece from './Piece'

import { useAppContext } from '../../contexts/Context'
import { clearCandidates, makeNewMove } from '../../reducer/actions/move'

import {useRef} from 'react'
import arbiter from '../../arbiter/arbiter'
import { openPromotion } from '../../reducer/actions/popup'
import { getCastleDirections } from '../../arbiter/getMoves'
import { detectCheckmate, detectInsufficentMaterial, detectStalemate, updateCastling } from '../../reducer/actions/game'
import { copyPosition, getNewMoveNotation } from '../../helper'
import { GameMode } from '../../constant'
import { makeNewDrillMove } from '../../reducer/actions/drillCreation'
import { makeDrillNotation } from '../../drillManager/drillManager'
import { openDrillSucess, openFailedSqaure, updateDrillSequence } from '../../reducer/actions/drill'
import drillTrainer from '../../drillManager/drillTrainer'



//Creates an 8by8 board(data structure) that represents where pieces are. Loops through all 64 positions, if a piece is assigned put Component Piece there with key,rank,file, and piece type. 
const Pieces = () => {
    const ref = useRef();

    const {appState,dispatch} = useAppContext()

    //Context access that pulls the shared game state by pulling the last board snapshot in the array
    const currentPosition = appState.position[appState.position.length-1]
    const prevPosition = appState.position[appState.position.length-2]

    //Takes the mouse position in relation to screen and figures out which chess sqaure the mouse is over. Return it in the form of x,y (rank and file) 
    const calculateCoords = e => {
        const {width,left,top} = ref.current.getBoundingClientRect()
        const size = width / 8 
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x,y}
    }
    
    const openPromotionBox = ({piece,rank,file,x,y})  => 
        dispatch(openPromotion({
            piece,
            rank : Number(rank),
            file : Number(file),
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

    
    
    const move = e => {

        //Piece movement/game orchestration 
        const {x,y} = calculateCoords(e)
        
        const [piece,rank,file] = e.dataTransfer.getData("text").split(',')
        let candidateMoves = appState.candidateMoves
        
        
        //orchestration that checks for correct drill movement 
        if(appState.gameMode === GameMode.play){
            
            const drillSequence = appState.drillSequence
            const drillPointer = appState.drillPointer
            const drillMoves = drillSequence.moves

            //Player move 
            //Correct moves 
    
            if(drillTrainer.isCorrectMove({rank,file,x,y,drillPointer,drillMoves})) {
              
                dispatch(updateDrillSequence())

                //pawn promotion(is a special case)
                if((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)){
                    const newPosition = copyPosition(appState.position[appState.position.length-1])
                    newPosition[rank][file] = ''
                    newPosition[x][y] = piece[0] + drillMoves[drillPointer].promotes
                    
                    const opponent = piece.startsWith('b') ? 'w' : 'b'
                    const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'w' : 'b'}`]

                    const newMove = getNewMoveNotation({
                        piece: piece,
                        rank,
                        file,
                        x,
                        y,
                        promotesTo : drillMoves[drillPointer].promotes,
                        position: appState.position[appState.position.length - 1],
                        newPosition,
                        opponent,
                        castleDirection,
                    })
                    
                    const newCastleHistory = updateCastleHistory({piece,rank,file,x,y})
                    dispatch(updateCastling(newCastleHistory))
                    
                    dispatch(makeNewMove({newPosition,newMove,newCastleHistory}))

                    if(drillMoves.length-1 <=drillPointer) 
                        dispatch(openDrillSucess())
                    return 
                } 


                //end of drill check 
                if(drillMoves.length-1 <=drillPointer) 
                    dispatch(openDrillSucess())
            }
            //incorrect moves 
            else if(candidateMoves.find(m => m[0] === x && m[1] === y)){
                
                dispatch(openFailedSqaure({x,y})) 
                return 
            }

            //illegal moves 
            else {
                return
            }
             

        }


        if(candidateMoves?.find(m => m[0] === x && m[1] === y)){

            const opponent = piece.startsWith('b') ? 'w' : 'b'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'w' : 'b'}`]

            //checking for promotion
           if((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)){
            openPromotionBox({piece,rank,file,x,y})
            return
           }


           const newCastleHistory = updateCastleHistory({piece,rank,file,x,y})
           dispatch(updateCastling(newCastleHistory))

            const newPosition = arbiter.performMove({
                position : currentPosition,
                piece,rank,file,
                x,y
            })

            const newMove = getNewMoveNotation({
                piece,rank,file,x,y,
                position: currentPosition, prevPosition,
                newPosition,opponent,castleDirection,
            })

            dispatch(makeNewMove({newPosition,newMove,newCastleHistory}))
            
            
            if(appState.gameMode === GameMode.play) {
                const drillSequence = appState.drillSequence
                const drillPointer = appState.drillPointer
                const drillMoves = drillSequence.moves

                if(drillMoves.length-1 <=drillPointer) 
                    dispatch(openDrillSucess())
            }

            
            //End of game scenarios 
            if(appState.gameMode === GameMode.analysis) {
                //Checking for end of game 
                if(arbiter.isStalemate(newPosition,opponent,castleDirection))
                    dispatch(detectStalemate())
            

                if(arbiter.insufficentMaterial(newPosition))
                    dispatch(detectInsufficentMaterial())
      
            
            
                if(arbiter.isCheckmate(newPosition,opponent,castleDirection))
                    dispatch(detectCheckmate(piece[0]))
            
            }

            //Saving drill movement 
            if(appState.gameMode === GameMode.drill){

                dispatch(makeNewDrillMove(makeDrillNotation({rank,file,x,y})))

            }

 
            
        }
        dispatch(clearCandidates())
    }

    //Updates the board with reducer dispatch function for the piece move based on the rank and file we got from calculatecoords. Uses the information from onDragstart to grab the original position and remove piece from array
    const onDrop = e => {
        e.preventDefault()
        
        move (e)
        
    }

    //allows piece to be dropped 
    const onDragOver = e => {
        e.preventDefault()
    }

    return <div 
        ref = {ref}
        onDrop = {onDrop}
        onDragOver = {onDragOver}
        className='pieces' 
    >
        {currentPosition.map((r,rank) =>
            r.map((f,file) => 
                currentPosition[rank][file] 
                ?   <Piece
                        key = {rank+'-'+file}
                        rank = {rank}
                        file = {file}
                        piece = {currentPosition[rank][file]}
                    />
                :   null
         ))}
    </div>
}

export default Pieces