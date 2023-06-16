import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  oContintente,
  filterByActivity,
  getAct,
  ordenAlfa,
  filterPo,
} from "../../actions/action.js";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import CountryList from "../CountryList/CountryList.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import Nav from "../Nav/Nav";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  div: {
    marginBottom: theme.spacing(2),
  },
  select: {
    marginRight: theme.spacing(2),
    background: "#224870",
    color: "#000000",
  },
  createLink: {
    textDecoration: "none",
    fontSize: "20px",
    color: "black",
  },
}));

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  const [currentPage, setCurrentPage] = useState(1);
  // const [countryPage] = useState(9);
  const [sortPop, setSortPop] = useState("");
  const [order, setOrder] = useState("");
  const [filterContinent, setFilterContinent] = useState("All");
  const [filterActivity, setFilterActivity] = useState("All");

  useEffect(() => {
    dispatch(getCountries(order));
    dispatch(getAct());
  }, [dispatch, order]);


  function getCurrentPageItems() {
    // const totalPages = Math.ceil(allCountries.length / (currentPage === 1 ? 9 : 10));
    const lastCountryIndex = currentPage * (currentPage === 1 ? 9 : 10);
    const firstCountryIndex = lastCountryIndex - (currentPage === 1 ? 9 : 10);
    
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

    return filteredCountries.slice(firstCountryIndex, lastCountryIndex);
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
    <div>

        <Nav />


      <Grid container justify="center" className={classes.div}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined" className={classes.select}>
            <InputLabel>ORDENAR POR POBLACION</InputLabel>
            <Select
              value={sortPop}
              onChange={handleSortPopu}
              label="ORDENAR POR POBLACION"
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value="desc">Menor a mayor ⬇️ - ⬆️</MenuItem>
              <MenuItem value="asc">Mayor a menor ⬆️ - ⬇️</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined" className={classes.select}>
            <InputLabel>ORDENAR POR NOMBRE</InputLabel>
            <Select
              value={order}
              onChange={handleSort}
              label="ORDENAR POR NOMBRE"
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value="asc">Ascendente ⬇️ - ⬆️</MenuItem>
              <MenuItem value="desc">Descendente ⬆️ - ⬇️</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined" className={classes.select}>
            <InputLabel>TODOS LOS CONTINENTES</InputLabel>
            <Select
              value={filterContinent}
              onChange={handleFilterContintent}
              label="TODOS LOS CONTINENTES"
            >
              <MenuItem value="All">Todos</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
              <MenuItem value="North America">America del Norte</MenuItem>
              <MenuItem value="South America">America del Sur</MenuItem>
              <MenuItem value="Antarctica">Antartica</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Europe">Europa</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined" className={classes.select}>
            <InputLabel>TODAS LAS ACTIVIDADES</InputLabel>
            <Select
              value={filterActivity}
              onChange={handleFilterAct}
              label="TODAS LAS ACTIVIDADES"
            >
              <MenuItem value="All">Todas las actividades</MenuItem>
              {allActivities &&
                allActivities.map((activity) => (
                  <MenuItem value={activity.name} key={activity.id}>
                    {activity.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Paginado
        countryPage={currentPage === 1 ? 9 : 10}
        allCountries={allCountries.length}
        paginado={paginado}
        currentPage={currentPage}
      />

      <CountryList allCountries={currentCountry} />
    </div>
  );
}

export default Home;
