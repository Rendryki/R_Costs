import styles from './Project.module.css';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../services/ServiceForm';
import ServiceCard from '../services/ServiceCard';

function Project(){ // edit project page
    let {id} = useParams(); // react router id 
    const [project, setProject] = useState([]); // pré-defined project itself
    const [showprojectform, setShowprojectform] = useState(false); // button edit project
    const [showserviceform, setShowserviceform] = useState(false); // button edit project
    const [services, setService] = useState ([]); // pré-defined service itself
    const [message, setMessage] = useState(''); // pré-defined message itself
    const [type, setType] = useState('success'); // message type

    useEffect(() => { 
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, { // fetching the project data to be eddited
            method: 'GET', // getting the project data through GET method from database
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data); // setting the data that was got from database in the edit project screen/form
            setService(data.services);
        })
        .catch((err) => console.log(err)); // catch any kind of error
        }, 500); // half second timeout
    });

    function editPost(project){ // edit project button
        setMessage(''); // pré-defined message to prevent error
        if(project.budget < project.cost){ // if cost more expensive than project budget show error
            setMessage('O orçamento não pode ser menor que o custo do projeto'); // message if true
            setType('error'); // message type if true
            return false;
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', // change only used data
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project) // stringfy data to Json API
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data); // set project att
            setShowprojectform(!showprojectform); // show or hide att project form
            setMessage('Projeto atualizado'); //att project message
            setType('success'); // att project success type
        })
        .catch((err) => console.log(err)); // catch any kind of error
    }

    function createService(project){ // create service inside project
        setMessage(''); // pré-defined message to prevent error
        const lastService = project.services[project.services.length -1]; // get last service created
        lastService.id = uuidv4(); // create unique ID to service
        const lastServiceCost = lastService.cost; // setting the cost of last service created
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost); // all services costs/ entire project used cost
        if(newCost > parseFloat(project.budget)){ // verifying if new cost is more expensive than the entire project budget
            setMessage('Orçamento ultrapassado, verifique o valor do serviço'); // alert message if true
            setType('error'); // type message if true
            project.services.pop(); // delete service more expensive than budget 
            return false; 
        }
        project.cost = newCost; // setting the new cost of the project
        fetch(`http://localhost:5000/projects/${project.id}`, { // only att the used data
            method: 'PATCH', 
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project) // stringfy to Json API
        }).then((resp) => resp.json())
        .then((data) => {
            setShowserviceform(false); // hide new service form after successfully creating a new service
        }).catch((err) => console.log(err)); // catch any kind of error
    }

    function removeService(id, cost){ // remove service when click remove button
        const servicesUpdated = project.services.filter( // filter service to be removed
            (service) => service.id !== id // get the service id
        );
        setMessage(''); // pré-defined message to prevent error
        const projectUpdated = project; // set project with actual services 
        projectUpdated.services = servicesUpdated; // set services to the last update
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost); // parsing cost to work with only one type of data
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, { // fetching project updated
            method: 'PATCH', // change only used/worked with data
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated) // stringfy to save the actual project with all updates
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated); // set project update
            setService(servicesUpdated); // set service update
            setMessage('Serviço removido com sucesso'); // success message after removing service
            setType('success'); // set type of message as success
        })
        .catch((err) => console.log(err)); // catch any kind of error
    }

    function toggleProjectForm(){ // showing formated project in edit page
        setShowprojectform(!showprojectform); // change button if project show or hide
    }

    function toggleServiceForm(){ // showing formated project in edit page
        setShowserviceform(!showserviceform); // change button if project show or hide
    }
    // returning entire project edit page
    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showprojectform ? 'Editar projeto' : 'Fechar'}</button>
                            {!showprojectform ? (
                                <div className={styles.project_info}>
                                    <p><span>Categoria:</span>{project.category.name}</p>
                                    <p><span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p><span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : ( <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost}
                                    btnText="Concluir Edição"
                                    projectData={project}/>
                                </div> 
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adcione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>{!showserviceform ? 'Adcionar serviço' : 'Fechar'}</button>
                            <div className={styles.project_info}>
                                {showserviceform && (
                                    <ServiceForm handleSubmit={createService} 
                                    btnText="Adcionar serviço"
                                    projectData={project}/>
                                )}
                            </div>
                        </div>
                        <h2>serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard id={service.id}
                                    name={service.name} 
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService} />
                                ))}
                             {services.length === 0 && <p>Não há serviços cadastrados</p>}  
                        </Container >
                    </Container>
                </div>
            ):(
                <Loading />
            )}
        </>
    )
}

export default Project;