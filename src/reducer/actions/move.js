import actionTypes from "./actionTypes"

//Helper function that builds the action for the new move 
export const makeNewMove = ({newPosition}) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition}
    }
}

export const generateCandidateMoves = ({candidateMoves}) => {
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload: {candidateMoves}
    }
}

export const clearCandidates = () => {
    return {
        type: actionTypes.CLEAR_CANDIDAATE_MOVES
    }
}