import { createInitialGameState, GameMode } from "../../../../constant"
import { useAppContext } from "../../../../contexts/Context"
import { playDrill } from "../../../../reducer/actions/drillCreation"


const PlayDrill = () => {
    const {appState: {selectedDrill,gameMode,drills},dispatch} = useAppContext()

    if(gameMode!== GameMode.drill) return null

    const handleClick = () => {
        if(selectedDrill) {
            type ReturnDrillMoves = {
                from: [number,number]
                to: [number,number]
                promotes?: string 
            }
            type ReturnDrillObject = {
                id: number
                moves: ReturnDrillMoves[]
                name: string
            }
            
            const drillSequence = drills.find((drill: ReturnDrillObject) => {
                return drill.id === selectedDrill
            })
            dispatch(playDrill(createInitialGameState(),drillSequence))
        }
        return 
    }
    return <div>
        <button onClick={handleClick}>Play Drill</button>
    </div>
}

export default PlayDrill