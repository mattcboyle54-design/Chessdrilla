import './Pieces.css'
import Piece from './Piece'
import {useRef} from 'react'
import useChessMoves from '../../hooks/useChessMoves'
import { useAppContext } from '../../contexts/Context'
import { useEffect } from 'react'
import { GameMode } from '../../constant'


//Handles rendering of chess pieces 
const Pieces = () => {
    const ref = useRef();

    const {appState} = useAppContext()
    const {attemptMove} = useChessMoves()
    const currentPosition = appState.position[appState.position.length-1]

    //Takes the mouse position in relation to screen and figures out which chess sqaure the mouse is over. Return it in the form of x,y (rank and file) 
    const calculateCoords = e => {
        const {width,left,top} = ref.current.getBoundingClientRect()
        const size = width / 8 
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x,y}
    }
    


    const move = e => {

        const {x,y} = calculateCoords(e)
        
        const [piece,rawRank,rawFile] = e.dataTransfer.getData("text").split(',')
        
        const rank = Number(rawRank)
        const file = Number(rawFile)


        attemptMove({x,y,piece,rank,file})        
    }
 

    const onDrop = e => {
        e.preventDefault()
        
        move (e)
        
    }

    
    useEffect(() => {
        if(appState.gameMode !== GameMode.play) return 

        const currentDrillPointer = appState.drillPointer[1]
        const allDrillPointer = appState.drillPointer[0]
        const drillSequence = appState.drillSequence
        const drillMoves = drillSequence[allDrillPointer].moves[currentDrillPointer] 

        const drillOpponent = drillSequence[allDrillPointer].id.startsWith('w')? 'b': 'w'

        if(!drillMoves)return 
        if(appState.turn === drillOpponent) {

            setTimeout(() => {
                attemptMove({
                    piece: currentPosition[drillMoves.from[0]][drillMoves.from[1]],
                    rank: drillMoves.from[0],
                    file: drillMoves.from[1],
                    x: drillMoves.to[0],
                    y: drillMoves.to[1],
                    promotesTo: drillMoves.promotes
                })
            }, 400)


        }
    }, [appState.turn, appState.gameMode])
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