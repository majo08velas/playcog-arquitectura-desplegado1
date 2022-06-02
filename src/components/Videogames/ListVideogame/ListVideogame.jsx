import axios from "axios";
import React, { useEffect } from "react";
import { ItemVideogame } from "../ItemVideogame/ItemVideogame";
import styles from "./ListVideogame.module.css";
import logoUser from "../../../assets/user.png";
import { useParams } from "react-router-dom";
import background from './../../../assets/fondo.png';

function ListVideogame(){

    let params = useParams();
    let correo = params.correo;

    const [videogamesData, setVideogamesData] = React.useState([]);

    useEffect(()=>{
        axios({
            url: 'http://localhost:8081/mostrarJuego' 
        })
            .then(response =>{
                setVideogamesData(response.data.juegos)
                console.log(response.data.juegos)
            })
            .catch(err =>{
                console.log(err)
            })
    }, [setVideogamesData]);

    return(
        <>
            <div className={styles.container}> · JUEGOS ·</div>
            <section className={styles.videogames_section} style={{margin:200}}>
                    {videogamesData.map(item => (
                        <ItemVideogame
                            key={item.id} 
                            nombre_videojuego={item.nombre_videojuego}
                            descripcion_videojuego={item.descripcion_videojuego}
                            link={item.link}
                        />
                    ))}
                    
            </section>

            <div className="myAccount">
                <div className="container_myAccount">
                    <a href={`/myAccount/${correo}`}><img className='logoUser' src={logoUser} alt="" /></a>
                </div>
            </div>
        </>
    );
}

export { ListVideogame }