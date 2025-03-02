import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const VoltageRegulationCalculator = () => {
  const [Rdc, setRdc] = useState("");
  const [Isc, setIsc] = useState("");
  const [emfMethodResult, setEmfMethodResult] = useState(null);

  const [pFactor, setPFactor] = useState("");
  const [lagLead, setLagLead] = useState("lag");
  const [Ra, setRa] = useState("");
  const [Xs, setXs] = useState("");
  const [regulationResult, setRegulationResult] = useState(null);

  const [pFactor2, setPFactor2] = useState("");
  const [lagLead2, setLagLead2] = useState("lag");
  const [Ra2, setRa2] = useState("");
  const [mmfMethodErResult, setMmfMethodErResult] = useState(null);

  const [Ifr, setIfr] = useState("");
  const [Ifa, setIfa] = useState("");
  const [sigma, setSigma] = useState("");
  const [phi, setPhi] = useState("");
  const [lagLead3, setLagLead3] = useState("lag");
  const [mmfMethodStep2Result, setMmfMethodStep2Result] = useState(null);

  const [Ef, setEf] = useState("");
  const [delta, setDelta] = useState("");
  const [mmfMethodStep3Result, setMmfMethodStep3Result] = useState(null);

  const [pFactor3, setPFactor3] = useState("");
  const [lagLead4, setLagLead4] = useState("lag");
  const [Ra3, setRa3] = useState("");
  const [BC, setBC] = useState("");
  const [I, setI] = useState("");
  const [potierMethodStep1Result, setPotierMethodStep1Result] = useState(null);

  const [Ifr2, setIfr2] = useState("");
  const [Ifa2, setIfa2] = useState("");
  const [sigma2, setSigma2] = useState("");
  const [phi2, setPhi2] = useState("");
  const [lagLead5, setLagLead5] = useState("lag");
  const [potierMethodStep2Result, setPotierMethodStep2Result] = useState(null);

  const [Ef2, setEf2] = useState("");
  const [delta2, setDelta2] = useState("");
  const [potierMethodStep3Result, setPotierMethodStep3Result] = useState(null);

  const polarToRectangular = (magnitude, angleInDegrees) => {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    return {
      real: magnitude * Math.cos(angleInRadians),
      imag: magnitude * Math.sin(angleInRadians),
    };
  };

  const calculateEmfMethod = () => {
    const Ra = 1.2 * parseFloat(Rdc);
    const Zs = 230 / parseFloat(Isc);
    const Xs = Math.sqrt(Math.pow(Zs, 2) - Math.pow(Ra, 2)).toFixed(2);

    setEmfMethodResult({
      Rdc,
      Isc,
      Ra: Ra.toFixed(2),
      Zs: Zs.toFixed(2),
      Xs,
    });
  };

  const calculateRegulation = () => {
    const pf = parseFloat(pFactor);
    const IaMagnitude = 10.9;
    const phi = Math.acos(pf) * (180 / Math.PI);
    const IaAngle = lagLead === "lead" ? phi : -phi;

    const VRect = polarToRectangular(230, 0);
    const IaRect = polarToRectangular(IaMagnitude, IaAngle);

    const voltageDropReal = IaRect.real * parseFloat(Ra) - IaRect.imag * parseFloat(Xs);
    const voltageDropImag = IaRect.real * parseFloat(Xs) + IaRect.imag * parseFloat(Ra);

    const EOCReal = VRect.real + voltageDropReal;
    const EOCImag = VRect.imag + voltageDropImag;

    const EOCMagnitude = Math.sqrt(EOCReal * EOCReal + EOCImag * EOCImag);
    const EOCAngle = Math.atan2(EOCImag, EOCReal) * (180 / Math.PI);

    const percentRegulation = ((EOCMagnitude - 230) * 100) / 230;

    setRegulationResult({
      EOCMagnitude: EOCMagnitude.toFixed(2),
      EOCAngle: EOCAngle.toFixed(2),
      percentRegulation: percentRegulation.toFixed(2),
    });
  };

  const calculateMmfMethodEr = () => {
    const pf = parseFloat(pFactor2);
    const IaMagnitude = 10.9;
    const phi = Math.acos(pf) * (180 / Math.PI);
    const IaAngle = lagLead2 === "lead" ? phi : -phi;

    const VRect = polarToRectangular(230, 0);
    const IaRect = polarToRectangular(IaMagnitude, IaAngle);

    const voltageDropReal = IaRect.real * parseFloat(Ra2);
    const voltageDropImag = IaRect.imag * parseFloat(Ra2);

    const ErReal = VRect.real + voltageDropReal;
    const ErImag = VRect.imag + voltageDropImag;

    const ErMagnitude = Math.sqrt(ErReal * ErReal + ErImag * ErImag);
    const ErAngle = Math.atan2(ErImag, ErReal) * (180 / Math.PI);

    setMmfMethodErResult({
      ErMagnitude: ErMagnitude.toFixed(2),
      ErAngle: ErAngle.toFixed(2),
      sigma: -ErAngle.toFixed(2),
    });
  };

  const calculateMmfMethodStep2 = () => {
    const IfrMagnitude = parseFloat(Ifr);
    const IfrAngle = -parseFloat(sigma) + 90;

    const IfaMagnitude = parseFloat(Ifa);
    const IfaAngle = lagLead3 === "lead" ? parseFloat(phi) + 180 : -parseFloat(phi) + 180;

    const IfrRect = polarToRectangular(IfrMagnitude, IfrAngle);
    const IfaRect = polarToRectangular(IfaMagnitude, IfaAngle);

    const IfReal = IfrRect.real + IfaRect.real;
    const IfImg = IfrRect.imag + IfaRect.imag;

    const IfMagnitude = Math.sqrt(IfReal * IfReal + IfImg * IfImg);
    const IfAngle = Math.atan2(IfImg, IfReal) * (180 / Math.PI);
    const delta = IfAngle - 90;

    setMmfMethodStep2Result({
      IfrMagnitude,
      IfrAngle,
      IfaMagnitude,
      IfaAngle,
      IfMagnitude: IfMagnitude.toFixed(2),
      IfAngle: IfAngle.toFixed(2),
      delta: delta.toFixed(2),
    });
  };

  const calculateMmfMethodStep3 = () => {
    const percentRegulation = ((parseFloat(Ef) - 230) * 100) / 230;

    setMmfMethodStep3Result({
      Ef,
      delta,
      percentRegulation: percentRegulation.toFixed(2),
    });
  };

  const calculatePotierMethodStep1 = () => {
    const pf = parseFloat(pFactor3);
    const IaMagnitude = 10.9;
    const phi = Math.acos(pf) * (180 / Math.PI);
    const IaAngle = lagLead4 === "lead" ? phi : -phi;

    const Xal = parseFloat(BC) / parseFloat(I);

    const VRect = polarToRectangular(230, 0);
    const IaRect = polarToRectangular(IaMagnitude, IaAngle);

    const voltageDropReal = IaRect.real * parseFloat(Ra3) - IaRect.imag * Xal;
    const voltageDropImag = IaRect.real * Xal + IaRect.imag * parseFloat(Ra3);

    const ErReal = VRect.real + voltageDropReal;
    const ErImag = VRect.imag + voltageDropImag;

    const ErMagnitude = Math.sqrt(ErReal * ErReal + ErImag * ErImag);
    const ErAngle = Math.atan2(ErImag, ErReal) * (180 / Math.PI);

    setPotierMethodStep1Result({
      Xal: Xal.toFixed(2),
      ErMagnitude: ErMagnitude.toFixed(2),
      ErAngle: ErAngle.toFixed(2),
      sigma: ErAngle.toFixed(2),
    });
  };

  const calculatePotierMethodStep2 = () => {
    const IfrMagnitude = parseFloat(Ifr2);
    const IfrAngle = parseFloat(sigma2) + 90;

    const IfaMagnitude = parseFloat(Ifa2);
    const IfaAngle = lagLead5 === "lead" ? parseFloat(phi2) + 180 : -parseFloat(phi2) + 180;

    const IfrRect = polarToRectangular(IfrMagnitude, IfrAngle);
    const IfaRect = polarToRectangular(IfaMagnitude, IfaAngle);

    const IfReal = IfrRect.real + IfaRect.real;
    const IfImg = IfrRect.imag + IfaRect.imag;

    const IfMagnitude = Math.sqrt(IfReal * IfReal + IfImg * IfImg);
    const IfAngle = Math.atan2(IfImg, IfReal) * (180 / Math.PI);
    const delta = IfAngle - 90;

    setPotierMethodStep2Result({
      IfrMagnitude,
      IfrAngle,
      IfaMagnitude,
      IfaAngle,
      IfMagnitude: IfMagnitude.toFixed(2),
      IfAngle: IfAngle.toFixed(2),
      delta: delta.toFixed(2),
    });
  };

  const calculatePotierMethodStep3 = () => {
    const percentRegulation = ((parseFloat(Ef2) - 230) * 100) / 230;

    setPotierMethodStep3Result({
      Ef2,
      delta2,
      percentRegulation: percentRegulation.toFixed(2),
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">
        Experiment 3: VOLTAGE REGULATION OF 3-PHASE ALTERNATOR
      </h1>

      {/* EMF Method */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">EMF METHOD CALCULATION</h2>
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
          <button className="btn btn-primary w-100" onClick={calculateEmfMethod}>
            Calculate
          </button>
          {emfMethodResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Rdc:</strong> {emfMethodResult.Rdc} Ω
              </p>
              <p>
                <strong>Isc:</strong> {emfMethodResult.Isc} A
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>Rated voltage:</strong> 230 V
              </p>
              <p>
                <strong>Armature Resistance (Ra):</strong> 1.2 × {emfMethodResult.Rdc} = {emfMethodResult.Ra} Ω
              </p>
              <p>
                <strong>Synchronous impedance, Zs:</strong> Zs = V / Isc = {emfMethodResult.Zs} Ω
              </p>
              <p>
                <strong>Synchronous reactance, Xs:</strong> √(Zs² - Ra²) = {emfMethodResult.Xs} Ω
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Regulation at Full Load */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">EMF METHOD REGULATION AT FULL LOAD</h2>
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
            <label htmlFor="Xs" className="form-label">
              Xs (Ω):
            </label>
            <input
              type="number"
              id="Xs"
              className="form-control"
              value={Xs}
              onChange={(e) => setXs(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateRegulation}>
            Calculate
          </button>
          {regulationResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
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
                <strong>Quadrature Axis Synchronous Reactance (Xs):</strong> {Xs} Ω
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>V:</strong> 230 ∠0° V
              </p>
              <p>
                <strong>Ia:</strong> 10.9 ∠{lagLead === "lead" ? Math.acos(parseFloat(pFactor)) * (180 / Math.PI) : -Math.acos(parseFloat(pFactor)) * (180 / Math.PI)}° A
              </p>
              <p>
                <strong>Ef:</strong> V + Ia(Ra + jXs) = {regulationResult.EOCMagnitude} ∠{regulationResult.EOCAngle}° V
              </p>
              <p>
                <strong>δ:</strong> {regulationResult.EOCAngle}°
              </p>
              <p>
                <strong>% Regulation:</strong> (Ef - V) × 100 / V = {regulationResult.percentRegulation}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MMF Method */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">MMF METHOD CALCULATION</h2>
          <div className="mb-3">
            <label htmlFor="pFactor2" className="form-label">
              Power Factor:
            </label>
            <input
              type="number"
              id="pFactor2"
              className="form-control"
              value={pFactor2}
              onChange={(e) => setPFactor2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lagLead2" className="form-label">
              Lag/Lead:
            </label>
            <select
              id="lagLead2"
              className="form-control"
              value={lagLead2}
              onChange={(e) => setLagLead2(e.target.value)}
            >
              <option value="lag">Lag</option>
              <option value="lead">Lead</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Ra2" className="form-label">
              Ra (Ω):
            </label>
            <input
              type="number"
              id="Ra2"
              className="form-control"
              value={Ra2}
              onChange={(e) => setRa2(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateMmfMethodEr}>
            Calculate Er
          </button>
          {mmfMethodErResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>cos Φ(pf):</strong> {pFactor2}
              </p>
              <p>
                <strong>Lag/Lead:</strong> {lagLead2}
              </p>
              <p>
                <strong>Armature Resistance (Ra):</strong> {Ra2} Ω
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>V:</strong> 230 ∠0° V
              </p>
              <p>
                <strong>Ia:</strong> 10.9 ∠{lagLead2 === "lead" ? Math.acos(parseFloat(pFactor2)) * (180 / Math.PI) : -Math.acos(parseFloat(pFactor2)) * (180 / Math.PI)}° A
              </p>
              <p>
                <strong>Er:</strong> V + IaRa = {mmfMethodErResult.ErMagnitude} ∠{mmfMethodErResult.ErAngle}° V
              </p>
              <p>
                <strong>σ:</strong> {mmfMethodErResult.sigma}°
              </p>
              <p style={{ color: "red" }}>Refer OCC and find Ifr corresponding to Er.</p>
              <p style={{ color: "red" }}>And enter below for further calculations.</p>
            </div>
          )}
        </div>
      </div>

      {/* MMF Method Step 2 */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">MMF METHOD STEP 2</h2>
          <div className="mb-3">
            <label htmlFor="Ifr" className="form-label">
              Ifr (A):
            </label>
            <input
              type="number"
              id="Ifr"
              className="form-control"
              value={Ifr}
              onChange={(e) => setIfr(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Ifa" className="form-label">
              Ifa (A):
            </label>
            <input
              type="number"
              id="Ifa"
              className="form-control"
              value={Ifa}
              onChange={(e) => setIfa(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sigma" className="form-label">
              σ:
            </label>
            <input
              type="number"
              id="sigma"
              className="form-control"
              value={sigma}
              onChange={(e) => setSigma(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phi" className="form-label">
              Φ:
            </label>
            <input
              type="number"
              id="phi"
              className="form-control"
              value={phi}
              onChange={(e) => setPhi(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lagLead3" className="form-label">
              Lag/Lead:
            </label>
            <select
              id="lagLead3"
              className="form-control"
              value={lagLead3}
              onChange={(e) => setLagLead3(e.target.value)}
            >
              <option value="lag">Lag</option>
              <option value="lead">Lead</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" onClick={calculateMmfMethodStep2}>
            Calculate
          </button>
          {mmfMethodStep2Result && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Ifr:</strong> {mmfMethodStep2Result.IfrMagnitude} A
              </p>
              <p>
                <strong>Ifa:</strong> {mmfMethodStep2Result.IfaMagnitude} A
              </p>
              <p>
                <strong>σ:</strong> {sigma}°
              </p>
              <p>
                <strong>Φ:</strong> {phi}°
              </p>
              <p>
                <strong>Lag/Lead:</strong> {lagLead3}
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>Ifr:</strong> Ifr ∠(σ + 90) = {mmfMethodStep2Result.IfrMagnitude} ∠{mmfMethodStep2Result.IfrAngle}° A
              </p>
              <p>
                <strong>Ifa:</strong> Ifa ∠(-Φ + 180) for lag, Ifa ∠(Φ + 180) for lead = {mmfMethodStep2Result.IfaMagnitude} ∠{mmfMethodStep2Result.IfaAngle}° A
              </p>
              <p>
                <strong>If:</strong> Ifr + Ifa = {mmfMethodStep2Result.IfMagnitude} ∠(90 + {mmfMethodStep2Result.delta})° A
              </p>
              <p>
                <strong>δ:</strong> {mmfMethodStep2Result.delta}°
              </p>
              <p style={{ color: "red" }}>Refer OCC and find Ef corresponding to If.</p>
              <p style={{ color: "red" }}>And enter below for further calculations.</p>
            </div>
          )}
        </div>
      </div>

      {/* MMF Method Step 3 */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">MMF METHOD STEP 3</h2>
          <div className="mb-3">
            <label htmlFor="Ef" className="form-label">
              Ef (V):
            </label>
            <input
              type="number"
              id="Ef"
              className="form-control"
              value={Ef}
              onChange={(e) => setEf(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="delta" className="form-label">
              δ:
            </label>
            <input
              type="number"
              id="delta"
              className="form-control"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateMmfMethodStep3}>
            Calculate
          </button>
          {mmfMethodStep3Result && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Ef:</strong> {mmfMethodStep3Result.Ef} V
              </p>
              <p>
                <strong>δ:</strong> {mmfMethodStep3Result.delta}°
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>% Regulation:</strong> (Ef - V) × 100 / V = {mmfMethodStep3Result.percentRegulation}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Potier Method Step 1 */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">POTIER METHOD STEP 1</h2>
          <div className="mb-3">
            <label htmlFor="pFactor3" className="form-label">
              Power Factor:
            </label>
            <input
              type="number"
              id="pFactor3"
              className="form-control"
              value={pFactor3}
              onChange={(e) => setPFactor3(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lagLead4" className="form-label">
              Lag/Lead:
            </label>
            <select
              id="lagLead4"
              className="form-control"
              value={lagLead4}
              onChange={(e) => setLagLead4(e.target.value)}
            >
              <option value="lag">Lag</option>
              <option value="lead">Lead</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Ra3" className="form-label">
              Ra (Ω):
            </label>
            <input
              type="number"
              id="Ra3"
              className="form-control"
              value={Ra3}
              onChange={(e) => setRa3(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="BC" className="form-label">
              BC (V):
            </label>
            <input
              type="number"
              id="BC"
              className="form-control"
              value={BC}
              onChange={(e) => setBC(e.target.value)}
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
          <button className="btn btn-primary w-100" onClick={calculatePotierMethodStep1}>
            Calculate
          </button>
          {potierMethodStep1Result && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>cos Φ(pf):</strong> {pFactor3}
              </p>
              <p>
                <strong>Lag/Lead:</strong> {lagLead4}
              </p>
              <p>
                <strong>Armature Resistance (Ra):</strong> {Ra3} Ω
              </p>
              <p>
                <strong>BC:</strong> {BC} V
              </p>
              <p>
                <strong>I:</strong> {I} A
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>Xal:</strong> BC / I = {potierMethodStep1Result.Xal} Ω
              </p>
              <p>
                <strong>V:</strong> 230 ∠0° V
              </p>
              <p>
                <strong>Ia:</strong> 10.9 ∠{lagLead4 === "lead" ? Math.acos(parseFloat(pFactor3)) * (180 / Math.PI) : -Math.acos(parseFloat(pFactor3)) * (180 / Math.PI)}° A
              </p>
              <p>
                <strong>Er:</strong> V + Ia(Ra + jXal) = {potierMethodStep1Result.ErMagnitude} ∠{potierMethodStep1Result.ErAngle}° V
              </p>
              <p>
                <strong>σ:</strong> {potierMethodStep1Result.sigma}°
              </p>
              <p style={{ color: "red" }}>Refer OCC and find Ifr corresponding to Er.</p>
              <p style={{ color: "red" }}>And enter below for further calculations.</p>
            </div>
          )}
        </div>
      </div>

      {/* Potier Method Step 2 */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">POTIER METHOD STEP 2</h2>
          <div className="mb-3">
            <label htmlFor="Ifr2" className="form-label">
              Ifr (A):
            </label>
            <input
              type="number"
              id="Ifr2"
              className="form-control"
              value={Ifr2}
              onChange={(e) => setIfr2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Ifa2" className="form-label">
              Ifa (A):
            </label>
            <input
              type="number"
              id="Ifa2"
              className="form-control"
              value={Ifa2}
              onChange={(e) => setIfa2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sigma2" className="form-label">
              σ:
            </label>
            <input
              type="number"
              id="sigma2"
              className="form-control"
              value={sigma2}
              onChange={(e) => setSigma2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phi2" className="form-label">
              Φ:
            </label>
            <input
              type="number"
              id="phi2"
              className="form-control"
              value={phi2}
              onChange={(e) => setPhi2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lagLead5" className="form-label">
              Lag/Lead:
            </label>
            <select
              id="lagLead5"
              className="form-control"
              value={lagLead5}
              onChange={(e) => setLagLead5(e.target.value)}
            >
              <option value="lag">Lag</option>
              <option value="lead">Lead</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" onClick={calculatePotierMethodStep2}>
            Calculate
          </button>
          {potierMethodStep2Result && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Ifr:</strong> {potierMethodStep2Result.IfrMagnitude} A
              </p>
              <p>
                <strong>Ifa:</strong> {potierMethodStep2Result.IfaMagnitude} A
              </p>
              <p>
                <strong>σ:</strong> {sigma2}°
              </p>
              <p>
                <strong>Φ:</strong> {phi2}°
              </p>
              <p>
                <strong>Lag/Lead:</strong> {lagLead5}
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>Ifr:</strong> Ifr ∠(σ + 90) = {potierMethodStep2Result.IfrMagnitude} ∠{potierMethodStep2Result.IfrAngle}° A
              </p>
              <p>
                <strong>Ifa:</strong> Ifa ∠(-Φ + 180) for lag, Ifa ∠(Φ + 180) for lead = {potierMethodStep2Result.IfaMagnitude} ∠{potierMethodStep2Result.IfaAngle}° A
              </p>
              <p>
                <strong>If:</strong> Ifr + Ifa = {potierMethodStep2Result.IfMagnitude} ∠(90 + {potierMethodStep2Result.delta})° A
              </p>
              <p>
                <strong>δ:</strong> {potierMethodStep2Result.delta}°
              </p>
              <p style={{ color: "red" }}>Refer OCC and find Ef corresponding to If.</p>
              <p style={{ color: "red" }}>And enter below for further calculations.</p>
            </div>
          )}
        </div>
      </div>

      {/* Potier Method Step 3 */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">POTIER METHOD STEP 3</h2>
          <div className="mb-3">
            <label htmlFor="Ef2" className="form-label">
              Ef (V):
            </label>
            <input
              type="number"
              id="Ef2"
              className="form-control"
              value={Ef2}
              onChange={(e) => setEf2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="delta2" className="form-label">
              δ:
            </label>
            <input
              type="number"
              id="delta2"
              className="form-control"
              value={delta2}
              onChange={(e) => setDelta2(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculatePotierMethodStep3}>
            Calculate
          </button>
          {potierMethodStep3Result && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Ef:</strong> {potierMethodStep3Result.Ef2} V
              </p>
              <p>
                <strong>δ:</strong> {potierMethodStep3Result.delta2}°
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>% Regulation:</strong> (Ef - V) × 100 / V = {potierMethodStep3Result.percentRegulation}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoltageRegulationCalculator;