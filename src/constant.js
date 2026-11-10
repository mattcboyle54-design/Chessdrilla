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
    'drillFinished': 'drillFinished'
}

export const GameMode = {
    'start' : 'Start',
    'drill': 'DrillMode',
    'analysis': 'AnalysisMode',
    'play': 'PlayDrill',
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
    selectedDrill: null,

    drillSequence: null, 
    drillPointer: 0,
    failedSqaure: null
} 

export const createInitialGameState = () => ({
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
    selectedDrill: null,
    //Still Drill management but also playing drills 
    drillSequence: null, 
    drillPointer: 0,
    failedSqaure: null
})

