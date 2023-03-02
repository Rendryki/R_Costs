import styles from './SubmitButton.module.css';

function SubmitButton({text}){ // submit form button configs and assets
    // returning own button to page
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    );
}

export default SubmitButton;