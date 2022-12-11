import spider from '../../assets/home/spider.svg'
import doll from '../../assets/home/voodoo-doll.svg'
import pumpkin from '../../assets/home/pumpkin.svg'
import eye from '../../assets/home/eye.svg'
import {Link} from "react-router-dom";
import NotFound from "../NotFound";
import {useQuery} from "@tanstack/react-query";
import api from "../../api/api.js";
import {getCategoryImage} from "../expenses/Expenses.jsx";
import Loading from "../Loading";

export default function Home(){
    const {data: mainExpenses, isLoading: homeIsLoading} = useQuery(["expensesHome"], async () => {
        const response = await api.get('/expenses?limit=6', {withCredentials: true})
        return  response.data.response
    })
    return (
        <div className="home__container">
            <div className="home__header">
                <img src={spider} className="home__spider"  alt="spider"/>
                <h1>Hello!</h1>
            </div>
            <h3 className="intro-header">Let’s check your last interactions…</h3>
            <img src={doll} className="home__doll"  alt="doll with needles "/>
            { homeIsLoading ? <Loading/> : <div className="home__card-container">

                {mainExpenses?.length > 0 ? mainExpenses.map(expense => {
                    return <div className="expense__card" key={expense._id}>
                        <div>      {expense?.name}</div>

                        <p>{expense?.date}</p>
                        <p>{Number(expense?.value).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                        {getCategoryImage(expense?.category)}
                        <div className="card__menu">
                            <span>Edit</span>
                            <span onClick={() => mainExpenses(expense._id)}>Delete</span>
                        </div>
                    </div>

                }) : <NotFound/>}
            </div>}


                <div style={{display:'flex', position: 'relative'}} className="button__container">
                    <Link to={'/expenses'} className="login__button">
                        <span>see</span>
                        <img src={eye} className="home__eye"  alt="eye"/>
                       <span>more</span>
                    </Link>

                </div>





        </div>
    )
}