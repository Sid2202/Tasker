import {useReducer, useContext} from 'react';
import Column from './Column';
import { ColContext } from './ColContext';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardEdit from './CardEdit';
import Home from './Home';


function App() {
 
  const [columns, dispatch] = useContext(ColContext);

  return (
    <Router>
          <Routes>
              <Route exact path="/" element={<Home/>} />
            <Route path="/edit/:columnId/:cardId" element={<CardEdit />} />
          </Routes>
    </Router>
  );
}

export default App;
