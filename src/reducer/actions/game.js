import actionTypes from "./actionTypes"

export const updateCastling = direction => {
    return {
        type: actionTypes.CAN_CASTLE,
        payload: direction,
    }
}

export const detectStalemate = () => {
    return {
        type : actionTypes.STALEMATE
    }
}

export const setupNewGame = (newGameState) => {
    return{
        type: actionTypes.NEW_GAME,
        payload: newGameState
    }
}

export const detectInsufficentMaterial = () => {
    return {
        type : actionTypes.INSUFFICENT_MATERIAL
    }
}

export const detectCheckmate = winner => {
    return {
        type : actionTypes.WIN,
        payload: winner
    }
}