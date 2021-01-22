import React,{ FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';

import backIcons from '../../images/return.svg';
import backIcon from '../../images/arrow-left.svg';
import corteLogo from '../../images/fullstackchallenge.png';

import './styles.css';

interface PageHeaderProps {
    title?: string;
}
function handleExit(event: FormEvent){
    
    localStorage.removeItem('token');
}

const Pageheader: React.FC<PageHeaderProps> = (props) => {
    if(!localStorage.getItem('token')){
        return(
            <Redirect to={{pathname:'/', state:{next: true}}} />
        );
    }
    return (
        <header className='page-header-schedule'>
            <div className='top-bar-container-schedule'>
                <img src={corteLogo} alt='cortar' />
                {/* <div></div> */}
                <form  onSubmit={handleExit}>
                    <button type='submit' className='exit-button'>Sair</button>
                </form>
                {/* <Link to='/' className='button-control' onSubmit={handleExit}>
                    Sair
                </Link> */}
            </div>
            <div className='header-content-schedule'>
                <Link to='/list' className='button-control'>
                    Listar
                </Link>
                <Link to='/create' className='button-control'>
                    Cadastrar
                </Link>
            </div>
        </header>
    )
}

export default Pageheader;