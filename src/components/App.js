import React , { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { message } from 'antd';
import { getAllItems } from "../utils";


function App() {

  
  const [list, setList] = useState([]);
  const [acctInfo, setAcctInfo] = useState(false);
  const [itemInfo, setItemInfo] = useState(null);

  

  const searchOnSuccess = (data) => {
    setList(data);
    setAcctInfo(false);
    setItemInfo(null);

    console.log(`App data: ${data}`);
  }

  const acctInfoSelected = () => {
    setAcctInfo(true);
  }

  const itemSelected = (itemId) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken === null) {
      message.error('Please log in');
    } else {
      const itemData = list.filter((item) => item.product_id === itemId);
      setItemInfo(itemData[0]);
      //alert(`itemId received: ${itemData[0].product_id}`);
    }

  }

  // DidMount to getAllItems
  useEffect( () =>{
    async function fetchData(){
   // setLoading(true);

    try {
      const resp = await getAllItems();
      //const resp = getAllItems();
      searchOnSuccess(resp);
      

    } catch (error) {
      message.error(error.message);
    } finally {
     // setLoading(false);
    }
  }
  fetchData();
  },[]);


  console.log(`App list: ${list}`);
  return (
    <div className="App">


      {       // react default

      /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <Header searchOnSuccess={searchOnSuccess} acctInfoSelected={acctInfoSelected}/>
      <Main 
        list={list} 
        acctInfo={acctInfo}
        itemInfo={itemInfo}
        searchOnSuccess={searchOnSuccess}
        itemSelected={itemSelected}/>
      <Footer />
    </div>
  );
}

export default App;
