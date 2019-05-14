import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./nav.css"

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <a className="main" href="/">PartStortage </a>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-log">
                        <Link className="nav-link kal" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/inventory">Inventory</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/shipping">Shipping</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link kal" to="/"
                        onClick={() => sessionStorage.clear()}
                        >Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar