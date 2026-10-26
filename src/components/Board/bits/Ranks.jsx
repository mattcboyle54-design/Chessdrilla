import './Ranks.css'
//Makes the numbers 1-8 on the board 
const Ranks = ({ranks}) => {
    return <div className = 'ranks'>
        {ranks.map(rank => <span key={rank}>{rank}</span>)}
    </div>
}

export default Ranks;