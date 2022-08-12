import React , { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { message } from 'antd';


function App() {

  const [list, setList] = useState([]);
  const [acctInfo, setAcctInfo] = useState(false);
  const [itemId, setItemId] = useState(null);

  const searchOnSuccess = (data) => {
    setList(data);
    setAcctInfo(false);
    setItemId(null);
  }


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

      <Header searchOnSuccess={searchOnSuccess}/>
      <Main 
        list={list} 
        acctInfo={acctInfo}
        itemId={itemId}
        searchOnSuccess={searchOnSuccess}/>
      <Footer />
    </div>
  );
}

export default App;
