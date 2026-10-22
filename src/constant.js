import { createPosition } from "./helper";

export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'black' : 'Black Wins',
    'white' : 'White Wins',
    'stalemate' : 'Game draws due to stalemate',
    'insufficient' : 'Game draws due to insufficent material',
}

export const initGameState = {
    position: [createPosition()],
    castleHistory: [{
        w: 'both', b: 'both'
    }],
    turn : 'w',
    movesList : [],
    candidateMoves : [],
    status : Status.ongoing,
    promotionSquare: null,
    castleDirection : {
        w: 'both',
        b: 'both',
    },
} 

export const createInitialGameState = () => ({
    position: [createPosition()],
    castleHistory: [{
        w: 'both', b: 'both'
    }],
    turn: 'w',
    movesList : [],
    candidateMoves: [],
    castleDirection: {
        w: 'both',
        b: 'both'
    },
    status: Status.ongoing,
    promotionSquare: null,
    

})