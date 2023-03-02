import styles from './Home.module.css';
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton';
import Loading from '../layout/Loading';
import { useEffect, useState } from 'react';

function Home() { // home page configs, assets and content
    const [loadPage, setLoadPage] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoadPage(true);
    }, 300);
    });
    

    return (
        
        <section className={styles.home_container}>
            <h1>Bem vindo! ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            {loadPage ? <img src={savings} alt="savings imagem"/> : <Loading />}
        </section> 

    )
}

export default Home;