import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { NavigationBar } from "./NavigationBar";
import { AppButton } from "./AppButton";
import { Button } from "react-bootstrap";
import { loginRequest, msalConfig } from "../authConfig";
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie'



import "../styles/PageLayout.css";

export const PageLayout = (props) => {

    const [name, setName] = useState(0);
    const [response, setResponse] = useState();
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token', 'user_role', 'user_name']);

    const { instance } = useMsal();

    useEffect(() => {
        selectAccount();
    });

    const handleLogin = () => {
        instance.loginPopup(loginRequest)
            .then(handleResponse)
            .catch((error) => console.log(error))
    }

    const handleLogout = () => {
        const logoutRequest = {
            account: instance.getAccountByUsername(cookies.auth_data.user_name),
            postLogoutRedirectUri: msalConfig.auth.redirectUri,
            mainWindowRedirectUri: msalConfig.auth.redirectUri
        };

        instance.logoutPopup(logoutRequest);
    }

    const handleResponse = (response) => {
        if (response !== null) {
            console.log(response);
            setResponse(response);
            saveToCookie(response);
        } else {
            console.log("response is null");
        }
    }

    const selectAccount = () => {
        const currentAccounts = instance.getAllAccounts();
        if (currentAccounts.length === 0) {
            return;
        } else if (currentAccounts.length > 1) {
            // Add choose account code here
            console.warn("Multiple accounts detected.");
        } else if (currentAccounts.length === 1) {
            setName(currentAccounts[0].name);
            // todo take from cookie
        }
    }

    const saveToCookie = (response) => {
        let cookie = {
            access_token: response.accessToken,
            refresh_token: response.refreshToken,
            user_name: response.account.username,
            user_role: 'admin'
        };

        setCookie('auth_data', cookie, { path: '/' });
    }

    return (
        <>
            <NavigationBar handleLogin={handleLogin} handleLogout={handleLogout} name={name} />
            <UnauthenticatedTemplate>
                <div className="unauth">
                    <br />
                    <span className="welcome"><center>OneSim Home</center></span>
                    <br />
                    <Button style={{width:"100px", marginLeft: "auto", marginRight: "auto"}} variant="primary" onClick={() => handleLogin()}>Sign in</Button>
                </div>
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>
                <br />
                <span className="welcome"><center>OneSim Home</center></span>
                <br />
                <div className="appButtons">
                    <AppButton
                        onClick={() => window.location.href = "http://10.5.0.18:8000/webios/"}
                        name="WebIOS" src="map.png"
                    />
                    <AppButton name="Updates" src="update.png" />
                    <AppButton name="Calender" src="calender.png" />
                    <AppButton name="Sites" src="sites.png" />
                    <AppButton name="Monitoring" src="monitor.png" />
                    <AppButton name="Settings" src="gear.png" />
                </div>
            </AuthenticatedTemplate>
        </>
    );
};