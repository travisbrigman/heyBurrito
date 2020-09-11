import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/Navbar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./HeyBurrito.css"

export const HeyBurrito = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("heyBurrito_customer")) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)
                                    


/*
export const HeyBurrito = () => (
    <>
    <h2>HeyBurrito!</h2>
    <small>your hometown burrito shop since 2001</small>
    <small><div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></small>
    </>
)
*/