import arbiter from '../../../arbiter/arbiter'
import { getCastleDirections } from '../../../arbiter/getMoves'
import { useAppContext } from '../../../contexts/Context'
import { makeDrillNotation } from '../../../drillManager/drillManager'
import { copyPosition, getNewMoveNotation } from '../../../helper'
import { makeNewDrillMove } from '../../../reducer/actions/drill'
import { detectCheckmate, detectInsufficentMaterial, detectStalemate, updateCastling } from '../../../reducer/actions/game'
import { clearCandidates, makeNewMove } from '../../../reducer/actions/move'
import './PromotionBox.css'

const PromotionBox = ({onClosePopup}) => {
    
    const options = ['q','r','b','n']

    const {appState,dispatch} = useAppContext()
    const {promotionSquare,turn,gameMode} = appState

    if(!promotionSquare)  {
        return null
    }
    const color = promotionSquare.x === 7 ? 'w' : 'b'


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
    const getPromotionBoxPosition = () => {
        const style = {}

        if(promotionSquare.x===7) 
            style.top = '-12.5%'
        else
            style.top = '97.5%'


        if(promotionSquare.y <= 1) 
            style.left = '0%'
        else if(promotionSquare.y >= 6)
            style.right = '0%'
        else  
            style.left = `${12.5 * promotionSquare.y - 20}%`
    
        return style

    
    }

    const onClick = option => {
        onClosePopup()
        
        const newPosition = copyPosition(appState.position[appState.position.length-1])

        newPosition[promotionSquare.rank][promotionSquare.file] = ''
        newPosition[promotionSquare.x][promotionSquare.y] = color + option
        dispatch(clearCandidates())


        const castleDirection = appState.castleDirection[`${turn === 'b' ? 'w' : 'b'}`]
        const opponent = turn === 'w'? 'b': 'w'
        
        const newCastleHistory = updateCastleHistory({piece : promotionSquare.piece, x: promotionSquare.x, y: promotionSquare.y})
        dispatch(updateCastling(newCastleHistory))
        const newMove = getNewMoveNotation({
            ...promotionSquare,
            piece: color + 'p',
            promotesTo : option,
            position: appState.position[appState.position.length - 1],
            newPosition,
            opponent,
            castleDirection,
        })
        if(gameMode === 'DrillMode'){
            dispatch(makeNewDrillMove(makeDrillNotation({
                rank: promotionSquare.rank,
                file: promotionSquare.file,
                x: promotionSquare.x, 
                y:promotionSquare.y,
                promotesTo:option,
            })))
        }

        dispatch(makeNewMove({newPosition,newMove,newCastleHistory}))
         

        if(arbiter.isCheckmate(newPosition,opponent,castleDirection)){
            dispatch(detectCheckmate(turn))
        }

        else if(arbiter.isStalemate(newPosition,opponent,castleDirection)){
                dispatch(detectStalemate())
            }
            
        else if(arbiter.insufficentMaterial(newPosition)){
            dispatch(detectInsufficentMaterial())
            } else if (arbiter.isStalemate(newPosition,opponent,castleDirection)){
                dispatch(detectStalemate()) 
            }
       
    }




    return <div className = 'popup-inner promotion-choices' style = {getPromotionBoxPosition()}>
        {options.map(option => 
        <div key = {option} 
            className = {`piece ${color}${option}`}
            onClick = {() => onClick(option)}>
            </div>
        )
    }
    </div>
}

export default PromotionBox