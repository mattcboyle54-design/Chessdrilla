import './Pieces.css'
import Piece from './Piece'

import {copyPosition} from '../../helper'

import { useAppContext } from '../../contexts/Context'
import { clearCandidates, makeNewMove } from '../../reducer/actions/move'

import {useRef} from 'react'


//Creates an 8by8 board(data structure) that represents where pieces are. Loops through all 64 positions, if a piece is assigned put Component Piece there with key,rank,file, and piece type. 
const Pieces = () => {
    const ref = useRef();

    const {appState,dispatch} = useAppContext()

    //Context access that pulls the shared game state by pulling the last board snapshot in the array
    const currentPosition = appState.position[appState.position.length-1]

    //Takes the mouse position in relation to screen and figures out which chess sqaure the mouse is over. Return it in the form of x,y (rank and file) 
    const calculateCoords = e => {
        const {width,left,top} = ref.current.getBoundingClientRect()
        const size = width / 8 
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x,y}
    }
    //Updates the board with reducer dispatch function for the piece move based on the rank and file we got from calculatecoords. Uses the information from onDragstart to grab the original position and remove piece from array
    const onDrop = e => {
        const newPosition = copyPosition(currentPosition)
        const{x,y} = calculateCoords(e)

        const [p,rank,file] = e.dataTransfer.getData('text').split(',')

         if(appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
            newPosition[rank][file] = ''
            newPosition[x][y] = p
            dispatch(makeNewMove({newPosition}))
        }

        dispatch(clearCandidates())
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