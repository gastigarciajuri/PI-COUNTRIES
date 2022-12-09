import axios from "axios";

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';
export const ORDER_ALFA = 'ORDER_ALFA';
export const ORDER_POBLACION = 'ORDER_POBLACION';
export const ORDER_CONTINTENTE = 'ORDER_CONTINTENTE';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';
export const GET_BY_NAME = 'GET_BY_NAME';


export function getCountries(order){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/country?order=' + order)
        const response = json
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: response.data
        })
    }
}

export const getCountry = (id) => dispatch => {
    return fetch ("http://localhost:3001/country/" + id)
    .then(response => response.json())
    .then(data => {
        dispatch({
            type: 'GET_COUNTRY', 
            payload: data });
    });
};

export function getAct(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/activity");
        return dispatch({
            type: GET_ACTIVITY,
            payload: json.data
        })
    }
}

export function postActivity(payload){
    return async function(){
        try {
            console.log("form" + payload)
            let json = await axios.post('http://localhost:3001/activity', payload);
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

export function getByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/country?name=' + name);
            return dispatch({
                type: GET_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function ordenAlfa(orden){
    return{
        type: ORDER_ALFA,
        payload: orden,
    }
}

export function filterPo(payload){
    return {
        type: ORDER_POBLACION,
        payload
    }
}

export function oContintente(orden){
    return {
        type: ORDER_CONTINTENTE,
        payload: orden
    }
}

export function filterByActivity(activity){
    return {
        type: FILTER_ACTIVITY,
        payload: activity
    }
}

