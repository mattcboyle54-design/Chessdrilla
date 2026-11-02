import actionTypes from "./actionTypes";

export const setupDrillMode = (newGameState: object) => {
      return{
        type: actionTypes.DRILL_MODE,
        payload:newGameState,
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

export const getDrillId = (id: number) => {
    return {
        type: actionTypes.PULL_DRILL,
        payload: id,
    }
}

export const playDrill = (newGameState: object, drillSequence: object) => {
    return {
        type: actionTypes.PLAY_DRILL,
        payload: {newGameState,drillSequence}
    }
}
