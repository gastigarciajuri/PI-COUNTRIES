import { GET_COUNTRIES, GET_COUNTRY, GET_BY_NAME, ORDER_ALFA, ORDER_CONTINTENTE, ORDER_POBLACION, GET_ACTIVITY, FILTER_ACTIVITY  } from "../actions/action";


const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    country: [],
}

export default function RootReducer(state = initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }
        case GET_BY_NAME:
                return{
                    ...state,
                    countries: action.payload
                }
        case GET_COUNTRY:
            return {
            ...state,
            country: action.payload,
            
        } 
        case 'POST_ACTIVITY':
            return{
                ...state,
            }
        case GET_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }   
        case ORDER_ALFA:
            let sortedCountries = action.payload === 'asc' ?
            state.countries.sort((a,b) => a.name.localeCompare(b.name)) :
            state.countries.sort((a,b) => b.name.localeCompare(a.name));
            return {
                ...state,
                countries: sortedCountries
            };
        case ORDER_CONTINTENTE:
            const allCountries = state.allCountries
            const continentFilter = action.payload === 'All' ?
            allCountries : allCountries.filter(country => 
                country.continent === action.payload)    
            return{
                ...state,
                countries : continentFilter
            }   
        case ORDER_POBLACION:
            let orderPop = action.payload === "desc" ?
                state.countries.sort(function (a, b) {
                    if(a.population > b.population) {
                        return 1
                    }
                    if(b.population > a.population) {
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function (a, b) {
                    if(a.population > b.population) {
                        return -1
                    }
                    if(b.population > a.population) {
                        return 1
                    }
                    return 0
                })    
                return {
                    ...state,
                    countries: orderPop
            }     
        case FILTER_ACTIVITY:
            const allCountriesAct = state.allCountries
            if(action.payload === 'All'){
                return{
                    ...state,
                    countries: allCountriesAct
                }
            } else{
                let filterCountry = []
                filterCountry = allCountriesAct.filter(country => 
                    country.activities && country.activities.map(el => el.name).includes(action.payload))
                return{
                        ...state,
                        countries: filterCountry
                    }     
            }
        default :
        return state;
    }
}