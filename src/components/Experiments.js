import react from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './experiments.css';
const Experiments = () =>{
    return(
        <section>
             <div class="container">
        <h1>Experiments</h1>
        <ul class="experiment-list">
            <li><a href="/exp1">Experiment 1: Load Test on 3-phase Squirrel Cage Induction 
                Motor </a></li>
            <li><a href="exp2">Experiment 2: Slip Test on 3-phase Salient Pole Synchronous Machine</a></li>
            <li><a href="exp3">Experiment 3: Voltage Regulation of 3-phase Alternator  </a></li>
            <li><a href="exp4">Experiment 4:Induction Machine as Generator & Motor </a></li>
            <li><a href="exp5">Experiment 5:No-load & Blocked-rotor Tests on 3-phase Squirrel  Cage Induction Motor </a></li>
             </ul>
    </div>
        </section>
    )
}

export default Experiments;