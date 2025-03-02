import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InductionMachineExperiment = () => {
  const [motorVdc, setMotorVdc] = useState("");
  const [motorIdc, setMotorIdc] = useState("");
  const [motorVac, setMotorVac] = useState("");
  const [motorIac, setMotorIac] = useState("");
  const [motorWph, setMotorWph] = useState("");
  const [motorTime, setMotorTime] = useState("");
  const [motorResult, setMotorResult] = useState(null);

  const [generatorVdc, setGeneratorVdc] = useState("");
  const [generatorIdc, setGeneratorIdc] = useState("");
  const [generatorVac, setGeneratorVac] = useState("");
  const [generatorIac, setGeneratorIac] = useState("");
  const [generatorWph, setGeneratorWph] = useState("");
  const [generatorTime, setGeneratorTime] = useState("");
  const [generatorResult, setGeneratorResult] = useState(null);

  const calculateMotor = () => {
    const Vdc = parseFloat(motorVdc);
    const Idc = parseFloat(motorIdc);
    const Vac = parseFloat(motorVac);
    const Iac = parseFloat(motorIac);
    const Wph = parseFloat(motorWph);
    const time = parseFloat(motorTime);

    const f2 = 10 / time;
    const input = 3 * Wph;
    const output = Vdc * Idc;
    const fs = 50; // Synchronous frequency
    const slip = (f2 / fs) * 100;
    const speed = (1 - slip / 100) * 1000;
    const efficiency = (output / input) * 100;

    setMotorResult({
      Vdc,
      Idc,
      Vac,
      Iac,
      Wph,
      time,
      f2: f2.toFixed(2),
      input: input.toFixed(2),
      output: output.toFixed(2),
      slip: slip.toFixed(2),
      speed: speed.toFixed(2),
      efficiency: efficiency.toFixed(2),
    });
  };

  const calculateGenerator = () => {
    const Vdc = parseFloat(generatorVdc);
    const Idc = parseFloat(generatorIdc);
    const Vac = parseFloat(generatorVac);
    const Iac = parseFloat(generatorIac);
    const Wph = parseFloat(generatorWph);
    const time = parseFloat(generatorTime);

    const f2 = 10 / time;
    const input = Vdc * Idc;
    const output = 3 * Wph;
    const fs = 50; // Synchronous frequency
    const slip = -(f2 / fs) * 100; // Note: Slip is negative for generator
    const speed = (1 - slip / 100) * 1000;
    const efficiency = (output / input) * 100;

    setGeneratorResult({
      Vdc,
      Idc,
      Vac,
      Iac,
      Wph,
      time,
      f2: f2.toFixed(2),
      input: input.toFixed(2),
      output: output.toFixed(2),
      slip: slip.toFixed(2),
      speed: speed.toFixed(2),
      efficiency: efficiency.toFixed(2),
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">
        Experiment 4: INDUCTION MACHINE AS GENERATOR AND MOTOR
      </h1>

      {/* Induction Machine as Motor */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">INDUCTION MACHINE WORKING AS MOTOR</h2>
          <div className="mb-3">
            <label htmlFor="motorVdc" className="form-label">
              Vdc (V):
            </label>
            <input
              type="number"
              id="motorVdc"
              className="form-control"
              value={motorVdc}
              onChange={(e) => setMotorVdc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="motorIdc" className="form-label">
              Idc (A):
            </label>
            <input
              type="number"
              id="motorIdc"
              className="form-control"
              value={motorIdc}
              onChange={(e) => setMotorIdc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="motorVac" className="form-label">
              Vac (V):
            </label>
            <input
              type="number"
              id="motorVac"
              className="form-control"
              value={motorVac}
              onChange={(e) => setMotorVac(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="motorIac" className="form-label">
              Iac (A):
            </label>
            <input
              type="number"
              id="motorIac"
              className="form-control"
              value={motorIac}
              onChange={(e) => setMotorIac(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="motorWph" className="form-label">
              Wph (W):
            </label>
            <input
              type="number"
              id="motorWph"
              className="form-control"
              value={motorWph}
              onChange={(e) => setMotorWph(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="motorTime" className="form-label">
              Time for 10 oscillations (s):
            </label>
            <input
              type="number"
              id="motorTime"
              className="form-control"
              value={motorTime}
              onChange={(e) => setMotorTime(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateMotor}>
            Calculate
          </button>
          {motorResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Vdc:</strong> {motorResult.Vdc} V
              </p>
              <p>
                <strong>Idc:</strong> {motorResult.Idc} A
              </p>
              <p>
                <strong>Vac:</strong> {motorResult.Vac} V
              </p>
              <p>
                <strong>Iac:</strong> {motorResult.Iac} A
              </p>
              <p>
                <strong>Wph:</strong> {motorResult.Wph} W
              </p>
              <p>
                <strong>Ns:</strong> 1000 rpm
              </p>
              <p>
                <strong>Time for 10 oscillations:</strong> {motorResult.time} s
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>Rotor frequency, f2:</strong> 10/T = {motorResult.f2} Hz
              </p>
              <p>
                <strong>Synchronous frequency, fs:</strong> 50 Hz
              </p>
              <p>
                <strong>Input:</strong> 3 Wph = 3 × {motorResult.Wph} = {motorResult.input} W
              </p>
              <p>
                <strong>Output:</strong> Vdc × Idc = {motorResult.Vdc} × {motorResult.Idc} = {motorResult.output} W
              </p>
              <p>
                <strong>% Slip:</strong> (f2 / fs) × 100 = {motorResult.slip} %
              </p>
              <p>
                <strong>Speed:</strong> (1 - slip / 100) × Ns = (1 - {motorResult.slip / 100}) × 1000 = {motorResult.speed} rpm
              </p>
              <p>
                <strong>Efficiency:</strong> (output / input) × 100 = {motorResult.efficiency} %
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Induction Machine as Generator */}
      <div className="card shadow w-100 mx-auto mb-4">
        <div className="card-body">
          <h2 className="text-primary mb-4">INDUCTION MACHINE WORKING AS GENERATOR</h2>
          <div className="mb-3">
            <label htmlFor="generatorVdc" className="form-label">
              Vdc (V):
            </label>
            <input
              type="number"
              id="generatorVdc"
              className="form-control"
              value={generatorVdc}
              onChange={(e) => setGeneratorVdc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="generatorIdc" className="form-label">
              Idc (A):
            </label>
            <input
              type="number"
              id="generatorIdc"
              className="form-control"
              value={generatorIdc}
              onChange={(e) => setGeneratorIdc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="generatorVac" className="form-label">
              Vac (V):
            </label>
            <input
              type="number"
              id="generatorVac"
              className="form-control"
              value={generatorVac}
              onChange={(e) => setGeneratorVac(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="generatorIac" className="form-label">
              Iac (A):
            </label>
            <input
              type="number"
              id="generatorIac"
              className="form-control"
              value={generatorIac}
              onChange={(e) => setGeneratorIac(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="generatorWph" className="form-label">
              Wph (W):
            </label>
            <input
              type="number"
              id="generatorWph"
              className="form-control"
              value={generatorWph}
              onChange={(e) => setGeneratorWph(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="generatorTime" className="form-label">
              Time for 10 oscillations (s):
            </label>
            <input
              type="number"
              id="generatorTime"
              className="form-control"
              value={generatorTime}
              onChange={(e) => setGeneratorTime(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={calculateGenerator}>
            Calculate
          </button>
          {generatorResult && (
            <div className="mt-4">
              <h3 className="text-primary">Given Values:</h3>
              <p>
                <strong>Vdc:</strong> {generatorResult.Vdc} V
              </p>
              <p>
                <strong>Idc:</strong> {generatorResult.Idc} A
              </p>
              <p>
                <strong>Vac:</strong> {generatorResult.Vac} V
              </p>
              <p>
                <strong>Iac:</strong> {generatorResult.Iac} A
              </p>
              <p>
                <strong>Wph:</strong> {generatorResult.Wph} W
              </p>
              <p>
                <strong>Ns:</strong> 1000 rpm
              </p>
              <p>
                <strong>Time for 10 oscillations:</strong> {generatorResult.time} s
              </p>
              <h3 className="text-primary">Calculated Values:</h3>
              <p>
                <strong>Rotor frequency, f2:</strong> 10/T = {generatorResult.f2} Hz
              </p>
              <p>
                <strong>Synchronous frequency, fs:</strong> 50 Hz
              </p>
              <p>
                <strong>Input:</strong> Vdc × Idc = {generatorResult.Vdc} × {generatorResult.Idc} = {generatorResult.input} W
              </p>
              <p>
                <strong>Output:</strong> 3 Wph = 3 × {generatorResult.Wph} = {generatorResult.output} W
              </p>
              <p>
                <strong>% Slip:</strong> -(f2 / fs) × 100 = {generatorResult.slip} % (Note: Slip is negative)
              </p>
              <p>
                <strong>Speed:</strong> (1 - slip / 100) × Ns = (1 - {generatorResult.slip / 100}) × 1000 = {generatorResult.speed} rpm (Note: Speed will be above synchronous speed, 1000 rpm)
              </p>
              <p>
                <strong>Efficiency:</strong> (output / input) × 100 = {generatorResult.efficiency} %
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InductionMachineExperiment;