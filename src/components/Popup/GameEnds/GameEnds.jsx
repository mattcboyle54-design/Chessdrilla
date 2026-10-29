import { createInitialGameState, Status } from "../../../constant";
import { useAppContext } from "../../../contexts/Context"
import { setupNewGame } from "../../../reducer/actions/game";

import './GameEnds.css'

const GameEnds = ({onClosePopup}) => {
    const {appState : {status}, dispatch} = useAppContext();

    if(!(status.endsWith('Wins') || status.endsWith('stalemate') || status.endsWith('material'))) {
        return null
    }

    const isWin = status.endsWith('Wins')

    const newGame = () =>{
        dispatch(setupNewGame(createInitialGameState()))
    }


    return <div className = 'popup--inner popup--inner_center '>
        <h1>{isWin ? status: 'Draw'}</h1>
        <p>{!isWin && status}</p>
        <div className = {status}/>
        <button onClick={newGame}>New Game</button>
    </div>
}

export default GameEnds


