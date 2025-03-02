import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SlipTestCalculator = () => {
  const [Rdc, setRdc] = useState("");
  const [Vmax, setVmax] = useState("");
  const [Vmin, setVmin] = useState("");
  const [Imax, setImax] = useState("");
  const [Imin, setImin] = useState("");
  const [slipTestResult, setSlipTestResult] = useState(null);

  const [fullHalf, setFullHalf] = useState("full");
  const [pFactor, setPFactor] = useState("");
  const [lagLead, setLagLead] = useState("lag");
  const [Ra, setRa] = useState("");
  const [Xq, setXq] = useState("");
  const [Xd, setXd] = useState("");
  const [regulationResult, setRegulationResult] = useState(null);

  const [delta2, setDelta2] = useState("");
  const [Xq2, setXq2] = useState("");
  const [Xd2, setXd2] = useState("");
  const [powerAngleChara, setPowerAngleChara] = useState(null);

  const calculateSlipTest = () => {
    const Ra = 1.2 * parseFloat(Rdc);
    const Zsd = parseFloat(Vmax) / parseFloat(Imin);
    const Zsq = parseFloat(Vmin) / parseFloat(Imax);
    const Xd = Math.sqrt(Math.pow(Zsd, 2) - Math.pow(Ra, 2)).toFixed(2);
    const Xq = Math.sqrt(Math.pow(Zsq, 2) - Math.pow(Ra, 2)).toFixed(2);

    setSlipTestResult({
      Rdc,
      Vmax,
      Vmin,
      Imax,
      Imin,
      Ra: Ra.toFixed(2),
      Zsd: Zsd.toFixed(2),
      Zsq: Zsq.toFixed(2),
      Xd,
      Xq,
    });
  };

  const polarToRectangular = (magnitude, angleInDegrees) => {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    return {
      real: magnitude * Math.cos(angleInRadians),
      imag: magnitude * Math.sin(angleInRadians),
    };
  };

  const calculateRegulation = () => {
    const pf = parseFloat(pFactor);
    const IaMagnitude = fullHalf === "full" ? 11.5 : 5.75;
    const phi = Math.acos(pf) * (180 / Math.PI);
    const IaAngle = lagLead === "lead" ? phi : -phi;

    const VRect = polarToRectangular(230, 0);
    const IaRect = polarToRectangular(IaMagnitude, IaAngle);

    const voltageDropReal = IaRect.real * parseFloat(Ra) - IaRect.imag * parseFloat(Xq);
    const voltageDropImag = IaRect.real * parseFloat(Xq) + IaRect.imag * parseFloat(Ra);

    const EOCReal = VRect.real + voltageDropReal;
    const EOCImag = VRect.imag + voltageDropImag;

    const EOCMagnitude = Math.sqrt(EOCReal * EOCReal + EOCImag * EOCImag);
    const EOCAngle = Math.atan2(EOCImag, EOCReal) * (180 / Math.PI);

    const delta = EOCAngle;
    const deltaRadians = delta * (Math.PI / 180);
    const psi = delta - IaAngle;
    const psiRadians = psi * (Math.PI / 180);

    const Ef =
      230 * Math.cos(deltaRadians) +
      IaMagnitude * parseFloat(Ra) * Math.cos(psiRadians) +
      IaMagnitude * parseFloat(Xd) * Math.sin(psiRadians);
    const percentRegulation = ((Ef - 230) * 100) / 230;

    setRegulationResult({
      EOCMagnitude: EOCMagnitude.toFixed(2),
      EOCAngle: EOCAngle.toFixed(2),
      delta: delta.toFixed(2),
      psi: psi.toFixed(2),
      Ef: Ef.toFixed(2),
      percentRegulation: percentRegulation.toFixed(2),
    });
  };

  const calculatePAchara = () => {
    const Ef2 = 276;
    const deltaRadians = parseFloat(delta2) * (Math.PI / 180);
    const p1 = (3 * 276 * 230 * Math.sin(deltaRadians)) / parseFloat(Xd2);
    const p2 = (3 * 52900 * (parseFloat(Xd2) - parseFloat(Xq2)) * Math.sin(2 * deltaRadians)) / (2 * parseFloat(Xd2) * parseFloat(Xq2));
    const power = p1 + p2;

    setPowerAngleChara({
      p1: p1.toFixed(2),
      p2: p2.toFixed(2),
      power: power.toFixed(2),
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">
        Experiment: Slip Test on Three Phase Salient Pole Synchronous Machine
      </h1>

      {/* Slip Test Calculation */}
      <div className="card shadow w-100 mx-auto">
        <div className="card-body">
          <h2 className="text-primary mb-4">Slip Test Calculation</h2>
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
          <div className="mb-3">
            <label htmlFor="Vmax" className="form-label">
              Vmax (V):
            </label>
            <input
              type="number"
              id="Vmax"
              className="form-control"
              value={Vmax}
              onChange={(e) => setVmax(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Vmin" className="form-label">
              Vmin (V):
            </label>
            <input
              type="number"
              id="Vmin"
              className="form-control"
              value={Vmin}
              onChange={(e) => setVmin(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Imax" className="form-label">
              Imax (A):
            </label>
            <input
              type="number"
              id="Imax"
              className="form-control"
              value={Imax}
              onChange={(e) => setImax(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Imin" className="form-label">
              Imin (A):
            </label>
            <input
              type="number"
              id="Imin"
              className="form-control"
              value={Imin}
              onChange={(e) => setImin(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateSlipTest}>
            Calculate
          </button>
          {slipTestResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Rdc:</strong> {slipTestResult.Rdc} Ω
              </p>
              <p>
                <strong>Vmax:</strong> {slipTestResult.Vmax} V
              </p>
              <p>
                <strong>Vmin:</strong> {slipTestResult.Vmin} V
              </p>
              <p>
                <strong>Imax:</strong> {slipTestResult.Imax} A
              </p>
              <p>
                <strong>Imin:</strong> {slipTestResult.Imin} A
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>Armature Resistance (Ra):</strong> 1.2 × {slipTestResult.Rdc} = {slipTestResult.Ra} Ω
              </p>
              <p>
                <strong>Maximum Impedance (Zsd):</strong> Zsd = Vmax / Imin = {slipTestResult.Zsd} Ω
              </p>
              <p>
                <strong>Minimum Impedance (Zsq):</strong> Zsq = Vmin / Imax = {slipTestResult.Zsq} Ω
              </p>
              <p>
                <strong>Xd:</strong> √(Zsd² - Ra²) = {slipTestResult.Xd} Ω
              </p>
              <p>
                <strong>Xq:</strong> √(Zsq² - Ra²) = {slipTestResult.Xq} Ω
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Percentage Regulation Calculation */}
      <div className="card shadow w-100 mx-auto mt-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">Percentage Regulation Calculation</h2>
          <div className="mb-3">
            <label htmlFor="fullHalf" className="form-label">
              Full load/Half load:
            </label>
            <select
              id="fullHalf"
              className="form-control"
              value={fullHalf}
              onChange={(e) => setFullHalf(e.target.value)}
            >
              <option value="full">Full load</option>
              <option value="half">Half load</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="pFactor" className="form-label">
              Power Factor:
            </label>
            <input
              type="number"
              id="pFactor"
              className="form-control"
              value={pFactor}
              onChange={(e) => setPFactor(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lagLead" className="form-label">
              Lag/Lead:
            </label>
            <select
              id="lagLead"
              className="form-control"
              value={lagLead}
              onChange={(e) => setLagLead(e.target.value)}
            >
              <option value="lag">Lag</option>
              <option value="lead">Lead</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Ra" className="form-label">
              Ra (Ω):
            </label>
            <input
              type="number"
              id="Ra"
              className="form-control"
              value={Ra}
              onChange={(e) => setRa(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Xq" className="form-label">
              Xq (Ω):
            </label>
            <input
              type="number"
              id="Xq"
              className="form-control"
              value={Xq}
              onChange={(e) => setXq(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Xd" className="form-label">
              Xd (Ω):
            </label>
            <input
              type="number"
              id="Xd"
              className="form-control"
              value={Xd}
              onChange={(e) => setXd(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateRegulation}>
            Calculate Full Load
          </button>
          {regulationResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>V:</strong> 230 ∠0° V
              </p>
              <p>
                <strong>Ia:</strong> {fullHalf === "full" ? 11.5 : 5.75} ∠{lagLead === "lead" ? Math.acos(parseFloat(pFactor)) * (180 / Math.PI) : -Math.acos(parseFloat(pFactor)) * (180 / Math.PI)}° A
              </p>
              <p>
                <strong>cos Φ(pf):</strong> {pFactor}
              </p>
              <p>
                <strong>Lag/Lead:</strong> {lagLead}
              </p>
              <p>
                <strong>Armature Resistance (Ra):</strong> {Ra} Ω
              </p>
              <p>
                <strong>Quadrature Axis Synchronous Reactance (Xq):</strong> {Xq} Ω
              </p>
              <p>
                <strong>Direct Axis Synchronous Reactance (Xd):</strong> {Xd} Ω
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>OC:</strong> V + Ia(Ra + jXq) = {regulationResult.EOCMagnitude} ∠{regulationResult.EOCAngle}° V
              </p>
              <p>
                <strong>δ:</strong> {regulationResult.delta}°
              </p>
              <p>
                <strong>ψ:</strong> {regulationResult.psi}°
              </p>
              <p>
                <strong>Ef:</strong> V cos δ + Ia Ra cos ψ + Ia Xd sin ψ = {regulationResult.Ef} V
              </p>
              <p>
                <strong>% Regulation:</strong> (Ef - V) × 100 / V = {regulationResult.percentRegulation}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Power Angle Characteristics */}
      <div className="card shadow w-100 mx-auto mt-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">Power Angle Characteristics</h2>
          <div className="mb-3">
            <label htmlFor="delta2" className="form-label">
              δ (degrees):
            </label>
            <input
              type="number"
              id="delta2"
              className="form-control"
              value={delta2}
              onChange={(e) => setDelta2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Xq2" className="form-label">
              Xq (Ω):
            </label>
            <input
              type="number"
              id="Xq2"
              className="form-control"
              value={Xq2}
              onChange={(e) => setXq2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Xd2" className="form-label">
              Xd (Ω):
            </label>
            <input
              type="number"
              id="Xd2"
              className="form-control"
              value={Xd2}
              onChange={(e) => setXd2(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculatePAchara}>
            Calculate
          </button>
          {powerAngleChara && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Assume an induced emf of 120% of terminal voltage:</strong> Ef = 276 V
              </p>
              <p>
                <strong>δ:</strong> {delta2}°
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>P1 (Excitation power):</strong> (3 × Ef × V × sin δ) / Xd = {powerAngleChara.p1} W
              </p>
              <p>
                <strong>P2 (Reluctance power):</strong> (3 × V² × (Xd - Xq) × sin 2δ) / (2 × Xd × Xq) = {powerAngleChara.p2} W
              </p>
              <p>
                <strong>Resultant Power (P):</strong> P1 + P2 = {powerAngleChara.power} W
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlipTestCalculator;