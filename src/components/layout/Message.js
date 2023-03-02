import styles from './Message.module.css';
import { useState, useEffect } from 'react';

function Message({type, msg}){ // success or error message when creating card
    const [visible, setVisible] = useState(false); // seting message visibility to none

    useEffect(() => { // useEffect to render only in specific moments or events
        if(!msg){ // msg exists?
            setVisible(false); // if not, set message visibility to false
            return;
        }
        setVisible(true); // if yes, set message visibility to true
        const timer = setTimeout(() => { // only allow visibility true for a few seconds
            setVisible(false); // redefining message visibility to false after showing the message for a little while
        }, 3000); // 3 seconds timer
        return () => clearTimeout(timer) // return the timer reseted after showind and hidding message
    }, [msg]);
    // return the alert in the page 
    return(
        <>{visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}</>
    );
}

export default Message;