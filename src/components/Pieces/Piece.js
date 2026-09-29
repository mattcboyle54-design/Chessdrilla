const Piece = ({
    rank,
    file,
    piece,
}) => {

    //give information on the piece specifically piece type ie: bk, rank, and file (so you know which piece is moved and from what original spot). Removes the original piece's png with a delay so you can see piece while dragging
    const onDragStart = e=> {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain',`${piece},${rank},${file}`)
        setTimeout(() => {
            e.target.style.display = 'none'
        })
      
    }
    //prevents target.style.display so piece will stay on original tile when illegal move is made 
    const onDragEnd = e=> e.target.style.display = 'block'

    return (
        <div 
            className= {`piece ${piece} p-${file}${rank}`}
            draggable={true}
            onDragEnd = {onDragEnd}
            onDragStart={onDragStart}
            />
        )

}

export default Piece 