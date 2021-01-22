import React, { useEffect, useState, ChangeEvent, FormEvent, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import corteLogo from '../../assets/images/fullstackchallenge.png';
import './style.css';
import api from '../../services/api';
import Pageheader from '../../assets/components/PageHeader';

import edit from '../../assets/images/pencil-striped-symbol-for-interface-edit-buttons_icon-icons.com_56782.svg';
import del from '../../assets/images/delete_remove_bin_icon-icons.com_72400.svg';

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

            <table className='list-table'>
                <thead className='thead-table'>
                    <td>Nome</td>
                    <td>Valor Inicial</td>
                    <td>Usado ?</td>
                    <td>#</td>
                </thead>
                <tbody className='tbody-table'>
                    {items.map(item => (
                        <tr key={item.id} onClick={() => { }} >
                            <td>{item.name}</td>
                            <td>{item.initial_value}</td>
                            <td>{item.used}</td>
                            <td>
                                <Link to={`/edit/${item.id}`} className='password button-control'>
                                    <img src={edit} alt='editar' className='edit-button'/>
                                </Link>
                                <Link to={`/delete/${item.id}`} className='password button-control'>
                                    <img src={del} alt='deletar' className='delete-button' />
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