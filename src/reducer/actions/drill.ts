import actionTypes from "./actionTypes";

export const setupDrillMode = () => {
      return{
        type: actionTypes.DRILL_MODE,
    }
}

export const makeNewDrillMove = (newDrillMove : object) => {
    return {
        type:actionTypes.NEW_DRILL_MOVE,
        payload: newDrillMove
    }
}

export const openSaveDrillInput = () => {
    return {
        type:actionTypes.OPEN_SAVE
    }
}
export const getSavedDrill= (newDrill: object) => {
    return {
        type:actionTypes.SAVE_DRILL,
        payload: newDrill
    }
}

export const closeSavedDrillInput = () => {
    return {
        type: actionTypes.CLOSE_SAVE
    }
}



