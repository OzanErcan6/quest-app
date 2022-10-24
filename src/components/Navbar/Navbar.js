import React from "react";
import {Link} from "react-router-dom";

export default function Navbar(){
    let userId = 1
    return(
        <div>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={{pathname: '/users/' + userId}}>User</Link></li>
            </ul>
        </div>
    )
}