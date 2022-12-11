import {Link, redirect, useNavigate} from "react-router-dom";
import Dialog from "../dialog/Dialog";
import {useState} from "react";
import skin from '../../assets/skin.svg'
import api from "../../api/api.js";
export default function Navbar(){
    const [dialog,setDialog] = useState(false)
    const navigate = useNavigate()
    async function handleLogout(){
        const response = await api.get('/logout')
        console.log(response.status)
        if(response.status === 200) {
            window.location.reload()

        }
    }
    return (
        <div className="nav__content">
            {dialog && <div className="overlay"/>}
            <Dialog dialogState={{dialog, setDialog}} confirmAction={() => setDialog(false)}  >
                <div className="skin__dialog dialog__content">
                    <img src={skin} alt="skins available" className="skin__image"/>
                    <div className="skin__text">
                        <h1>Want a new style? </h1>
                        <p>We are happy to announce our new skin feature.</p>
                        <p>For only <b>$2.99</b> you would enjoy a new thematic layout!</p>
                        <p>Coming soon</p>
                    </div>

                </div>
            </Dialog>
        <div className="navbar">
            <ul className="navbar__list">

                <li className="nav__item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav__item">
                    <Link to="/expenses">Expenses</Link>
                </li>
                <li className="nav__item">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav__item">
                    <a onClick={() => setDialog(true)}>Skins</a>
                </li>
                <li className="nav__item">
                    <Link to="/about">About</Link>
                </li>
                <li className="nav__item logout">
                    <a onClick={handleLogout}>log out</a>
                </li>

            </ul>

        </div>
        </div>
    )
}