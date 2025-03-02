import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InductionMachineCalculator = () => {
  const [V, setV] = useState("");
  const [I, setI] = useState("");
  const [W1, setW1] = useState("");
  const [W2, setW2] = useState("");
  const [N, setN] = useState("");
  const [S1, setS1] = useState("");
  const [S2, setS2] = useState("");
  const [results, setResults] = useState(null);

  const calculateSample = () => {
    const R = 0.135; // Radius of brake drum in meters
    const Ns = 1500; // Synchronous speed in rpm

    const inputPower = parseFloat(W1) + parseFloat(W2);
    const cosPhi1 = Math.cos(Math.atan((Math.sqrt(3) * (parseFloat(W1) - parseFloat(W2)) / (parseFloat(W1) + parseFloat(W2)))));
    const slip = ((Ns - parseFloat(N)) / Ns) * 100;
    const torque = R * (parseFloat(S1) - parseFloat(S2)) * 9.81;
    const outputPower = (2 * Math.PI * parseFloat(N) * torque) / 60;
    const efficiency = (outputPower / inputPower) * 100;

    // Additional kVAR and Capacitance Calculation
    const cosPhi2 = 0.95;
    const tanPhi1 = Math.tan(Math.acos(cosPhi1));
    const tanPhi2 = Math.tan(Math.acos(cosPhi2));
    const additionalKVAR = (inputPower * (tanPhi1 - tanPhi2)) / 1000;
    const f = 50; // Frequency in Hz
    const C = (additionalKVAR * 1000) / (3 * Math.pow(2 * Math.PI * f * parseFloat(V), 2)) * 1e6;

    setResults({
      V,
      I,
      W1,
      W2,
      N,
      S1,
      S2,
      R,
      Ns,
      inputPower: inputPower.toFixed(2),
      cosPhi1: cosPhi1.toFixed(4),
      slip: slip.toFixed(2),
      torque: torque.toFixed(2),
      outputPower: outputPower.toFixed(2),
      efficiency: efficiency.toFixed(2),
      additionalKVAR: additionalKVAR.toFixed(2),
      C: C.toFixed(2),
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">
        Experiment 1: LOAD TEST ON 3-PHASE SQUIRREL CAGE INDUCTION MOTOR
      </h1>
      <div className="card shadow w-100 mx-auto">
        <div className="card-body "> 
          <h2 className="text-primary mb-4">SAMPLE CALCULATION (Set No. __)</h2>
          <div className="mb-3">
            <label htmlFor="V" className="form-label">
              V (V):
            </label>
            <input
              type="number"
              id="V"
              className="form-control"
              value={V}
              onChange={(e) => setV(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="I" className="form-label">
              I (A):
            </label>
            <input
              type="number"
              id="I"
              className="form-control"
              value={I}
              onChange={(e) => setI(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="W1" className="form-label">
              W1 (W):
            </label>
            <input
              type="number"
              id="W1"
              className="form-control"
              value={W1}
              onChange={(e) => setW1(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="W2" className="form-label">
              W2 (W):
            </label>
            <input
              type="number"
              id="W2"
              className="form-control"
              value={W2}
              onChange={(e) => setW2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="N" className="form-label">
              N (rpm):
            </label>
            <input
              type="number"
              id="N"
              className="form-control"
              value={N}
              onChange={(e) => setN(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="S1" className="form-label">
              S1 (Kg):
            </label>
            <input
              type="number"
              id="S1"
              className="form-control"
              value={S1}
              onChange={(e) => setS1(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="S2" className="form-label">
              S2 (Kg):
            </label>
            <input
              type="number"
              id="S2"
              className="form-control"
              value={S2}
              onChange={(e) => setS2(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateSample}>
            Calculate
          </button>
          {results && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>V:</strong> {results.V} V
              </p>
              <p>
                <strong>I:</strong> {results.I} A
              </p>
              <p>
                <strong>W1:</strong> {results.W1} W
              </p>
              <p>
                <strong>W2:</strong> {results.W2} W
              </p>
              <p>
                <strong>N:</strong> {results.N} rpm
              </p>
              <p>
                <strong>S1:</strong> {results.S1} Kg
              </p>
              <p>
                <strong>S2:</strong> {results.S2} Kg
              </p>
              <p>
                <strong>Radius of brake drum (R):</strong> {results.R} m
              </p>
              <p>
                <strong>Synchronous speed (Ns):</strong> {results.Ns} rpm
              </p>

              <h3 className="text-primary mt-4">Calculated Values:</h3>
              <p>
                <strong>Input Power (W):</strong> W1 + W2 = {results.inputPower} W
              </p>
              <p>
                <strong>Power Factor (cosΦ<sub>1</sub>):</strong> cosΦ<sub>1</sub> ={" "}
                {results.cosPhi1}
              </p>
              <p>
                <strong>Percentage Slip (s):</strong> s = {results.slip} %
              </p>
              <p>
                <strong>Torque (T):</strong> T = {results.torque} N-m
              </p>
              <p>
                <strong>Output Power (P):</strong> P = {results.outputPower} W
              </p>
              <p>
                <strong>Efficiency (η):</strong> η = {results.efficiency} %
              </p>
              <p>
                <strong>cosΦ2:</strong> 0.95
              </p>
              <p>
                <strong>Additional kVAR required:</strong> Additional kVAR ={" "}
                {results.additionalKVAR} kVAR
              </p>
              <p>
                <strong>f:</strong> 50 Hz
              </p>
              <p>
                <strong>Capacitance per phase (C):</strong> C = {results.C} μF
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InductionMachineCalculator;