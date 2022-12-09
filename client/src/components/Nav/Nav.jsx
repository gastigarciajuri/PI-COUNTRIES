import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../actions/action.js";
import styles from "./Nav.module.css"

export default function Nav(){
    const dispatch = useDispatch();
    const [ name, setName ] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }
    const handleClick = (event) => {
        event.preventDefault();
        //name seria el estado local
        dispatch(getByName(name));
        setName('')
    };
    return (
        <form onSubmit={(event) => handleClick(event)}>
            <div className={styles.div}>
                <input type="text" placeholder="BUSCAR PAIS..." onChange={(e) => handleInputChange(e)}/>
                <button type="submit" >BUSCAR 🔎</button>
            </div>
        </form>
    );
}