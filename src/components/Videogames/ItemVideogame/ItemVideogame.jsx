import React from "react";
import styles from "./ItemVideogame.module.css";
import background from './../../../assets/fondo.png';

const ItemVideogame = (props)=>{

    return(
        <body className={styles.bodyItem} >
            <div className={styles.container_videogames}>
                <div className={styles.container_title}>
                    <h2>{props.nombre_videojuego}</h2>
                </div>
                <p>{props.descripcion_videojuego}</p>
                <a href={`${props.link}`}>¡Jugar Ahora!</a>
            </div> 
        </body>
           
    );
}

export {ItemVideogame}