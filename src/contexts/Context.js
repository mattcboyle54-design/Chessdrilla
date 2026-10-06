import { createContext, useContext} from "react";

// Creates shared app context and a helper hook for accessing it in components
const AppContext = createContext();

export function useAppContext () {
    return useContext(AppContext)
}

export default AppContext