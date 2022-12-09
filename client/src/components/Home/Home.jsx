import React from "react";
import { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, oContintente, filterByActivity, getAct, ordenAlfa, filterPo}  from '../../actions/action.js'
import {Link} from 'react-router-dom'
import Card from '../Card/Card'
import Paginado from "../Paginado/Paginado"
import Nav from "../Nav/Nav";
import styles from "./Home.module.css"

function Home(){
    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.countries)
    const allActivities = useSelector((state) => state.activities)
    console.log(allActivities)
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ countryPage, setCountryPage ] = useState(9);
    const [ sortPop, setSortPop] = useState("")
    const [ order, setOrder ] = useState('');
    const lastCountry = currentPage * countryPage;
    const firstCountry = lastCountry - countryPage;
    const filteredCountries = allCountries;
    const currentCountry = filteredCountries.slice(firstCountry, lastCountry);


    const paginado = (totalPages)=>{
        setCurrentPage(totalPages);
    }

    useEffect(()=>{
        dispatch(getCountries(order));
        dispatch(getAct());
    }, [dispatch])


    function handleSortPopu(e){
        e.preventDefault();
        dispatch(filterPo(e.target.value));
        setCurrentPage(1)
        setSortPop(`Sort ${e.target.value}`)
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(ordenAlfa(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.valu}`)
    }

    function handleFilterContintent(event){
        event.preventDefault();
        dispatch(oContintente(event.target.value));
        setCurrentPage(1)
    }

    function handleFilterAct(e){
        e.preventDefault();
        e.target.value !== "All" ? dispatch(getCountries()) : 
       // dispatch(filterByActivity(e.target.value))
        filteredCountries = allCountries;
        filteredCountries.filter( e => e.activities.name === e.target.value )
        setCurrentPage(1);
    }


    return (
            <div className={styles.header}>
            <header >
                <Link to='/'>
                    <h1 className={styles.paises}></h1>
                </Link>
                <div className={styles.div}>
                    <div className={styles.act}>
                    <Link style={{textDecoration: "none", fontSize: "20px", color: "white"}} to='/activity'> 
                        CREAR ACTIVIDAD ➕
                    </Link>
                    </div>
                </div>
            <Nav/>
            </header>
            <div className={styles.div}>
            <div className={styles.div}>
                <select className={styles.select} onChange={ e => handleSortPopu(e)}>
                    <option>ORDENAR POR POBLACION</option>
                    <option value="desc">Menor a mayor ⬇️ - ⬆️</option>
                    <option value="asc">Mayor a menor ⬆️ - ⬇️</option>
                </select>
                <select className={styles.select} onChange={e=> handleSort(e)}>
                    <option>ORDENAR POR NOMBRE</option>
                    <option value="asc">Ascendente ⬇️ - ⬆️</option>
                    <option value="desc">Descendente ⬆️ - ⬇️</option>
                </select>
                <select className={styles.select} onChange={e => handleFilterContintent(e)}>
                    <option value="All">Todos</option>
                    <option value="Africa">Africa  </option>
                    <option value="North America">America del Norte</option>
                    <option value="South America">America del Sur</option>
                    <option value="Antarctica">Antartica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                </select>
                {/* <div className={styles.div}>
                <select className={styles.select} onChange={e => handleFilterAct(e)}>
                    <option className={styles.select} value="All">TODAS LAS ACTIVIDADES</option>
                    {
                            allActivities &&  allActivities.map(activity => (
                                <option value={activity.name} key={activity.id}>{activity.name}</option>
                            ))
                    }
                </select>
                </div> */}
                </div>
                <Paginado
                        countryPage={countryPage}
                        allCountries={allCountries.length}
                        paginado={paginado}
                />

                {
                <ul className={styles.p}>
                    {
                        currentCountry?.map(country => (
                            <Link to={'/home/' + country.id}>
                                <Card
                                    name={country.name} 
                                    imgflag={country.imgflag} 
                                    continent={country.continent}
                                    id={country.id}
                                    population={country.population}
                                    key={country.id}/>
                            </Link>
                        ))}
                    </ul>
                    }
                </div>
            </div>
    )
}

export default Home;