import React, { useState } from "react";
import { Row, Col } from 'antd';
import SearchPage from "./SearchPage";
import ItemPage from "./ItemPage";
import AcctInfo from "./AcctInfo";


function Main ({list, acctInfo, itemId, searchOnSuccess}) {

    const renderContent = () => {
        if (acctInfo) {
            return <AcctInfo />;
        }

        if (itemId != null) {
            return <ItemPage />;
        }

        return <SearchPage list={list} onSuccess={searchOnSuccess}/>;
    }

    return (
        <Row className='main'>
            {renderContent()}
        </Row>
        
    )
}

export default Main;