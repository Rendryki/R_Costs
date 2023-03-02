import { useNavigate } from 'react-router-dom';
import styles from './NewProject.module.css';
import ProjectForm from '../project/ProjectForm';

function NewProject(){ // create new project page

    const navigate = useNavigate(); // useNavigate hook

    function createPost(project){ // create project sending data to Json local API

        project.cost = 0; // pré-defined cost as R$00,00
        project.services = []; // pré-defined services as empty array

        fetch('http://localhost:5000/projects', { // fetching local database through Json API
            method: 'POST', // sending the created cards data to Json API through POST method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project) // stringfying the created cards data to the Json API
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate('/projects', {state: {message: 'projeto criado com sucesso!'}}); // success message
        })
        .catch(err => console.log(err)); // catch any kind of error
    }
    // return create project form structure
    return (
        <div className={styles.new_project_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adcionar os serviços</p>
            <ProjectForm handleSubmit={createPost} 
            btnText="Criar Projeto" />
            </div>
    );
}

export default NewProject;