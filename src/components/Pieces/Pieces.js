import './Pieces.css'
import Piece from './Piece'
import {createPosition,copyPosition} from '../../helper'
import {useState,useRef} from 'react'


//Creates an 8by8 board(data structure) that represents where pieces are. Loops through all 64 positions, if a piece is assigned put Component Piece there with key,rank,file, and piece type. 
const Pieces = () => {
    const ref = useRef();
    const [state,setState] = useState(createPosition())
    const calculateCoords = e => {
        const {width,left,top} = ref.current.getBoundingClientRect()
        const size = width / 8 
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x,y}
    }

    const onDrop = e => {
        const newPosition = copyPosition(state)
        const{x,y} = calculateCoords(e)

        const [p,rank,file] = e.dataTransfer.getData('text').split(',')

        newPosition[rank][file] = ''
        newPosition[x][y] = p
        
        setState(newPosition)

    }

    const onDragOver = e => {
        e.dataTransfer.dropEffect = 'move' 
        e.preventDefault()
    }

    return <div 
        ref = {ref}
        onDrop = {onDrop}
        onDragOver = {onDragOver}
        className='pieces' 
    >
        {state.map((r,rank) =>
            r.map((f,file) => 
                state[rank][file] 
                ?   <Piece
                        key = {rank+'-'+file}
                        rank = {rank}
                        file = {file}
                        piece = {state[rank][file]}
                    />
                :   null
         ))}
    </div>
}
export default Pieces