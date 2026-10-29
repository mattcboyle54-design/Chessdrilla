import { Status } from "../../../constant"
import { useAppContext } from "../../../contexts/Context"
import { useRef } from 'react'
import { createDrillObj } from "../../../drillManager/drillManager"
import { closeSavedDrillInput, getSavedDrill } from "../../../reducer/actions/drill"

const MakeDrill = () => {

    const {appState: {status,drillMoves,drills},dispatch} = useAppContext()
    
    if(status !== Status.saving) return null

    const nameDrillRef = useRef<HTMLInputElement>(null)

    const saveDrill = () => {
    
        if(!nameDrillRef.current?.value) return;

        const namedDrill = nameDrillRef.current?.value
        dispatch(getSavedDrill(createDrillObj({drillLength: drills.length+1, drillMoves, namedDrill})))
        dispatch(closeSavedDrillInput())       
    }
    

    return <div className = 'popup--inner popup--inner_center '>
        <label>Please Name Your Drill
            <input
            type = 'text'
            ref = {nameDrillRef}
            />
        </label>

        <button onClick={saveDrill}>Save</button>
        <button onClick={() => dispatch(closeSavedDrillInput())}>Cancel</button>
    </div>
}

export default MakeDrill