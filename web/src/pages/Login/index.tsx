import React,  {useState,ChangeEvent,FormEvent } from 'react';
import { Redirect } from 'react-router-dom'; 
import swal from 'sweetalert';

import corteLogo from '../../assets/images/fullstackchallenge.png'; 
import './style.css';
import api from '../../services/api';

const Login = () => {
    
    const [reqLogin,setReqLogin] = useState<string>("");
    const [reqPassword,setReqPassword] = useState<string>("");

    function handleLogin(event: ChangeEvent<HTMLInputElement>){
        setReqLogin(event.target.value);
    }

    function handlePassword (event: ChangeEvent<HTMLInputElement>){
        setReqPassword(event.target.value);
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
            localStorage.setItem('token', response.data.token);    

        }).catch(response => {
            
            swal("Usuario ou Senha incorreta");
        });             
    }
    if(localStorage.getItem('token')){
        return(
            <Redirect to={{pathname:'/list', state:{next: true}}} />
        );
    }
    return (
        <div id='page-landing'>
            <div id='page-landing-content' className='container'>
                <div className='logo-container'>
                    <img src={corteLogo} alt='Fullstack Challenge' />
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

                        <button type='submit' className='button-control-login' >Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;