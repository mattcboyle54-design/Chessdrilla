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
                id: string
                moves: ReturnDrillMoves[]
                name: string
            }
            

            const drillSequence = drills.filter((drill: ReturnDrillObject) => {
                return selectedDrill.includes(drill.id)
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