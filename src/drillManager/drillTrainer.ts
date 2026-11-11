
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
    isCorrectMove: function({rank,file,x,y,drillMoves,drillPointer}: checkDrillMovesparam) {
        if(rank === drillMoves[drillPointer].from[0] 
            && file === drillMoves[drillPointer].from[1] 
            && x === drillMoves[drillPointer].to[0]
            && y === drillMoves[drillPointer].to[1]){
                return true; 
            }
        

        return false;
    },



    
}


export default drillTrainer