//Creates helper function to make code look a little cleaner when converting numbers to their proper letters 
export const getCharacter = i => String.fromCharCode(i + 96);


export const createPosition = () => {
const position = new Array(8).fill('').map(x=> new Array (8).fill(''))
 
/*
for (let x=0; x<8; x++) {
    position[1][x] = 'wp'
    position[6][x] = 'bp'
}

position[0][0] = 'wr'
position[0][1] = 'wn'
position[0][2] = 'wb'
position[0][3] = 'wq'
position[0][4] = 'wk'
position[0][5] = 'wb'
position[0][6] = 'wn'
position[0][7] = 'wr'
position[7][7] = 'br'
position[7][6] = 'bn'
position[7][5] = 'bb'
position[7][4] = 'bk'
position[7][3] = 'bq'
position[7][2] = 'bb'
position[7][1] = 'bn'
position[7][0] = 'br'
*/
position[0][4] = 'wk'
position[7][4] = 'bk'
position[7][0] = 'br'
position[7][7] = 'br'
position[0][0] = 'wr'
position[0][7] = 'wr'
return position
}

export const copyPosition = position => {
    const newPosition = new Array(8).fill('').map(x=> new Array (8).fill(''))
    for (let rank = 0; rank <8; rank++) {
        for (let file = 0; file<8; file++) {
            newPosition[rank][file] = position[rank][file]
        }
    }
    return newPosition
}