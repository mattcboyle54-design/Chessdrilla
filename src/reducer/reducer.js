import actionTypes from "./actions/actionTypes"
import { Status } from "../constant"

export const reducer = (state, action) => {
    switch(action.type) {
        case actionTypes.NEW_MOVE: {
            let {turn, position, movesList, castleHistory} = state 

            turn = turn === 'w' ? 'b' : 'w'

            position = [
                ...position, 
                action.payload.newPosition
            ]

            movesList = [
                ...movesList,
                action.payload.newMove
            ]
            
            castleHistory = [
                ...castleHistory,
                action.payload.newCastleHistory
            ]
            
            //3. Return the next state from the reducer (which React will set the state to)
            return { 
                ...state, 
                movesList,
                turn, 
                position,
                castleHistory,
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES: {
            return {
                ...state,
                candidateMoves : action.payload.candidateMoves
                
            }
        }

        case actionTypes.TAKE_BACK: {

            let {position,movesList,turn,castleHistory,castleDirection} = state 
            
            if(position.length > 1) {
                position = position.slice(0,position.length-1)
                movesList = movesList.slice(0,position.length-1)
                turn = turn === 'w' ? 'b' : 'w'
                castleHistory = castleHistory.slice(0,castleHistory.length-1)
                castleDirection = castleHistory[castleHistory.length-1]
            }

            return {
                ...state,
                position,
                movesList,
                turn,
                castleHistory,
                castleDirection
            }
        }

        case actionTypes.CLEAR_CANDIDAATE_MOVES: {
            return {
                ...state,
                candidateMoves: []
            }
        }

        case actionTypes.PROMOTION_OPEN: {
            return {
                ...state,
                status : Status.promoting,
                promotionSquare: {...action.payload},
            }
        }

        case actionTypes.PROMOTION_CLOSE: {

             return {
                ...state,
                status : Status.ongoing,
                promotionSquare : null,
            }
        }
          case actionTypes.CAN_CASTLE: {
            const {turn , castleDirection,} = state

            return {
                ...state,
                castleDirection: {
                    ...castleDirection,
                    [turn]: action.payload
                }
            }
        }

         case actionTypes.STALEMATE: {
            return {
                ...state,
                status: Status.stalemate,
            }
        }

         case actionTypes.NEW_GAME: {
            return {
                ...action.payload
            }
         }

         case actionTypes.INSUFFICENT_MATERIAL: {
            return {
                ...state,
                status: Status.insufficient
            }
         }

         case actionTypes.WIN: {
            return {
                ...state,
                status: action.payload === 'w' ? Status.white : Status.black
            }
         }
        default: 
            return state
    }


}