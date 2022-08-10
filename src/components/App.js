import React , { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';


function App() {

  const [list, setList] = useState([]);

  const searchOnSuccess = (data) => {
    setList(data);
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

      <Header />
      <Main list={list} searchOnSuccess={searchOnSuccess}/>
      <Footer />
    </div>
  );
}

export default App;
