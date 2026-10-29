import { createPosition } from "./helper";

export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'black' : 'Black Wins',
    'white' : 'White Wins',
    'stalemate' : 'Game draws due to stalemate',
    'insufficient' : 'Game draws due to insufficent material',
    'saving': "Saving",
    'start': 'Start',
}

export const GameMode = {
    'start' : 'Start',
    'drill': 'DrillMode',
    'analysis': 'AnalysisMode',
    'PlayDrill': 'PlayDrill',
}

export const initGameState = {
    //game logic related 
    position: [createPosition()],
    castleHistory: [{
        w: 'both', b: 'both'
    }],
    turn : 'w',
    movesList : [],
    candidateMoves : [],
    promotionSquare: null,
    castleDirection : {
        w: 'both',
        b: 'both',
    },

    //Gamemode and Gamestate management 
    status : Status.start,
    gameMode: GameMode.start,

    //Drill management 
    drillMoves: [],
    drills: [],
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