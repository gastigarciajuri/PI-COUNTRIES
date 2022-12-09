import React from 'react';
import styles from "./CardAct.module.css"


const Card = (activity) => {

    return (
        <div>
            {activity && (
            <div>    
            <p className={styles.p}><strong>Actividad: </strong>{activity.name}</p>
            <p className={styles.p} ><strong>Dificultad: </strong>{activity.dificult}</p>
            <p className={styles.p} ><strong>Duracion: </strong>{activity.lasting}</p>
            <p className={styles.p} ><strong>Temporada: </strong>{activity.season}</p>
            </div>
            )}            
        </div>
    );
};

export default Card;