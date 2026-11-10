
type checkDrillMovesparam = {
    rank: number
    file: number
    x: number
    y: number 
    drillMoves: [{
        from: [number,number]
        to: [number,number]
        promotesTo?: string
    }]
    drillPointer: number
    newPosition: String[][]
    promotesTo: String
}
 const drillTrainer = { 
    //getRegularMoves : function({position,piece,rank,file}) {
    isCorrectMove: function({rank,file,x,y,drillMoves,drillPointer, promotesTo}: checkDrillMovesparam) {
        if(rank === drillMoves[drillPointer].from[0] 
            && file === drillMoves[drillPointer].from[1] 
            && x === drillMoves[drillPointer].to[0]
            && y === drillMoves[drillPointer].to[1]){
                return true; 
            }


        return false;
    },

    updatePosition: function ({drillMoves,drillPointer,newPosition}:checkDrillMovesparam) {
        const rank = drillMoves[drillPointer].from[0]
        const file = drillMoves[drillPointer].from[1]
        const x = drillMoves[drillPointer].to[0]
        const y = drillMoves[drillPointer].to[1]

        const piece = newPosition[rank][file]

        if(piece.endsWith('p')) {
            if(!newPosition[x][y] && x !== rank && y!== file){
                newPosition[rank][y] = ''
                newPosition[x][y] = piece
            }

            else if((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
                newPosition[rank][file] = ''
                newPosition[x][y] = piece[0] + drillMoves[drillPointer].promotesTo                
            }


        }

        if(piece.endsWith('k')) {
            
        }
        else {
            newPosition[drillMoves[drillPointer].from[0]][drillMoves[drillPointer].from[1]] = ''
            newPosition[drillMoves[drillPointer].to[0]][drillMoves[drillPointer].to[1]] = piece 
        }


        return newPosition
        
    },


    
}


export default drillTrainer