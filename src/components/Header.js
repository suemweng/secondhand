import React, { useState } from 'react';
import logo from '../assets/images/logo.svg';
import { Button, Form, Input, message, Modal } from 'antd';
import Login from './Login';
import Register from './Register';

const { Search } = Input;

function Header () {

    const [loggedIn, setLoggedIn] = useState(false);

    const signinOnSuccess = () => {
        setLoggedIn(true);
    }

    const signoutOnClick = () => {
        setLoggedIn(false);
    }

    return (
        <header className="App-header">
            
            <img src={logo} className="App-logo" alt="logo" />
            <p className="title">
                Second Hand
            </p>
            {/* <div style={{width: '70%'}}></div> */}
            <Search
                placeholder="input search text"
                onSearch={null}
                style={{width: 800, margin: 200}}
            />

                {
                loggedIn ?
                <div>
                    <Button shape="round" type="primary" style={{margin: '10px'}} onClick={null}>
                        My Account</Button> 
                        <Button shape="round" type="primary" style={{margin: '15px'}} onClick={signoutOnClick}>
                        Logout</Button> 
                </div> :
                (
                    <>
                        <Login onSuccess={signinOnSuccess} />
                        <Register />
                    </>
                )
                } 
            

        </header>
    );
    
}
export default Header;