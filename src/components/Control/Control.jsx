import { Status } from '../../constant'
import { useAppContext } from '../../contexts/Context'
import './Control.css'

const Control = ({children}) => {

    const {appState: {status} } = useAppContext()

    const isPopupOpen = status === Status.promoting || status === Status.saving 

    
    return <div className="control" inert = {isPopupOpen}>
        {children}
    </div>
}

export default Control