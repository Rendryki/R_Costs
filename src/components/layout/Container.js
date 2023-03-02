import styles from './Container.module.css';

function Container(props){ // all application contents and itens container/wrapper (also the entire page content parent element)
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>  
    );
}

export default Container;