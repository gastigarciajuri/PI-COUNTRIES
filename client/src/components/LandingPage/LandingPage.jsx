import React from "react";
import {Link} from 'react-router-dom'
import styles from "./LandingPage.module.css"

function LandingPage(){
    return (
        <div>
            <h1 className={styles.h1}>WELCOME</h1>
            <Link to='/home'>
                <div >
                    <button className={styles.btn}>INGRESAR</button>
                </div>
            </Link>
        </div>
    )
}
export default LandingPage;