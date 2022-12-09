import React from "react";
import {Link} from 'react-router-dom'

function LandingPage(){
    return (
        <div>
            <h1>WELCOME</h1>
            <Link to='/home'>
                <div>
                    <button>INGRESAR</button>
                </div>
            </Link>
        </div>
    )
}
export default LandingPage;