import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';

function ProjectCard({id, name, budget, category, handleRemove}){ // each card assets
    const remove = (e) => { // remove project when clicked on remove button
        e.preventDefault();
        handleRemove(id);
    }
    // return all project cards configs and assets
    return (
        <div className={styles.project_card}>
            <h4>{`${name.toUpperCase()}`}</h4>
            <p>
                <span>Orçamanto:</span> R${budget},00
            </p>
            <p className={styles.category_text}> 
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;