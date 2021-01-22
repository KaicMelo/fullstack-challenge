  
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login/index';
import List from './pages/List/index';
import Create from './pages/Create/index';
import Edit from './pages/Edit';

function routes(){
    return(
        <BrowserRouter> 
            <Route path='/' exact component={Login} /> 
            <Route path='/list' exact component={List} /> 
            <Route path='/create' exact component={Create} /> 
            <Route path='/edit/:id' exact component={Edit} />
        </BrowserRouter>
    );
}

export default routes;