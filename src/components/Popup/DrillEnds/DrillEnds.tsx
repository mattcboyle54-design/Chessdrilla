import { createInitialGameState, Status } from '../../../constant';
import { useAppContext } from '../../../contexts/Context'
import { playDrill, setupDrillMode } from '../../../reducer/actions/drillCreation';
import { House, RotateCcw, SkipForward } from "lucide-react";
import './DrillEnds.css'
import { setupNextDrill } from '../../../reducer/actions/drill';


const FinishDrill = () => {

    const {appState, dispatch} = useAppContext();
    
    if(appState.status!== Status.drillFinished) {
        return null
    }

    const drillMode = () => {
        dispatch(setupDrillMode(createInitialGameState()))
    }

    const nextDrill = () => {
        const drillSequence = appState.drillSequence
        dispatch(setupNextDrill(createInitialGameState()))
    }

    const replayDrill = () => {
        const drillSequence = appState.drillSequence
        dispatch(playDrill(createInitialGameState(),drillSequence))
    }

    const allDrillPointer = appState.drillPointer[0]
    const isDrillSequenceEmpty = allDrillPointer >= appState.drillSequence.length-1

    return <div className = 'popup--inner popup--inner_center '>
        <h1>{'Good job!'}</h1>

        <div className = 'buttons--drill'>
            <button onClick={drillMode}>
                <House size ={24}/>
            </button>
       
            <button onClick={replayDrill}>
                <RotateCcw size = {24}/>
            </button> 

            {!isDrillSequenceEmpty && (
            <button onClick={nextDrill}>
                <SkipForward size = {24}/>
            </button>
            )}


        </div>
       
    </div>
}

export default FinishDrill