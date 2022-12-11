import ghosts from '../assets/ghosts404.svg'

export default function NotFound(){
    return(
        <div className="not-found__container" >
        <img src={ghosts} alt="ghosts" className="not-found__image"/>
            <h1>There's nothing here...</h1>
        </div>
    )
}