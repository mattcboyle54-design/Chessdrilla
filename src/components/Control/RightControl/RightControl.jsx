import { Status } from '../../../constant'
import { useAppContext } from '../../../contexts/Context'
import '../Control.css'

const RightControl = ({children}) => {

    const {appState: {status} } = useAppContext()

    const isPopupOpen = status === Status.promoting 
    || status === Status.saving 
    || status === Status.black
    || status === Status.white 
    || status === Status.stalemate
    || Status === Status.insufficient
    

    
    return <div className="Control" inert = {isPopupOpen}>
        {children}
    </div>
}

export default RightControl