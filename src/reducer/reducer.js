import actionTypes from "./actions/actionTypes"
import { GameMode, Status } from "../constant"

export const reducer = (state, action) => {
    switch(action.type) {

        //Game Logic 
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

            let {position,movesList,turn,castleHistory,castleDirection,drillMoves,gameMode} = state 
            
            if(position.length > 1) {
                position = position.slice(0,position.length-1)
                movesList = movesList.slice(0,position.length-1)
                turn = turn === 'w' ? 'b' : 'w'
                castleHistory = castleHistory.slice(0,castleHistory.length-1)
                castleDirection = castleHistory[castleHistory.length-1]
                if(gameMode === GameMode.drill) {
                    drillMoves = drillMoves.slice(0,drillMoves.length-1)
                }
                
            }

            return {
                ...state,
                position,
                movesList,
                turn,
                castleHistory,
                castleDirection,
                drillMoves
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
            const {castleDirection} = state
                    return {
                        ...state,
                        castleDirection: {
                            ...castleDirection,
                            ...action.payload.newCastleHistory,
                            
                        }
                    }
                
            
        }


        
        //End of game 
         case actionTypes.STALEMATE: {
            return {
                ...state,
                status: Status.stalemate,
            }
        }

         case actionTypes.NEW_GAME: {
            let {drills} = state
            
            return {
                ...action.payload,
                gameMode: GameMode.analysis,
                ...drills
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



         //Drill section 
         case actionTypes.DRILL_MODE: {
            return {
                ...state,
                gameMode: GameMode.drill,
                status: Status.ongoing,
                drillMoves: [],
            }
         }

         case actionTypes.NEW_DRILL_MOVE: {
            if(state.gameMode!== GameMode.drill) {
                throw new Error("Cannot record drill moves outside drill mode")
            }
            let {drillMoves} = state 
            drillMoves = [
                ...drillMoves,
                action.payload
            ]

            return {
                ...state,
                drillMoves
            }
         }

         case actionTypes.OPEN_SAVE: {
            return {
                ...state,
                status: Status.saving
            }
         }
         
         case actionTypes.CLOSE_SAVE: {
            return {
                ...state,
                status: Status.ongoing
            }
         }

         case actionTypes.SAVE_DRILL: {
        
            let {drills} = state

            drills = [
                ...drills,
                action.payload
            ]
        
            return{
                ...state,
                drills
            }
         }
        default: 
            return state
    }


}