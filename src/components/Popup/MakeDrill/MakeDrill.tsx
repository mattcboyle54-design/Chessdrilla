import { Status } from "../../../constant"
import { useAppContext } from "../../../contexts/Context"
import { useRef, useState } from 'react'
import { createDrillObj } from "../../../drillManager/drillManager"
import { closeSavedDrillInput, getSavedDrill } from "../../../reducer/actions/drillCreation"
import "./MakeDrill.css"
const MakeDrill = () => {

    const {appState: {status,drillMoves,drills},dispatch} = useAppContext()
    if(status !== Status.saving) return null

    const [error, setError] = useState<String | null>(null); 
    const saveDrill = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)
        const drillName = formData.get('drillName')
        const color = formData.get('color')

        if(drillMoves.length <= 0 || drillMoves.length <=1 && color === 'b') {
            console.log("Check")
            setError("Please Cancel and record more drill moves")
            return 
        }
        setError(null)
        
        if(typeof(drillName) !== 'string') return 
        dispatch(getSavedDrill(createDrillObj({
            drillLength: color + drills.length+1, drillMoves,namedDrill: drillName
        })))
        dispatch(closeSavedDrillInput())

    }
    


    //would be best to change this to a form 

    return <form className = 'popup--inner popup--inner_center make-drill-popup' onSubmit={saveDrill}>
        <label className = 'make-drill-label'>Please Name Your Drill
            <input 
            type = 'text'
            name = 'drillName'
            required 
            />
        </label>

        <div>
            Choose a color: 
            <label> 
                
                <input 
                type = 'radio' 
                name = 'color' 
                value = 'w' 
                required/>
                W
            </label>

            <label>     
                <input 
                type = 'radio' 
                name = 'color' 
                value = 'b' 
                required/>
                B
            </label>
        </div>

        {error && <p className = "error-message">{error}</p>}

        <div className="make-drill-buttons">
            <button type = 'submit'>Save</button>
            <button onClick = {() => dispatch(closeSavedDrillInput())}>Cancel</button>
        </div>
        
    </form>
}

export default MakeDrill