// @flow
import * as React from 'react';
import { useCookies } from 'react-cookie';
import { Link,useLocation } from 'react-router-dom';
export function AuthLinks() {
   
    if (localStorage.getItem("myjwt")) {
        return <li className="nav-item " >
            <Link to="/logout">
                <button className="btn btn-primary mx-2 btn-sm">logout</button>
            </Link>

        </li>
    }
    else {

        return (

            <li className="nav-item " >

                <Link to="/signup">
                    <button className="btn btn-primary mx-2 btn-sm">SignUp</button>
                </Link>

                <Link to="/login">
                    <button className="btn btn-primary mx-2 btn-sm">Login </button>
                </Link>




            </li>
        );
    }
};