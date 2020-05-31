import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/Main';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <div>
        {/* App Component Has a Child Component called Main*/}
        <Main/>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
