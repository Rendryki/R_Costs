import styles from '../project/ProjectCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs'; // trash icon

function ServiceCard({ id, name, cost, description, handleRemove }) { // own service card assets and configs
  const remove = (e) => { // remove when click trash button
    e.preventDefault(); 
    handleRemove(id, cost); 
  }
  // return service card itself
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> R${cost}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default ServiceCard;