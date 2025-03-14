import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router,Route,Routes } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Experiment from './components/Experiments';
import Exp1 from './components/experiment/Exp1';
import Exp2 from './components/experiment/Exp2';
import Exp3 from './components/experiment/Exp3';
import Exp4 from './components/experiment/Exp4';
import Exp5 from './components/experiment/Exp5';
import MathSolver from './components/MathSolver';


function App() {
  return (
    <Router>
    <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/experiments' element={<Experiment/>}/>
      <Route path='/exp1' element={<Exp1/>}/>
      <Route path='/exp2' element={<Exp2/>}/>
      <Route path='/exp3' element={<Exp3/>}/>
      <Route path='/exp4' element={<Exp4/>}/>
      <Route path='/exp5' element={<Exp5/>}/>
      <Route path='/mathssolver' element={<MathSolver/>}/>

    </Routes>
    </Router>
  );
}

export default App;
