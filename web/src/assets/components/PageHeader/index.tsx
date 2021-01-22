import React from 'react';
import { Link } from 'react-router-dom';

import backIcons from '../../images/return.svg';
import backIcon from '../../images/arrow-left.svg';
import corteLogo from '../../images/fullstackchallenge.png';

import './styles.css';

interface PageHeaderProps {
    title?: string;
}

const Pageheader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className='page-header-schedule'>
            <div className='top-bar-container-schedule'>
                <img src={corteLogo} alt='cortar' />
                <div></div>
                <Link to='/' className='button-control'>
                    Sair
                </Link>
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