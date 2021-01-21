import React from 'react';
import { Link } from 'react-router-dom';

// import backIcon from '../../images/return.svg';
import backIcon from '../../images/fullstackchallenge.png';
import corteLogo from '../../images/fullstackchallenge.png';

import './styles.css';

interface PageHeaderProps {
    title?: string;
}

const Pageheader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className='page-header-schedule'>
            <div className='top-bar-container-schedule'>
                <div></div>
                <img src={corteLogo} alt='cortar' />
            </div>
            <div className='header-content-schedule'>
                <Link to='/list' className='password button-control'>
                    Listar
                </Link>
                <Link to='/create' className='password button-control'>
                    Cadastrar
                </Link>
            </div>
        </header>
    )
}

export default Pageheader;