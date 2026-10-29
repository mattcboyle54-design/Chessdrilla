import { createInitialGameState, Status } from '../../../constant';
import { useAppContext } from '../../../contexts/Context';
import { setupDrillMode } from '../../../reducer/actions/drill';
import { setupNewGame } from '../../../reducer/actions/game';
import './StartMenu.css'

const StartMenu = () => {

    const {appState : {gameMode}, dispatch} = useAppContext();
    
    if(gameMode !== 'Start') {
        return null
    }

    const analysisMode = () => {
        dispatch(setupNewGame(createInitialGameState()))
    }

    const drillMode = () => {
        dispatch(setupDrillMode())
    }

    return <div className = 'popup--inner popup--inner_center '>
        <h1>{'Please Select a Mode'}</h1>

        <div className = 'buttons'>
            <button onClick={analysisMode}>Analysis Mode</button>
            <button onClick={drillMode}>Drill Mode</button>
        </div>
       
    </div>
}

export default StartMenu