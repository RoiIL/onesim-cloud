import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Navbar, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie'
import "../styles/NavigationBar.css";

export const NavigationBar = (props) => {

    return (
        <>
            <Navbar variant="dark" className="login-logout">
                <a className="navbar-brand" href="/">OneSim Home</a>
                <AuthenticatedTemplate>
                    <div className="ml-auto logout">
                        <a className="navbar-brand" href="/">Hello, {props.name}</a>
                        <Button variant="primary" onClick={props.handleLogout}>Sign out</Button>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <Button variant="primary" onClick={props.handleLogin}>Sign in</Button>
                </UnauthenticatedTemplate>
            </Navbar>
        </>
    );
};