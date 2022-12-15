import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css"

function Card({imgflag, name, continent, population, id}){
    
    return (
        <div className={styles.card}>
                <Link to={'/home/' + id}>
            <div>
                    <h3 style={{textDecoration: "none"}} className={styles.text}>{name}</h3>
                    <img style={{textDecoration: "none"}} className={styles.countryImage} src={imgflag} alt="not found" width='250px'  height='125px' />
                    <h5 style={{textDecoration: "none"}} className={styles.text}>Continente: {continent}</h5>
                    <h5 style={{textDecoration: "none"}} className={styles.text}>Poblacion: {population} habitantes.</h5>
            </div>
                </Link>
        </div>
    );
}

export default Card;