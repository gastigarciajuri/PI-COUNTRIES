import React from "react";
import { Grid } from "@mui/material";
import CountryCard from "../Card/Card";

function CountryList({ allCountries }) {
  return (
    <Grid container spacing={2}>
      {allCountries.map((country) => (
        <CountryCard
          key={country.id}
          imgflag={country.imgflag}
          name={country.name}
          continent={country.continent}
          population={country.population}
          id={country.id}
        />
      ))}
    </Grid>
  );
}

export default CountryList;
