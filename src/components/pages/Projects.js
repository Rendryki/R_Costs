import Message from "../layout/Message";
import { useLocation } from 'react-router-dom';
import Container from '../layout/Container';
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import styles from './Projects.module.css';
import { useState, useEffect } from "react";

function Projects() { 
    const [projects, setProjects] = useState([]); // each project
    const [removeloading, setRemoveloading] = useState (false); // loading item
    const [projectmessage, setProjectmessage] = useState (''); // deleting project success message
    const location = useLocation(); // location react router
    let message = ''; // pre-defined message before location.state exists
    if(location.state){ // location state exists ?
        message = location.state.message; // set message as localtion state 
    }

    useEffect(() => { // useEffect to render fetch only in specific moments or changes
        setTimeout(() => {
            fetch('http://localhost:5000/projects', { // fetch all local API data
            method: 'GET', // get all data through GET method
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then((resp) => resp.json()) // response
            .then((data) => {
                setProjects(data); // set project infos and data
                setRemoveloading(true);
            })
            .catch((err) => console.log(err)); // catch fetch error
        }, 1000); // 1sec timeout
    }, []);

    function removeProject(id){ // removing the project card from database
        fetch(`http://localhost:5000/projects/${id}`, { // fetching database
            method: 'DELETE', // removing project card from database through DELETE method
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id)); // getting the project id and removing it from projects array in database
            setProjectmessage('Projeto removido com sucesso'); // success message
        })
        .catch((err) => console.log(err)); // catch any kind of error
    }

    // return all "projects" screen content
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message} />}
            {projectmessage && <Message type="success" msg={projectmessage} />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => (
                    <ProjectCard name={project.name} 
                    id={project.id} 
                    budget={project.budget} 
                    category={project.category.name} 
                    key={project.id}
                    handleRemove={removeProject}/>
                ))}
                {!removeloading && <Loading />}
                {removeloading && projects.length === 0 && <p>Nenhum projeto cadastrado</p>}
            </Container>
        </div>
    );
}

export default Projects;