import { React, useEffect } from "react";
import { useParams } from "react-router";
import { getCountry } from "../../actions/action.js";
import { useDispatch, useSelector } from "react-redux";
import CardAct from "../CardAct/CardAct";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css"
const Detail = () => {
    const  {countryId}  = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountry(countryId));
    }, [dispatch, countryId]);

    const country = useSelector((state) => state.country);

    return (
        <div>
        <div>
            <Link to="/home/">
            <button>Volver</button>
            </Link>
        </div>
        <img src={country.imgflag}  alt={country.name} width="400px" height="250px"/>
        <div>
            <p className={styles.p}> <strong className={styles.strong}>País:</strong> {country.name} </p>
            <p className={styles.p}> <strong className={styles.strong}>Capital: </strong> {country.capital} </p>
            <p className={styles.p}> <strong className={styles.strong}>Subregión: </strong> {country.subregion} </p>
            <p className={styles.p}> <strong className={styles.strong}>Área: </strong> {country.area} km2 </p>
            <p className={styles.p}> <strong className={styles.strong}>Continente: </strong> {country.continent} </p>
            <p className={styles.p}> <strong className={styles.strong}>Población: </strong> {country.population} habitantes </p>
            <div>
            <div className={styles.act}>
                {
                country.activities &&
                country.activities.map((activity) => (
                    <CardAct
                    name={activity.name}
                    dificult={activity.dificult}
                    lasting={activity.lasting}
                    season={activity.season}
                    />
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default Detail;
