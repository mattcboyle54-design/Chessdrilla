import arbiter from "./arbiter/arbiter";

//Creates helper function to make code look a little cleaner when converting numbers to their proper letters 
export const getCharacter = i => String.fromCharCode(i + 96);


export const createPosition = () => {
const position = new Array(8).fill('').map(x=> new Array (8).fill(''))


for (let i = 0; i < 8; i++) {
    position[6][i] = "bp";
    position[1][i] = "wp";
  }

  position[0][0] = "wr";
  position[0][1] = "wn";
  position[0][2] = "wb";
  position[0][3] = "wq";
  position[0][4] = "wk";
  position[0][5] = "wb";
  position[0][6] = "wn";
  position[0][7] = "wr";

  position[7][0] = "br";
  position[7][1] = "bn";
  position[7][2] = "bb";
  position[7][3] = "bq";
  position[7][4] = "bk";
  position[7][5] = "bb";
  position[7][6] = "bn";
  position[7][7] = "br";

return position
};

export const copyPosition = position => {
    const newPosition = new Array(8).fill('').map(x=> new Array (8).fill(''))
    for (let rank = 0; rank <8; rank++) {
        for (let file = 0; file<8; file++) {
            newPosition[rank][file] = position[rank][file]
        }
    }
    return newPosition
};



export const getNewMoveNotation = ({piece,rank,file,x,y,position,prevPosition,promotesTo,newPosition,opponent,castleDirection}) => {
    let note = ''
    rank = Number(rank)
    file = Number(file)

    //Castling notation
    if(piece[1] === 'k' && Math.abs(file - y) === 2){
        if(file>y)
            note+='O-O-O'
        else 
            note+='O-O'
    }
    //Piece notation
    else {

        if(piece[1] !== 'p') {   
            note+= piece[1].toUpperCase()

            if(piece[1] !== 'k') {
                const [rankCheck,fileCheck,hasCompetitor] = checkDisambigousMoves({piece,rank,file,x,y,position,prevPosition,castleDirection})
                if(hasCompetitor) {
                    if(fileCheck===false) note+= getCharacter(file+1)
                    else if(!rankCheck) note+= (rank+1)
                    else note+= (rank+1) +getCharacter(file+1)
                }
            }

            if(position[x][y]){
                note+='x'
            }
        }
        else if (rank !== x && file !== y){
            note+= getCharacter(file+1)+'x'
        }

        note+=getCharacter(y+1) + (x+1)
    
        if(promotesTo)
            note+= '=' + promotesTo.toUpperCase()

    }
    //Checkmate notation 
    if(arbiter.isCheckmate(newPosition,opponent,castleDirection))
        note+='#'

    else if (arbiter.isPlayerInCheck({
        positionAfterMove: newPosition,
        player: opponent
       }))note+= '+'
    
    
    
    
   return note
}


const checkDisambigousMoves = ({piece,rank,file,x,y,position,prevPosition,castleDirection}) => {

    let hasCompetitor = false 
    let rankCheck = false
    let fileCheck = false
    
    for (let i=0; i<position.length; i++){
        for(let j=0; j<position[i].length; j++){
            if(position[i][j] === piece && !(i==rank && j===file)) {
                const candidateMoves = arbiter.getValidMoves({
                    position : position,
                    prevPosition : prevPosition,
                    castleDirection,
                    piece : piece,
                    rank : i,
                    file : j, 
                })
            
                const canReach = candidateMoves.some(([first,second]) => {
                    return (first === x && second === y)
                })

                if(canReach){
                    hasCompetitor = true;
                    if(i === rank) rankCheck = true;
                    if(j === file) fileCheck = true;
                }   
            }
        }
    }

    return [rankCheck,fileCheck,hasCompetitor]
}


