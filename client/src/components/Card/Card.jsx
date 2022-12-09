import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css"

function Card({imgflag, name, continent, population, id}){
    
    return (
        <div className={styles.back}>
                <Link to={'/home/' + id}>
            <div>
                    <h3>{name}</h3>
                    <img className={styles.img} src={imgflag} alt="not found" width='250px'  height='125px' />
                    <h5>{continent}</h5>
                    <h5>Poblacion: {population} habitantes.</h5>
            </div>
                </Link>
        </div>
    );
}

export default Card;