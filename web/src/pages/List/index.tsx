import React, { useEffect, useState, ChangeEvent, FormEvent, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import corteLogo from '../../assets/images/fullstackchallenge.png';
import './style.css';
import api from '../../services/api';
import Pageheader from '../../assets/components/PageHeader';

interface Item {
    id: number,
    name: string,
    initial_value: number,
    responsible: string,
    used: boolean,
    start_date: string,
    end_date: string
}


const List = () => {
    const [items, setItems] = useState<Item[]>([]);

    const config = {
        headers: {
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjExMjQ4MDAwLCJleHAiOjE2MTEzMzQ0MDB9.qVQbdK2z9Ehw-EDpyBQtXPPE4By0QBr67K3ezNAmH8U'
        }
    }

    useEffect(() => {
        api.get('auctions', config).then(response => {
            setItems(response.data.auctions);
        });
    }, []);

    return (
        <div id='page-history' className='container'>
            <Pageheader title='Menu' />

            <table>
                <thead>
                    <td>Nome</td>
                    <td>Valor Inicial</td>
                    <td>used</td>
                    <td>#</td>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} onClick={() => { }} >
                            <td>{item.name}</td>
                            <td>{item.initial_value}</td>
                            <td>{item.used}</td>
                            <td>
                                <Link to='/create' className='password button-control'>
                                Editar
                                </Link>
                                <Link to='/create' className='password button-control'>
                                Excluir
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default List;