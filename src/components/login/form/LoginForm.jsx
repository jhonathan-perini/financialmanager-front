import nun from '../../../assets/login/nun.svg'
import padlock from '../../../assets/login/padlock.svg'
import manPumpkin from '../../../assets/login/man-pumpkin.svg'
import {Link, redirect, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../../api/api.js";
import {toast, ToastContainer} from "react-toastify";
import validator from "validator/es";
import Dialog from "../../dialog/Dialog";
import rip from '../../../assets/login/rip.svg'
import Loading from "../../Loading";
export default function LoginForm(){
    const initialState = {
        email: '',
        password:''
    }

    function handleForm(e){
        console.log(loginForm)
        setLoginForm((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }


    const client = useQueryClient()
    const [loginForm, setLoginForm] = useState(initialState)
    const [dialog, setDialog] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { mutate: doLogin, isLoading: isLoginLoading} = useMutation(async (loginForm) => {

        return await api.post('/login', loginForm )
    }, {
        onSuccess: async (res) => {
        console.log(res)

            navigate('/home')
        },
        onError: (err) => {
    setDialog(true)
    setError(err.response.data.msg)
        }})

    const { mutate: doRegister, isLoading: isRegisterLoading} = useMutation(async (loginForm) => {

        return await api.post('/register', loginForm )
    }, {
        onSuccess: async (res) => {

            toast.success(res.message)
            navigate('/')
        },
        onError: (err) => {
            setDialog(true)
            setError(err.response.data.msg)
        }})



    function login(){
        validate() ?  doLogin(loginForm) : null
    }

    function register(){
        validate() ?  doRegister(loginForm) : null
    }
    function validate(){

        if(validator.isEmail(loginForm.email)){
                if(loginForm.password.trim().length >= 6){
                  return true

                } else {
                    toast('Please, you must use 6 or more characters in your password. ')
                    return false
                }
        } else {
            toast('Please, you must use a valid email. ')
            return false
        }
    }
    return (
        <div className="login__wrapper">
            <ToastContainer  theme={"dark"} />
            {dialog && <div className="overlay"></div>}
            <Dialog dialogState={{dialog, setDialog}} confirmAction={() => setDialog(false)} >
                <div className="error_dialog">
                    <img src={rip} alt="rip" className="rip__image"/>
                    <span>{error}</span>
                </div>
            </Dialog>
            {(isLoginLoading || isRegisterLoading) ? <Loading/> : <div className="login__form--container">
                <img src={manPumpkin} className="form-icon--main" alt="man with a pumpkin over his head"/>
                <h1 className="login__form--header">Hey freak</h1>
                <form>
                    <div className="input-container">
                        <input type="text" className="general-input form__input" placeholder="Email"
                               onChange={handleForm} name="email" value={loginForm?.email}/>
                        <img src={nun} alt="nun icon" className="form-icon "/>
                    </div>
                    <div className="input-container">
                        <input type="password" className="general-input form__input" onChange={handleForm}
                               placeholder="Password" name="password" value={loginForm?.password}/>
                        <img src={padlock} alt="padlock icon" className="form-icon "/>
                    </div>
                    <a className="login__button" onClick={login}>Login</a>
                    <h1 className="login__form--footer">Wanna join?</h1>
                    <h3 className="login__form--footer-text">Just fill in your information above and click in the button
                        below</h3>
                    <a className="login__button-footer" onClick={register}>Join</a>
                </form>
            </div> }
        </div>
    )
}