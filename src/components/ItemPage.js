import React from "react";


function ItemPage ({itemId}) {


    return (
        <div style={{fontSize:50, width:'100%', textAlign:'center'}}> {`Item Page - Item ${itemId}`}</div>
    )
}

export default ItemPage;