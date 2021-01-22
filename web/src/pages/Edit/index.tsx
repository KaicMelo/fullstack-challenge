import React, { useEffect, useState, ChangeEvent, FormEvent, Component } from 'react';
import { Link, useParams  } from 'react-router-dom';
// import './style.css';
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

async function handleSubmit(event: FormEvent) {
    event.preventDefault();
}

interface obgParams{
    id: string
}
const Edit = () => { 

    const [reqName, setName] = useState<string>("");
    const [reqInicialValue, setInitialValue] = useState<string>("");
    const [reqResponsible, setResponsible] = useState<string>("");
    const [reqUsed, setUsed] = useState<string>("");
    const [reqStartDate, setStartDate] = useState<string>("");
    const [reqEndDate, setEndDate] = useState<string>("");

    function handName(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;
        setName(name);
    }
    function handInitialValue(event: ChangeEvent<HTMLInputElement>) {
        const initial = event.target.value;
        setInitialValue(initial);
    }
    function handResponsible(event: ChangeEvent<HTMLInputElement>) {
        const responsible = event.target.value;
        setResponsible(responsible);
    }
    function handUsed(event: ChangeEvent<HTMLInputElement>) {
        const used = event.target.value;
        setUsed(used);
    }
    function handStartDate(event: ChangeEvent<HTMLInputElement>) {
        const start = event.target.value;
        setStartDate(start);
    }
    function handEndDate(event: ChangeEvent<HTMLInputElement>) {
        const end = event.target.value;
        setEndDate(end);
    }

    const params: obgParams = useParams();
    
    const config = {
        headers: {
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjExMjc0NTE2LCJleHAiOjE2MTEzNjA5MTZ9.hQwvjiQUOEMOoAOZWZP5vQdl-z2CfNpUHJEy5iin3h4'
        }
    }
    
    useEffect(() => {
        
        api.get('auctions/'+params.id,config).then(response => {
            setName(response.data.auctions.name);
            setInitialValue(response.data.auctions.initial_value);
            setResponsible(response.data.auctions.responsible);
            setUsed(response.data.auctions.used);
            const start = response.data.auctions.start_date.split('T');
            setStartDate(start[0]);
            const end = response.data.auctions.end_date.split('T');
            setEndDate(end[0]);
        });
    }, []);

    return (
        <div id='page-history' className='container'>
            <Pageheader title='Menu' />

            <form onSubmit={handleSubmit} id='form-control'>
                <div className='input-form'>
                    <label htmlFor='input-name'>
                        Nome do Leilão:
                        </label>
                    <input type="text" id='input-name' value={reqName} onChange={handName} />
                </div>
                <div className='input-form'>
                    <label htmlFor='input-imitial-value'>
                        Valor Inicial:
                        </label>
                    <input type="number" id='input-imitial-value' value={reqInicialValue} onChange={handInitialValue} />
                </div>
                <div className='input-form'>
                    <label htmlFor='input-responsible'>
                        Responsável:
                        </label>
                    <input type="text" id='input-responsible' value={reqResponsible} onChange={handResponsible} />
                </div>
                <div className='input-form'>
                    <label htmlFor='input-used'>
                        É usado ?
                        </label>
                    <input type="text" id='input-used' value={reqUsed} onChange={handUsed} />
                </div>
                <div className='input-form'>
                    <label htmlFor='input-start-date'>
                        Data de Abertura
                        </label>
                    <input type="date" id='input-start-date' value={reqStartDate} onChange={handStartDate} />
                </div>
                <div className='input-form'>
                    <label htmlFor='input-end-date'>
                        Data de Finalização
                        </label>
                    <input type="date" id='input-end-date' value={reqEndDate} onChange={handEndDate} />
                </div>

                <div className='buttons-container'>
                    <Link to='/list' className='password button-control' > 
                        salvar
                    </Link>
                </div>
            </form>
        </div>

    );
}

export default Edit;