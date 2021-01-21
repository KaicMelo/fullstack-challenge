import React,  { useEffect, useState,ChangeEvent,FormEvent, Component } from 'react';
import { Link, useHistory    } from 'react-router-dom'; 
import corteLogo from '../../assets/images/fullstackchallenge.png'; 
import './style.css';
import api from '../../services/api';

interface Logins{
    user:string,
    password: string
}

const Login = () => {
    
    const [reqLogin,setReqLogin] = useState<string>("");
    const [reqPassword,setReqPassword] = useState<string>("");
    const [token,setToken] = useState<string>("");
    const [user,setUser] = useState<string>("");

    function handleLogin(event: ChangeEvent<HTMLInputElement>){
        const login = event.target.value;
        setReqLogin(login);
    }

    function handlePassword (event: ChangeEvent<HTMLInputElement>){
        const password = event.target.value;
        setReqPassword(password);
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        
        var authorizationBasic = window.btoa(reqLogin + ':' + reqPassword);
        var config = {
            "headers": {
                "Authorization": "Basic " + authorizationBasic
            }
        };
 
        api.get('authenticate',config).then(response => {
            // setToken(response.data.token); 
            console.log(response)
            localStorage.setItem('token', response.data.token);

            return window.location.href = '/home';
        }).catch(response => {
            
        });             
    }

    return (
        <div id='page-landing'>
            <div id='page-landing-content' className='container'>
                <div className='logo-container'>
                    <img src={corteLogo} alt='Proffy' />
                </div>

                <form onSubmit={handleSubmit} id='form-control'>
                    <div className='input-form'>
                        <label htmlFor='input-login'>
                            Login:
                        </label>
                        <input type="text" id='input-login' value={reqLogin} onChange={handleLogin} />
                    </div>
                    <div className='input-form'>
                        <label htmlFor='input-password'>
                            Senha:
                        </label>
                        <input type="password" id='input-password' value={reqPassword} onChange={handlePassword} />
                    </div>

                    <div className='buttons-container'>
                        {/* <Link to='/home' className='login button-control'> 
                            Entrar
                        </Link> */}
                        <Link to='/list' className='password button-control-login'>
                            Login
                        </Link> 
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;