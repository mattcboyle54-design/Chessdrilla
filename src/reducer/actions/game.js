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