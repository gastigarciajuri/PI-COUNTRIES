const axios = require("axios");
const { Country } = require("../db");

async function loadDb() {
    try {
    {
    const url = await axios.get('https://restcountries.com/v3/all');
    const countries = url.data.map(e => {
        return {
            id: e.cca3,
            name: e.name.common,
            imgflag: e.flags[0],
            continent: e.continents[0],
            capital: e.capital != null ? e.capital[0] : "No data",
            subregion: e.subregion != null ? e.subregion : "No data",
            area: e.area,
            population: e.population,
        };
    });
    countries.forEach(async e => {
        await Country.findOrCreate({
        where: {
            id: e.id,
            name: e.name,
            imgflag: e.imgflag,
            continent: e.continent,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population,
        },
        });
    });
    }
    console.log("DB success");
} catch (error) {
    console.log(error)
}
}

module.exports = { loadDb };
