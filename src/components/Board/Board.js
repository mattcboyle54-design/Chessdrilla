import './Board.css'
import Files from './bits/Files'
import Ranks from './bits/Ranks'
import Pieces from './Pieces/Pieces'

//Create a board from ranks and tiles using nested maps. Ranks are 8-1 and tiles are a-h. Each square is a div with the rank and tile as text.
const Board = () => {
    //Chooses whether each sqaure should get the light sqaure class or dark -sqaure class 
    const getClassName = (i,j) => {
        let c = 'tile'
        c+= (i+j) % 2 === 0 ? ' tile--dark' : ' tile--light'
        return c
    }
    //Creates an empty array that map uses to fill a new array ranks a tiles. String allows tiles to based as their proper letters 
    const ranks = Array(8).fill(0).map((_, i) => 8 - i)
    const tiles = Array(8).fill(0).map((_, i) => i + 1)

    return <div className = 'board'>
        <Ranks ranks = {ranks}/>



        <div className = 'tiles'>
            {ranks.map((rank,i) => 
                tiles.map((file,j) => 
                    <div key= {file + '-' + rank} className={getClassName(9-i,j)}></div>
            
               
                )
            
            )}
        </div>

       <Pieces/>     
       <Files files = {tiles}/>
    </div>
}

export default Board