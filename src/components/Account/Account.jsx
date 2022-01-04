import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { Button, Row, Container } from "react-bootstrap";

function account() {
    const [user, updateUser] = useState(null);
    const [authUser, setAuthUser] = useState(false);

    async function checkUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups.includes("Cert-Creators") === true) {
                setAuthUser(true);
            }
            updateUser(user);
        } catch (e) {
            console.log('error: ', e)
        }
    }

    async function setAuthListener() {
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signOut':
                    window.location.href = "/login"
                    break;
                default:
                    break;
            }
        })
    }

    useEffect(() => {
        checkUser();
        setAuthListener();
    }, [])

    return (
        <div className="account">
            {user === null ?
                <p>User info may not be loaded, please try signing in again or reloading the page.</p>
                :
                <Container className="account-details">
                    <h1>{user.attributes['custom:firstname']}'s Account Details</h1>
                    <hr/>
                    <Row md={2}>
                        <div>
                            <h2>First Name</h2>
                            <p>{user.attributes['custom:firstname']}</p>
                        </div>
                        <div>
                            <h2>Last Name</h2>
                            <p>{user.attributes['custom:lastname']}</p>
                        </div>
                        <div>
                            <h2>Email Used</h2>
                            <p>{user.attributes['email']}</p>
                        </div>
                    </Row>
                    <h3>Access and Features</h3>
                    {authUser === true ?
                        <p>This account has access to create and deploy certifcates on the blockchain.</p>
                        : <p>You do not have the ability to deploy certificates on the blockchain, please email info@innovfin.ca for more information.</p>}
                    <Button onClick={() => Auth.signOut()}>Sign Out</Button>
                </Container>
            }
        </div>
    )
}

export default account;