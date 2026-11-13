import actionTypes from "./actionTypes"

type coordinates = {
  x: number 
  y: number
  piece: string
  rank: number
  file: number
}

export const updateDrillSequence = (sucessfulMove: coordinates) => {
    return {
        type: actionTypes.UPDATE_DRILL_SEQUENCE,
        payload: sucessfulMove
    }
}
export const openFailedSqaure = ({x,y}: coordinates) => {
    return {
        type: actionTypes.FAILURE,
        payload: {x,y}
    }
}

 export const closeFailedSqaure = () => {
    return {
        type: actionTypes.CLOSE_FAILURE
    }
}

export const openDrillSucess = () => {
    return{ 
        type: actionTypes.DRILL_SUCCESS
    }
}

export const setupNextDrill = (newGameState: object) => {
    return {
        type: actionTypes.NEXT_DRILL,
        payload: newGameState
    }
}




