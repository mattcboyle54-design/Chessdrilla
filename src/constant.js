import { createPosition } from "./helper";

export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'black' : 'Black Wins',
    'white' : 'White Wins',
}

export const initGameState = {
    position: [createPosition()],
    turn : 'w',
    candidateMoves : [],
    status : Status.ongoing,
    promotionSqaure: null,
    castleDirection : {
        w: 'both',
        b: 'both',
    },
} 