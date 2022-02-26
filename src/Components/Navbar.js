import React, { useEffect } from 'react'
import { Link, useLocation,useHistory } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();
    let history=useHistory();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history.push('./Login');
    }
    // useEffect(() => {
    //     console.log(location);
    // }, [location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : " "}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/About" ? "active" : " "}`} to="/About">About</Link>
                            </li>
                           
                        </ul>
                       { !localStorage.getItem('token')?<form className="d-flex"> 
                            <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
                            <Link className="btn btn-primary" to="/SignUp" role="button">SignUp</Link>
                        </form>:<button onClick={handleLogout} className="btn btn-primary">LogOut</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
