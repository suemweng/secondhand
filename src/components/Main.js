import React from "react";
import SearchPage from "./SearchPage";
import ItemPage from "./ItemPage";
import AcctInfo from "./AcctInfo";


function Main () {

    const renderContent = () => {
        return <AcctInfo />;
    }

    return (
        renderContent()
    )
}

export default Main;