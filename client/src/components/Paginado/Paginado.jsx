import React from 'react'
import styles from './paginado.module.css'

export default function Paginado({countryPage, allCountries, paginado}) {

    const pageNumbers = [];

        for (let i = 0; i <= Math.ceil(allCountries / countryPage); i++) {
            pageNumbers.push(i);
        }    
    return (
        <nav>
            <ul className={styles.paginado}>
                {
                    pageNumbers && 
                        pageNumbers.map( number => (
                        <li className={styles.number} key={number}>
                            <a className={styles.a} onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
