import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, oContintente, filterByActivity, getAct, ordenAlfa, filterPo } from '../../actions/action.js';
import { Link as RouterLink } from "react-router-dom";
import CountryList from "../CountryList/CountryList.jsx";
import Paginado from "../Paginado/Paginado.jsx"
import Nav from "../Nav/Nav";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPage] = useState(9);
  const [sortPop, setSortPop] = useState("");
  const [order, setOrder] = useState('');
  const [filterContinent, setFilterContinent] = useState("All");
  const [filterActivity, setFilterActivity] = useState("All");

  useEffect(() => {
    dispatch(getCountries(order));
    dispatch(getAct());
  }, [dispatch, order]);

  function getCurrentPageItems() {
    const lastCountry = currentPage * countryPage;
    const firstCountry = lastCountry - countryPage;
    let filteredCountries = allCountries;

    // Aplicar filtros
    if (filterContinent !== "All") {
      filteredCountries = filteredCountries.filter(
        (country) => country.continent === filterContinent
      );
    }

    if (filterActivity !== "All") {
      filteredCountries = filteredCountries.filter((country) =>
        country.activities.some((activity) => activity.name === filterActivity)
      );
    }

    // Ordenar por población
    if (sortPop === "desc") {
      filteredCountries.sort((a, b) => b.population - a.population);
    } else if (sortPop === "asc") {
      filteredCountries.sort((a, b) => a.population - b.population);
    }

    return filteredCountries.slice(firstCountry, lastCountry);
  }

  function paginado(totalPages) {
    setCurrentPage(totalPages);
  }

  function handleSortPopu(e) {
    e.preventDefault();
    dispatch(filterPo(e.target.value));
    setCurrentPage(1);
    setSortPop(`Sort ${e.target.value}`);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(ordenAlfa(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterContintent(event) {
    event.preventDefault();
    dispatch(oContintente(event.target.value));
    setCurrentPage(1);
    setFilterContinent(event.target.value);
  }

  function handleFilterAct(e) {
    e.preventDefault();
    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1);
    setFilterActivity(e.target.value);
  }

  const currentCountry = getCurrentPageItems();

  return (
    <div className={styles.header}>
      <header>
        <div className={styles.div}>
          <div className={styles.act}>
            <RouterLink style={{ textDecoration: "none", fontSize: "20px", color: "white" }} to='/activity'>
              CREAR ACTIVIDAD ➕
            </RouterLink>
          </div>
        </div>
        <Nav />
      </header>
      <div className={styles.div}>
        <div className={styles.div}>
          <select className={styles.select} onChange={(e) => handleSortPopu(e)}>
            <option>ORDENAR POR POBLACION</option>
            <option value="desc">Menor a mayor ⬇️ - ⬆️</option>
            <option value="asc">Mayor a menor ⬆️ - ⬇️</option>
          </select>
          <select className={styles.select} onChange={(e) => handleSort(e)}>
            <option>ORDENAR POR NOMBRE</option>
            <option value="asc">Ascendente ⬇️ - ⬆️</option>
            <option value="desc">Descendente ⬆️ - ⬇️</option>
          </select>
          <select className={styles.select} onChange={(e) => handleFilterContintent(e)}>
            <option value="All">Todos</option>
            <option value="Africa">Africa</option>
            <option value="North America">America del Norte</option>
            <option value="South America">America del Sur</option>
            <option value="Antarctica">Antartica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceania</option>
          </select>
          <div className={styles.div}>
            <select className={styles.select} onChange={(e) => handleFilterAct(e)}>
              <option className={styles.select} value="All">TODAS LAS ACTIVIDADES</option>
              {allActivities &&
                allActivities.map((activity) => (
                  <option value={activity.name} key={activity.id}>
                    {activity.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <Paginado
          countryPage={countryPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />

        <CountryList allCountries={currentCountry} />
      </div>
    </div>
  );
}

export default Home;
