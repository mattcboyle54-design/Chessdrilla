
type DrillNotationParam = {
    rank: number;
    file: number;
    x: number;
    y: number;
    promotesTo?: string;
    
}

export type ReturnDrillMoves = {
    from: [number,number]
    to: [number,number]
    promotes?: string 
}



export const makeDrillNotation = ({rank,file,x,y,promotesTo}: DrillNotationParam): ReturnDrillMoves => {
    
    return {
        from: [rank,file],
        to: [x,y],
        promotes: promotesTo

    }
}

type MakeDrillParam = {
    drillLength: number
    drillMoves: ReturnDrillMoves[]
    namedDrill: string
}

export type ReturnDrillObject = {
    id: number
    moves: ReturnDrillMoves[]
    name: string
}

export const createDrillObj = ({drillLength,drillMoves,namedDrill}: MakeDrillParam): ReturnDrillObject => {
    
    return {
        id: drillLength,
        moves: drillMoves,
        name: namedDrill,
        

    }
}

