import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, Redirect} from 'react-router-dom'; 
import swal from 'sweetalert';

import './style.css';
import api from '../../services/api';
import Pageheader from '../../assets/components/PageHeader';

const Create = () => {
    const [created,setCreated] = useState<string>("");
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
        const final = event.target.value
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

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        const data = {
            "name":reqName,
            "initial_value": reqInicialValue,
            "used": reqUsed,
            "responsible":reqResponsible,
            "start_date":reqStartDate,
            "end_date":reqEndDate,
        }
    
        api.post('auctions', data , config).then(response => { 
            swal("Leilão cadastrado com Sucesso");
            setCreated('true');
            
        }).catch(response => {
            
            swal("Erro ao cadastrar leilão","Preecha os campos corretamente");
        });   
        
    }

    if(created == "true"){  
        return(
            <Redirect to={{pathname:'/list', state:{next: true}}} />
        );
    }
    return (
        <div id='page-create' className='container'>
            <Pageheader title='Menu' />

            <form onSubmit={handleSubmit} id='form-control'>
                <div className='input-form'>
                    <label htmlFor='input-name'>
                        Nome do Leilão:
                        </label>
                    <input type="text" id='input-name' value={reqName} onChange={handName} required />
                </div>
                <div className='input-form'>
                    <label htmlFor='input-initial-value'>
                        Valor Inicial:
                        </label> 
                    <input type="text" id='input-initial-value' value={reqInicialValue} onChange={handInitialValue} required placeholder='999.999,30'/>
                </div>
                <div className='input-form'>
                    <label htmlFor='input-responsible'>
                        Responsável:
                        </label>
                    <input type="text" id='input-responsible' value={reqResponsible} onChange={handResponsible} required />
                </div>
                <div className='input-form'>
                    <label htmlFor='input-used'>
                        É usado ?
                    </label>
                    <br />
                    <select className='input-used'  value={reqUsed} onChange={handUsed} required>
                        <option selected >Selecione</option> 
                        <option value="0">Não</option> 
                        <option value="1">Sim</option> 
                    </select>
                </div>
                <div className='input-form'>
                    <label htmlFor='input-start-date'>
                        Data de Abertura
                        </label>
                    <input type="date" id='input-start-date' value={reqStartDate} onChange={handStartDate} required/>
                </div>
                <div className='input-form'>
                    <label htmlFor='input-end-date'>
                        Data de Finalização
                        </label>
                    <input type="date" id='input-end-date' value={reqEndDate} onChange={handEndDate} required/>
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

export default Create;