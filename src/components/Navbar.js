import React from 'react';
import { Link } from 'react-router-dom'
import "./css/navbar.scss";
// import "./css/materialize.min.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
    return (
        
        <nav className="nav-wrapper py-3">
            <div className="container">
                <Link to="/" className="brand-logo text-light">M2E</Link>

                <ul className="float-right">
                    <li className="mr-4"><Link to="/">Shop</Link></li>
                    <li><Link to="/cart">My cart <FontAwesomeIcon icon={faShoppingCart} /></Link></li>
                    {/* <li><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link></li> */}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;