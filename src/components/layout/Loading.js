import styles from './Loading.module.css';
import loading from '../../img/loading.svg';
function Loading(){ // loading item configs and assets
    // returning own loading svg item to page
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="loading" />
        </div>
    )
}

export default Loading;