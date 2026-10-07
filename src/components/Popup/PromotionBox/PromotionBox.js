import { useAppContext } from '../../../contexts/Context'
import { copyPosition } from '../../../helper'
import { clearCandidates, makeNewMove } from '../../../reducer/actions/move'
import './PromotionBox.css'

const PromotionBox = ({onClosePopup}) => {
    const options = ['q','r','b','n']

    const {appState,dispatch} = useAppContext()
    const {promotionSqaure} = appState

    if(!promotionSqaure) 
        return null

    const color = promotionSqaure.x === 7 ? 'w' : 'b'

    const getPromotionBoxPosition = () => {
        const style = {}

        if(promotionSqaure.x===7) 
            style.top = '-12.5%'
        else
            style.top = '97.5%'


        if(promotionSqaure.y <= 1) 
            style.left = '0%'
        else if(promotionSqaure.y >= 6)
            style.right = '0%'
        else  
            style.left = `${12.5 * promotionSqaure.y - 20}%`
    
        return style
    }

    const onClick = option => {
        onClosePopup()

        const newPosition = copyPosition(appState.position[appState.position.length-1])

        newPosition[promotionSqaure.rank][promotionSqaure.file] = ''
        newPosition[promotionSqaure.x][promotionSqaure.y] = color + option

        dispatch(clearCandidates())
        dispatch(makeNewMove({newPosition}))
        

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