import { useAppContext } from "../contexts/Context";

type drillNotationParam = {
    rank: number;
    file: number;
    x: number;
    y: number;
    promotesTo?: string;
    
}


export const makeDrillNotation = ({rank,file,x,y,promotesTo}: drillNotationParam) => {
    
    return {
        from: [rank,file],
        to: [x,y],
        promotes: promotesTo

    }
}

type makeDrillParam = {
    drillLength: number
    drillMoves: []
    namedDrill: string
}

export const createDrillObj = ({drillLength,drillMoves,namedDrill}: makeDrillParam) => {
    
    return {
        id: drillLength,
        moves: drillMoves,
        name: namedDrill,
        

    }
}

