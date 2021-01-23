import React, { useEffect, useState, ChangeEvent, FormEvent, Component } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

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

interface obgParams {
    id: string
}
const Edit = () => {

    const [altered,setAltered] = useState<string>("");
    const [reqName, setName] = useState<string>("");
    const [reqInicialValue, setInitialValue] = useState<string>("");
    const [reqResponsible, setResponsible] = useState<string>("");
    const [reqUsed, setUsed] = useState<string>("");
    const [reqStartDate, setStartDate] = useState<string>("");
    const [reqEndDate, setEndDate] = useState<string>("");

    function handName(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function handInitialValue(event: ChangeEvent<HTMLInputElement>) {
        const initial = event.target.value;
        const final = initial
        .replace(/\D/g,"") 
        .replace(/(\d)(\d{2})$/,"$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g,"."); 
        setInitialValue(final);
    }
    function handResponsible(event: ChangeEvent<HTMLInputElement>) {
        setResponsible(event.target.value);
    }
    function handUsed(event: ChangeEvent<HTMLSelectElement>) {
        setUsed(event.target.value);
    }
    function handStartDate(event: ChangeEvent<HTMLInputElement>) {
        setStartDate(event.target.value);
    }
    function handEndDate(event: ChangeEvent<HTMLInputElement>) {
        setEndDate(event.target.value);
    }

    const params: obgParams = useParams();

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    useEffect(() => {

        api.get('auctions/' + params.id, config).then(response => {
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

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        
        const data = {
            "name":reqName,
            "initial_value": reqInicialValue,
            "used": reqUsed,
            "responsible":reqResponsible,
            "start_date":reqStartDate,
            "end_date":reqEndDate,
        }
    
        api.put('auctions/' + params.id, data , config).then(response => { 
            swal("Leilão alterado com Sucesso");
            setAltered('true');
        }).catch(response => {
            swal("Erro ao alterar leilão","Preecha os campos corretamente");
        });  

    }

    if(altered == "true"){
        return(
            <Redirect to={{pathname:'/list', state:{next: true}}} />
        );
    }
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
                    <input type="text" id='input-imitial-value' value={reqInicialValue} onChange={handInitialValue} />
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
                    <br />
                    <select className='input-used' value={reqUsed} onChange={handUsed}>
                        <option value="0">Não</option>
                        <option value="1">Sim</option>
                    </select>
                    {/* <input type="text" id='input-used' value={reqUsed} onChange={handUsed} /> */}
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
                <button type='submit' className='alter-button'>
                        Salvar
                    </button>
                    <Link to='/list' className='button-control cancel-button'>
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>

    );
}

export default Edit;