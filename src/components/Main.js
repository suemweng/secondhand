import React, { useState } from "react";
import { Row, Col } from 'antd';
import SearchPage from "./SearchPage";
import ItemPage from "./ItemPage";
import AcctInfo from "./AcctInfo";


function Main ({list, acctInfo, itemInfo, searchOnSuccess, itemSelected}) {

    const renderContent = () => {
        if (acctInfo) {
            return <AcctInfo />;
        }

        if (itemInfo != null) {
            return <ItemPage itemInfo={itemInfo}/>;
        }

        return <SearchPage list={list} onSuccess={searchOnSuccess} itemSelected={itemSelected}/>;
    }

    console.log(`main list: ${list}`);
    return (
        <Row className='main'>
            {renderContent()}
        </Row>
        
    )
}

export default Main;