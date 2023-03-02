import styles from './Footer.module.css';
import {memo} from 'react';
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';

function Footer(){ // all footer page configs, assets and content
    // returning the own footer to the page
    return (
        <footer className={styles.Footer}>
            <ul className={styles.social_list}>
                <li><FaFacebook/></li>
                <li><FaInstagram/></li>
                <li><FaLinkedin/></li>
            </ul>
            <p className={styles.copy_right}><span>Costs</span> &copy; 2023</p>
        </footer>
    );
}

export default memo(Footer);