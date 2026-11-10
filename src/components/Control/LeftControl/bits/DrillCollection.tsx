import { useAppContext } from "../../../../contexts/Context"
import './DrillCollection.css'
import type { ReturnDrillObject } from "../../../../drillManager/drillManager"
import { getDrillId } from "../../../../reducer/actions/drillCreation"

const DrillCollection = () => {

    const {appState,dispatch} = useAppContext()
    const drills: ReturnDrillObject[] = appState.drills

    if(!drills) return null

    return <div className = "drill-list">
        {
            
            drills.map((drill)=> {
                return (
                    <button 
                        onClick={() => dispatch(getDrillId(drill.id))} 
                        className = {appState.selectedDrill === drill.id ? "selected" : ""}
                        key = {drill.id}
                    >
                        {drill.name}
                    </button>)
            })
        }

    </div>
}

export default DrillCollection