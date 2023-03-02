import styles from './LinkButton.module.css';
import { Link } from 'react-router-dom';

function LinkButton({to, text}){ // link button to redirect to chosen destination
    // return the page button iten
    return(
        <Link className={styles.btn} to={to}>{text}</Link>
    );
}

export default LinkButton;