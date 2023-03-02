import {useEffect, useState} from 'react';
import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import Select from '../form/Select';

function ProjectForm({handleSubmit , btnText, projectData}){ // create card formulary
    const [categories, setCategories] = useState([]); // set each card category
    const [project, setProject] = useState(projectData || {}); // card project
    
    useEffect(() => { // useEffect to fetch from created databases through Json local API 
        fetch('http://localhost:5000/categories', { // fetching Json API
        method: 'GET', // get method to get the Json data
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => resp.json()) 
    .then((data) => { 
        setCategories(data); // set the data got through Json database/API
    })
    .catch((err) => console.log(err)); // catch any kind of error
    }, []);

    const submit = (e) => { // create project formulary submit
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e) { // handle inputs change from create project formulary
        setProject({...project, [e.target.name]: e.target.value});
    }

    function handleCategory(e) { // handle each card predefined category
        setProject({...project, category: {
            id: e.target.value, name: e.target.options[e.target.selectedIndex].text
        }});
    }

    // all Formulary configs and assets
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text"
            text="nome do projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}/>

            <Input type="number"
            text="orçamento do projeto" 
            name="budget" 
            placeholder="Insira o orçamento total" 
            handleOnChange={handleChange} 
            value={project.budget ? project.budget : ''}/>

            <Select name="category_id"
            text="Selecione a categoria" 
            options={categories} 
            handleOnChange={handleCategory} 
            value={project.category ? project.category.id : ''}/>

            <SubmitButton text={btnText} />
        </form>

    );
}

export default ProjectForm;