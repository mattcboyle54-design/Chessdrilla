export const areSameColorTiles = (coords1,coords2) => 
    (coords1.x + coords1.y) %2 === (coords2.x + coords2.y) % 2


export const findPieceCoords = (position,type) => {
    let results = []
    position.forEach((rank,i) => {
        rank.forEach((pos,j) => {
            if(pos === type) results.push({x: i , y: j})
        })
    })
    return results
}

