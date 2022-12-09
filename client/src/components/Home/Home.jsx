import React from "react";
import { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, oContintente, filterByActivity, getAct, ordenAlfa, filterPo}  from '../../actions/action.js'
import {Link} from 'react-router-dom'
import Card from '../Card/Card'
import Paginado from "../Paginado/Paginado"
import Nav from "../Nav/Nav";
import styles from "./Home.module.css"
import CardAct from "../CardAct/CardAct.jsx";
function Home(){
    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.countries)
    const allActivities = useSelector((state) => state.activities)
    console.log(allActivities)
    
    //Mientras cargan...



    const [ currentPage, setCurrentPage ] = useState(1);
    const [ countryPage, setCountryPage ] = useState(9);
    const [ sortPop, setSortPop] = useState("")
    const [ order, setOrder ] = useState('');
    const lastCountry = currentPage * countryPage;
    const firstCountry = lastCountry - countryPage;
    //divide el array por ctd necesaria..
    const currentCountry = allCountries.slice(firstCountry, lastCountry);

    const paginado = (totalPages)=>{
        setCurrentPage(totalPages);
    }

    useEffect(()=>{
        dispatch(getCountries(order));
        dispatch(getAct());
    }, [dispatch])//si algun valor cambia, se vuelve a ejecutar


    // const changeOrder = (e) =>{
    //     e.preventDefault()
    //     setOrder(e.target.value)
    // }

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
        e.target.value !== "all" ? dispatch(getCountries()) : 
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1);
    }


    return (
        <div className={styles.div}>
            <div className={styles.header}>
            <header >
                <Link to='/'>
                    <h1 className={styles.h1}>PAISES</h1>
                </Link>
                <div>
                    <Link to='/activity'> CREAR ACTIVIDAD ➕</Link>
                </div>
            <Nav/>
            </header>
        
            <div>
            <div className={styles.div}>
                <select onChange={ e => handleSortPopu(e)}>
                    <option>ORDENAR POR POBLACION</option>
                    <option value="desc">Menor a mayor ⬇️ - ⬆️</option>
                    <option value="asc">Mayor a menor ⬆️ - ⬇️</option>
                </select>
                <select onChange={e=> handleSort(e)}>
                    <option>ORDENAR POR NOMBRE</option>
                    <option value="asc">Ascendente ⬇️ - ⬆️</option>
                    <option value="desc">Descendente ⬆️ - ⬇️</option>
                </select>
                <select onChange={e => handleFilterContintent(e)}>
                    <option value="All">Todos</option>
                    <option value="Africa">Africa  </option>
                    <option value="North America">America del Norte</option>
                    <option value="South America">America del Sur</option>
                    <option value="Antarctica">Antartica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <div>
                <select>
                    <option>ACTIVIDADES</option>
                    <option value="all">TODAS</option>
                    {
                        (allActivities.length === 0)  ? <p>NO HAY ACTIVIDADES...</p> :
                        <select onChange={e => handleFilterAct(e)}>
                            <option value="none"></option>
                        {
                            allActivities.map(e => (
                                <option value={e.name} key={e.id}>{e.name}</option>
                            ))
                        }
                        </select>
                    }
                    
                {/* <ul>
                    {
                        allActivities?.map(activity => (
                                <CardAct
                                    name={activity.name} 
                                    dificult={activity.dificult} 
                                    lasting={activity.lasting}
                                    season={activity.season}
                                />
                ))}
                </ul> */}
                </select>
                </div>
                </div>
                <Paginado
                        countryPage={countryPage}
                        allCountries={allCountries.length}
                        paginado={paginado}
                />
                    {/* Se hace el map sobre el nuevo array de countries, para renderizar solo los 
            necesarios por pagina */}
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
        </div>
    )
}

export default Home;