import { GameMode } from "../../../constant"
import { useAppContext } from "../../../contexts/Context"
import { openSaveDrillInput } from "../../../reducer/actions/drill"

const SaveDrill = () => {

    const {appState: {gameMode}, dispatch} = useAppContext()

    if(gameMode === GameMode.drill) {
        return <div>
            <button onClick={() => dispatch(openSaveDrillInput())}>Save Drill</button>
        </div>
    }
    
    else return null



}

export default SaveDrill
