import actionTypes from "./actionTypes"

export const updateDrillSequence = () => {
    return {
        type: actionTypes.UPDATE_DRILL_SEQUENCE,
    }
}

type coordinates = {
    x:number
    y:number
    piece:string
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
