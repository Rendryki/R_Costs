import styles from '../project/ProjectForm.module.css';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import { useState } from 'react';

function ServiceForm({handleSubmit, btnText, projectData}){ // create service form assets and configs
    const [service, setService] = useState ({}); // pré-defined service 

    function submit(e){ // when submit create service form
        e.preventDefault();
        projectData.services.push(service); // add service to services array
        handleSubmit(projectData); 
    }

    function handleChange(e){ // handle inputs changes
        setService({...service, [e.target.name]: e.target.value}); // set input value
    }

    // returning entire create service form
    return (
    <form onSubmit={submit} className={styles.form}>
        <Input type="text" text="Nome do serviço" name='name' placeholder='Insira o nome do serviço' handleOnChange={handleChange}/>

        <Input type="number" text="Custo do serviço" name='cost' placeholder='Insira o valor total' handleOnChange={handleChange}/>

        <Input type="text" text="Descrição do serviço" name='description' placeholder='Descreva o serviço' handleOnChange={handleChange}/>

        <SubmitButton text={btnText} />
    </form>
    )
}
export default ServiceForm;