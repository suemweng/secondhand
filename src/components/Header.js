import React, { useState, useEffect } from 'react';
import logo2 from '../assets/images/logo2.png';
import { Button, Form, Input, message, Modal } from 'antd';
import Login from './Login';
import Register from './Register';
import { getAllItems, searchItemsByName } from "../utils";

const { Search } = Input;

function Header ({searchOnSuccess, acctInfoSelected}) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // DidMount to getAllItems
    useEffect( () => {
        const authToken = localStorage.getItem("authToken");
        if (authToken !== null) {
            setLoggedIn(true);
        } 
    }, []);

    const signinOnSuccess = (token) => {
        localStorage.setItem("authToken", token);
        setLoggedIn(true);
    }

    const signoutOnClick = () => {
        localStorage.removeItem("authToken");
        setLoggedIn(false);
        getHomePage();
    }

    const acctInfoOnClick = () => {
        acctInfoSelected();
    }

    const getHomePage = async() => {
        try {
            const resp = await getAllItems();
            //const resp = getAllItems();
            searchOnSuccess(resp);
    
          } catch (error) {
            message.error(error.message);
          } 
    }

    const onSearch = async (value) => {

        try {
            //const resp = await searchItemsByName(value);
            const resp = await searchItemsByName(value);
            searchOnSuccess(resp);
            setInputValue('');
            message.info(`Search Key: ${value}`);
            console.log(`Search Key: ${resp}`);
          } catch (error) {
            message.error(error.message);
          }
    }


    return (
        <header className="App-header">
            
            <img src={logo2} className="App-logo" alt="logo" />
            <p className="title" onClick={getHomePage} style={{cursor: 'pointer'}}>
                Second Hand
            </p>
            {/* <div style={{width: '70%'}}></div> */}
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{width: 700, margin: 100}}
            />

                {
                loggedIn ?
                <div>
                    <Button shape="round" type="primary" style={{margin: '10px'}} onClick={acctInfoOnClick}>
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