import { GameMode } from "../../../../constant"
import { useAppContext } from "../../../../contexts/Context"
import { takeBack } from "../../../../reducer/actions/move"

const TakeBack = () => {
    const {appState: {gameMode},dispatch} = useAppContext()
    
    if(gameMode === GameMode.play) return null
    
    return <div>
        <button onClick={()=> dispatch(takeBack())}>Take Back</button>
    </div>
}

export default TakeBack