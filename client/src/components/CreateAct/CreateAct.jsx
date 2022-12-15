import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, postActivity } from '../../actions/action.js'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import styles from "./CreateAct.module.css"

export default function CreateAct(){
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries)
    const [ errors , setErrors ] = useState({})
    const [input, setInput] = useState({
        name: '',
        dificult: '', 
        lasting: '',
        season: '',
        id: ''
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }
    function handleCheckDif(e){
        if(e.target.checked){
            setInput({
                ...input,
                dificult: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            id: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        console.log(e.target)
        console.log(input)
        if(!input.name || !input.dificult || !input.lasting || !input.season || input.id === '' ){
            alert('Completar todo para continuar')
        }  
        else{            
            dispatch(postActivity(input));
            alert('ACTIVIDAD CREADA CORRECTAMENTE 👍');
            //para volver al home
            history.push('/home')
            //reseteamos input
            setInput({
                name: '',
                dificult: '',
                lasting: '',
                season:'',
                id: ''
            })
        }
    }
    useEffect(() =>{
        dispatch(getCountries('ASC'))
    }, [dispatch])

    return (
        <div className={styles.div}>
                <Link to='/home'>
                    <button className={styles.btn}>VOLVER 🔙</button>
                </Link>
            <h1 className={styles.h1}> ➕ CREAR ACTIVIDAD ➕</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                
                    <div className={styles.div}>
                        <label>Nombre: </label>
                        <input type="text" value={input.name} name='name' onChange={handleChange} />
                        {errors.name && (<p>{errors.name}</p>)}
                    </div>
                    <div className={styles.div}>
                    <label>Dificultad: </label>
                    <label>
                    <input type="radio" value='1' name='dificult' onChange={(e) => handleCheckDif(e)}/>
                    1
                    </label>
                    <label>
                    <input type="radio" value='2' name='dificult' onChange={(e) => handleCheckDif(e)}/>
                    2
                    </label>
                    <label>
                    <input type="radio" value='3' name='dificult' onChange={(e) => handleCheckDif(e)}/>
                    3
                    </label>
                    <label>
                    <input type="radio" value='4' name='dificult' onChange={(e) => handleCheckDif(e)}/>
                    4
                    </label>
                    <label>
                    <input type="radio" value='5' name='dificult' onChange={(e) => handleCheckDif(e)}/>
                    5
                    </label>
                    </div>
                    <div className={styles.div}>
                        <label>Duracion:  </label>
                        <input type="text" value={input.lasting} name='lasting' onChange={handleChange}/>
                        {errors.lasting && (<p>{errors.lasting}</p>)}
                    </div>
                    <div className={styles.div}>
                        <label>Temporada:  </label>
                        <label>
                            <input type="radio" value='Verano' name='season' onChange={(e) => handleCheck(e)} />
                        Verano  🤽‍♀️
                        </label>
                        <label>
                            <input type="radio" value='Invierno' name='season' onChange={(e) => handleCheck(e)} />
                        Invierno ❄️
                        </label>
                        <label>
                            <input type="radio" value='Otoño' name='season' onChange={(e) => handleCheck(e)} />
                        Otoño  🍁
                        </label>
                        <label>
                            <input type="radio" value='Verano' name='season' onChange={(e) => handleCheck(e)} />
                        Primavera  🌸
                        </label>
                        {errors.season && (<p>{errors.season}</p>)}                    
                    </div>
                    <div className={styles.div}>
                        <label>Paises donde se realiza la actividad:  </label>
                        <div>
                            <select onChange={(e)=> handleSelect(e)}>
                            <option value="none">Selecciona un pais!</option>
                                {
                                    countries?.map((country) => (
                                        <option value={country.id}>{country.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {errors.id && (<p>{errors.id}</p>)}
                    </div>
                    <input type='submit' value="CREAR ACTIVIDAD" />
            </form>
        </div>
    )
}