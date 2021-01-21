import React, { useEffect, useState, ChangeEvent, FormEvent, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import corteLogo from '../../assets/images/fullstackchallenge.png';
// import './style.css';
import api from '../../services/api';
import Pageheader from '../../assets/components/PageHeader';

const currencyConfig = {
    locale: "pt-BR",
    formats: {
        number: {
            BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        },
    },
};

async function handleSubmit(event: FormEvent) {
    event.preventDefault();
}

const Login = () => {
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
                    <Link to='/list' className='password button-control'>
                        salvar
                        </Link>
                </div>
            </form>
        </div>

    );
}

export default Login;