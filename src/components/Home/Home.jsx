import React, { Component } from "react";
import styles from"./Home.module.css";
import fondo from './../../assets/home.jpg';
import ludo from './../../assets/ludo.png'
import memoria from './../../assets/memoria.png'
import triki from './../../assets/triki.png'
import { withRouter } from '../../withRouter';

class Home extends Component{

    constructor(){
        super()
        this.redirectJuegoMemoria = this.redirectJuegoMemoria.bind(this);
        this.redirectJuegoTriki = this.redirectJuegoTriki.bind(this);
        this.redirectJuegoLudo = this.redirectJuegoLudo.bind(this);

    }

    redirectJuegoMemoria(){
        window.location.assign('https://arbolabc.com/juegos-de-memoria/animales-salvajes')
    }

    redirectJuegoTriki(){
        window.location.assign('https://papergames.io/es/tres-en-raya')
    }

    redirectJuegoLudo(){
        window.location.assign('https://poki.com/es/g/ludo-hero')
    }

    render(){
        return(
            <body className={styles.bodyHome}>
                <div className={styles.fondo} background={fondo}/>
                <div>
                    <div className={styles.container_cero}>
                        ¡JUEGA Y MEJORARÁS TU MEMORIA! 
                    </div>
                    <div className={styles.container} id={styles.container_uno}>
                        <div className={styles.card} id={styles.card_uno}>
                            <h1 className={styles.titulo}>· RECOMENDADO ·</h1>
                        </div>
                        <img className={styles.memoria} src={memoria} alt="" role="button" onClick={this.redirectJuegoMemoria}/>
                    </div>
                    <div className={styles.container} id={styles.container_dos}>
                        <div className={styles.card} id={styles.card_dos}>
                            <h1 className={styles.titulo}>· JUEGO DEL DÍA ·</h1>
                        </div>
                        <img className={styles.triki} src={triki} alt="" role="button" onClick={this.redirectJuegoTriki}/>
                    </div>
                    <div className={styles.container} id={styles.container_tres}>
                        <div className={styles.card} id={styles.card_tres}>
                            <h1 className={styles.titulo}>· MÁS JUGADO ·</h1>
                        </div>
                        <img className={styles.ludo} src={ludo} alt="" role="button" onClick={this.redirectJuegoLudo}/>
                    </div>
                </div>
            </body>
        )
        
    }

}

export default withRouter(Home);
