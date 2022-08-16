import React, { useState } from 'react';
import logo2 from '../assets/images/logo2.png';
import { Button, Form, Input, message, Modal } from 'antd';
import Login from './Login';
import Register from './Register';
import { getAllItems } from "../utils";

const { Search } = Input;

function Header ({searchOnSuccess, acctInfoSelected}) {

    const [loggedIn, setLoggedIn] = useState(false);

    const signinOnSuccess = () => {
        setLoggedIn(true);
    }

    const signoutOnClick = () => {
        setLoggedIn(false);
        getHomePage();
    }

    const acctInfoOnClick = () => {
        acctInfoSelected();
    }

    const getHomePage = () => {
        try {
            //const resp = await getAllItems();
            const resp = getAllItems();
            searchOnSuccess(resp);
            // searchOnSuccess(dataAll);
    
          } catch (error) {
            message.error(error.message);
          } 
    }

    const onSearch = async (value) => {

        // searchItemsByName(value)
        //     .then((data) => {
        //         onSuccess(data);
        //     })
        //     .catch((err) => {
        //         message.error(err.message);
        //     })

        try {
            //const resp = await searchItemsByName(value);
            // searchOnSuccess(resp);
            message.info(`Search Key: ${value}`);
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