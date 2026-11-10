import { createInitialGameState, Status } from '../../../constant';
import { useAppContext } from '../../../contexts/Context'
import { setupDrillMode } from '../../../reducer/actions/drillCreation';
import { setupNewGame } from '../../../reducer/actions/game';
import './DrillEnds.css'

const FinishDrill = () => {

    const {appState : {status}, dispatch} = useAppContext();
    
    if(status!== Status.drillFinished) {
        return null
    }

    const analysisMode = () => {
        dispatch(setupNewGame(createInitialGameState()))
    }

    const drillMode = () => {
        dispatch(setupDrillMode(createInitialGameState()))
    }

    return <div className = 'popup--inner popup--inner_center '>
        <h1>{'Good job!'}</h1>

        <div className = 'buttons'>
            <button onClick={analysisMode}>Analysis Mode</button>
            <button onClick={drillMode}>Drill Mode</button>
        </div>
       
    </div>
}

export default FinishDrill