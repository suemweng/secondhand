import React, { useState } from "react";
import { Row, Col } from 'antd';
import SearchPage from "./SearchPage";
import ItemPage from "./ItemPage";
import AcctInfo from "./AcctInfo";


function Main () {

    const [acctInfo, setAcctInfo] = useState(false);
    const [itemId, setItemId] = useState(null);


    const renderContent = () => {
        if (acctInfo) {
            return <AcctInfo />;
        }

        if (itemId != null) {
            return <ItemPage />;
        }

        return <SearchPage />;
    }

    return (
        <Row className='main'>
            {renderContent()}
        </Row>
        
    )
}

export default Main;