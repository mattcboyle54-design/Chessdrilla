import { GameMode, Status } from '../../../constant'
import { useAppContext } from '../../../contexts/Context'
import { ReactNode } from 'react'
import '../Control.css'

type ControlPops = {
    children: ReactNode
}


const LeftControl = ({children}: ControlPops) => {

    const {appState: {status,gameMode} } = useAppContext()

    const isPopupOpen = status === Status.promoting || status === Status.saving || gameMode === GameMode.play

    
    return <div className="Control" inert = {isPopupOpen}>
        {children}
    </div>
}

export default LeftControl