import styles from './Aboutus.module.css'

export const Aboutus = () =>{

    return(
        <div className={styles.container}>
            <h1>¡La diversión no es una opción, es saber encontrarla!</h1>
            <h2>¿Juegos Cognitivos?</h2>
            <p>Los <span>Juegos Cognitivos</span> son aquellos juegos que se basan en realizar destrezas intelectuales como:</p>
            <section className='categorys'>
                <div className="item">
                    <h3>Memoria</h3>
                </div>
                <div className="item">
                    <h3>Operaciones Básicas</h3>
                </div>
                <div className="item">
                    <h3>Lenguaje</h3>
                </div>
            </section>
            <p><span>PlayCog</span> es una plataforma que te ofrece una variedad de videojuegos cognitivos totalmente gratuita.</p>
        </div> 
    );
}