import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">HeyBurrito!</Link>
            </li>
        </ul>
    )
}