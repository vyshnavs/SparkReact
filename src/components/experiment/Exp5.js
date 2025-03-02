import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InductionMachineTests = () => {
  const [lowHigh, setLowHigh] = useState("low");
  const [Voc, setVoc] = useState("");
  const [Ioc, setIoc] = useState("");
  const [Woc, setWoc] = useState("");
  const [Vsc, setVsc] = useState("");
  const [Isc, setIsc] = useState("");
  const [Wsc, setWsc] = useState("");
  const [Rdc, setRdc] = useState("");
  const [parametersResult, setParametersResult] = useState(null);

  const [lowHigh2, setLowHigh2] = useState("low");
  const [N, setN] = useState("");
  const [R1, setR1] = useState("");
  const [R2dash, setR2dash] = useState("");
  const [X1, setX1] = useState("");
  const [X2dash, setX2dash] = useState("");
  const [torqueCharaResult, setTorqueCharaResult] = useState(null);

  const calculateParameters = () => {
    const Vo = lowHigh === "low" ? parseFloat(Voc) : parseFloat(Voc) / Math.sqrt(3);
    const Vs = lowHigh === "low" ? parseFloat(Vsc) : parseFloat(Vsc) / Math.sqrt(3);
    const Io = lowHigh === "low" ? parseFloat(Ioc) / Math.sqrt(3) : parseFloat(Ioc);
    const Is = lowHigh === "low" ? parseFloat(Isc) / Math.sqrt(3) : parseFloat(Isc);
    const cosphi = parseFloat(Woc) / (3 * Vo * Io);
    const phi = Math.acos(cosphi) * (180 / Math.PI);
    const phiRadian = Math.acos(cosphi);
    const sinphi = Math.sin(phiRadian);
    const Rc = Vo / (Io * cosphi);
    const Xm = Vo / (Io * sinphi);
    const Zo1 = Vs / Is;
    const Ro1 = parseFloat(Wsc) / (3 * Is * Is);
    const Xo1 = Math.sqrt(Zo1 * Zo1 - Ro1 * Ro1);
    const R1 = (3 * 1.2 * parseFloat(Rdc)) / 2;
    const R2dashValue = Ro1 - R1;
    const X2dashValue = Xo1 / 2;

    setParametersResult({
      Voc,
      Ioc,
      Woc,
      Vsc,
      Isc,
      Wsc,
      Rdc,
      Vo,
      Vs,
      Io,
      Is,
      cosphi,
      phi,
      sinphi,
      Rc,
      Xm,
      Zo1,
      Ro1,
      Xo1,
      R1,
      R2dash: R2dashValue,
      X2dash: X2dashValue,
    });
  };

  const calculateTorqueChara = () => {
    const Ns = lowHigh2 === "low" ? 750 : 1500;
    const slip = (Ns - parseFloat(N)) / Ns;
    const V = lowHigh2 === "low" ? 400 : 400 / Math.sqrt(3);
    const I2dash =
      V /
      Math.sqrt(
        Math.pow(R1 + R2dash / slip, 2) + Math.pow(parseFloat(X1) + parseFloat(X2dash), 2)
      );
    const P2 = (3 * I2dash * I2dash * R2dash) / slip;
    const torque = P2 / ((2 * Math.PI * Ns) / 60);

    setTorqueCharaResult({
      N,
      R1,
      R2dash,
      X1,
      X2dash,
      Ns,
      slip,
      V,
      I2dash,
      P2,
      torque,
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">
        Experiment 5: NO LOAD & BLOCKED ROTOR TESTS ON 3-PHASE INDUCTION MOTOR
      </h1>

      {/* Equivalent Circuit Parameters */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">EQUIVALENT CIRCUIT PARAMETERS</h2>
          <div className="mb-3">
            <label htmlFor="lowHigh" className="form-label">
              Low speed/High speed:
            </label>
            <select
              id="lowHigh"
              className="form-control"
              value={lowHigh}
              onChange={(e) => setLowHigh(e.target.value)}
            >
              <option value="low">Low speed</option>
              <option value="high">High speed</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Voc" className="form-label">
              Voc (V):
            </label>
            <input
              type="number"
              id="Voc"
              className="form-control"
              value={Voc}
              onChange={(e) => setVoc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Ioc" className="form-label">
              Ioc (A):
            </label>
            <input
              type="number"
              id="Ioc"
              className="form-control"
              value={Ioc}
              onChange={(e) => setIoc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Woc" className="form-label">
              Woc (W):
            </label>
            <input
              type="number"
              id="Woc"
              className="form-control"
              value={Woc}
              onChange={(e) => setWoc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Vsc" className="form-label">
              Vsc (V):
            </label>
            <input
              type="number"
              id="Vsc"
              className="form-control"
              value={Vsc}
              onChange={(e) => setVsc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Isc" className="form-label">
              Isc (A):
            </label>
            <input
              type="number"
              id="Isc"
              className="form-control"
              value={Isc}
              onChange={(e) => setIsc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Wsc" className="form-label">
              Wsc (W):
            </label>
            <input
              type="number"
              id="Wsc"
              className="form-control"
              value={Wsc}
              onChange={(e) => setWsc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Rdc" className="form-label">
              Rdc (Ω):
            </label>
            <input
              type="number"
              id="Rdc"
              className="form-control"
              value={Rdc}
              onChange={(e) => setRdc(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateParameters}>
            Calculate
          </button>
          {parametersResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Voc:</strong> {parametersResult.Voc} V
              </p>
              <p>
                <strong>Ioc:</strong> {parametersResult.Ioc} A
              </p>
              <p>
                <strong>Woc:</strong> {parametersResult.Woc} W
              </p>
              <p>
                <strong>Vsc:</strong> {parametersResult.Vsc} V
              </p>
              <p>
                <strong>Isc:</strong> {parametersResult.Isc} A
              </p>
              <p>
                <strong>Wsc:</strong> {parametersResult.Wsc} W
              </p>
              <p>
                <strong>Rdc:</strong> {parametersResult.Rdc} Ω
              </p>
              <h3 className="text-primary">Calculated Values: for {lowHigh} speed</h3>
              <p>
                <strong>Vo:</strong> {parametersResult.Vo.toFixed(2)} V
              </p>
              <p>
                <strong>Vs:</strong> {parametersResult.Vs.toFixed(2)} V
              </p>
              <p>
                <strong>Io:</strong> {parametersResult.Io.toFixed(2)} A
              </p>
              <p>
                <strong>Is:</strong> {parametersResult.Is.toFixed(2)} A
              </p>
              <p>
                <strong>cos Φ₀:</strong> {parametersResult.cosphi.toFixed(2)}
              </p>
              <p>
                <strong>Φ₀:</strong> {parametersResult.phi.toFixed(2)}°
              </p>
              <p>
                <strong>sin Φ₀:</strong> {parametersResult.sinphi.toFixed(2)}
              </p>
              <p>
                <strong>Rc:</strong> {parametersResult.Rc.toFixed(2)} Ω
              </p>
              <p>
                <strong>Xm:</strong> {parametersResult.Xm.toFixed(2)} Ω
              </p>
              <p>
                <strong>Zo1:</strong> {parametersResult.Zo1.toFixed(2)} Ω
              </p>
              <p>
                <strong>Ro1:</strong> {parametersResult.Ro1.toFixed(2)} Ω
              </p>
              <p>
                <strong>Xo1:</strong> {parametersResult.Xo1.toFixed(2)} Ω
              </p>
              <p>
                <strong>R1:</strong> {parametersResult.R1.toFixed(2)} Ω
              </p>
              <p>
                <strong>R2':</strong> {parametersResult.R2dash.toFixed(2)} Ω
              </p>
              <p>
                <strong>X2':</strong> {parametersResult.X2dash.toFixed(2)} Ω
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Torque Speed Characteristics */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">TORQUE SPEED CHARACTERISTICS FROM EQUIVALENT CIRCUIT</h2>
          <div className="mb-3">
            <label htmlFor="lowHigh2" className="form-label">
              Low speed/High speed:
            </label>
            <select
              id="lowHigh2"
              className="form-control"
              value={lowHigh2}
              onChange={(e) => setLowHigh2(e.target.value)}
            >
              <option value="low">Low speed</option>
              <option value="high">High speed</option>
            </select>
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
            <label htmlFor="R1" className="form-label">
              R1 (Ω):
            </label>
            <input
              type="number"
              id="R1"
              className="form-control"
              value={R1}
              onChange={(e) => setR1(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="R2dash" className="form-label">
              R2' (Ω):
            </label>
            <input
              type="number"
              id="R2dash"
              className="form-control"
              value={R2dash}
              onChange={(e) => setR2dash(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="X1" className="form-label">
              X1 (Ω):
            </label>
            <input
              type="number"
              id="X1"
              className="form-control"
              value={X1}
              onChange={(e) => setX1(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="X2dash" className="form-label">
              X2' (Ω):
            </label>
            <input
              type="number"
              id="X2dash"
              className="form-control"
              value={X2dash}
              onChange={(e) => setX2dash(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateTorqueChara}>
            Calculate
          </button>
          {torqueCharaResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>N:</strong> {torqueCharaResult.N} rpm
              </p>
              <p>
                <strong>R1:</strong> {torqueCharaResult.R1} Ω
              </p>
              <p>
                <strong>R2':</strong> {torqueCharaResult.R2dash} Ω
              </p>
              <p>
                <strong>X1:</strong> {torqueCharaResult.X1} Ω
              </p>
              <p>
                <strong>X2':</strong> {torqueCharaResult.X2dash} Ω
              </p>
              <h3 className="text-primary">Calculated Values: for {lowHigh2} speed</h3>
              <p>
                <strong>Synchronous speed, Ns:</strong> {torqueCharaResult.Ns} rpm
              </p>
              <p>
                <strong>Assume speed, N:</strong> {torqueCharaResult.N} rpm
              </p>
              <p>
                <strong>% Slip:</strong> {torqueCharaResult.slip.toFixed(2)} %
              </p>
              <p>
                <strong>V:</strong> {torqueCharaResult.V.toFixed(2)} V
              </p>
              <p>
                <strong>Rotor current, I2':</strong> {torqueCharaResult.I2dash.toFixed(2)} A
              </p>
              <p>
                <strong>Rotor Input P2:</strong> {torqueCharaResult.P2.toFixed(2)} W
              </p>
              <p>
                <strong>Torque developed:</strong> {torqueCharaResult.torque.toFixed(2)} N-m
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InductionMachineTests;