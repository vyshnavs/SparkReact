import React, { useState, useEffect } from 'react';
import '../mathsolver.css';
import * as math from 'mathjs';

const MathSolver = () => {
    const [numVariables, setNumVariables] = useState('');
    const [numFunctions, setNumFunctions] = useState('');
    const [variables, setVariables] = useState([]);
    const [functionNames, setFunctionNames] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [equations, setEquations] = useState([]);
    const [results, setResults] = useState([]);
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBanner(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const createInputFields = () => {
        const vars = [];
        for (let i = 0; i < numVariables; i++) {
            vars.push(String.fromCharCode(97 + i));
        }
        setVariables(vars);
    };

    const createFunctionFields = () => {
        const funcs = [];
        for (let i = 0; i < numFunctions; i++) {
            funcs.push(`f${i + 1}`);
        }
        setFunctionNames(funcs);
    };

    const solve = () => {
        const variableValues = variables.map((_, index) => 
            parseFloat(document.getElementById(`variable${index}`).value)
        );
        const eqs = functionNames.map((_, index) => 
            document.querySelectorAll('.equation-input')[index].value
        );
        const funcResults = {};
        const res = eqs.map((eq, index) => {
            const result = evaluateEquation(eq, variableValues, funcResults);
            funcResults[functionNames[index]] = result;
            return `Result of function ${functionNames[index]}: ${result}`;
        });
        setResults(res);
    };

    const evaluateEquation = (equation, variableValues, functionResults) => {
        try {
            variables.forEach((variable, index) => {
                equation = equation.replace(new RegExp(`\\b${variable}\\b`, 'g'), variableValues[index]);
            });
            for (let funcName in functionResults) {
                equation = equation.replace(new RegExp(`\\b${funcName}\\b`, 'g'), functionResults[funcName]);
            }
            equation = equation.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, p1, p2) => {
                return `(${p1}(${p2} * pi / 180))`;
            });
            const result = math.evaluate(equation);
            return roundToPrecision(result, 10);
        } catch (error) {
            return `Error: ${error.message}`;
        }
    };

    const roundToPrecision = (num, precision) => {
        if (typeof num !== 'number') return num;
        return parseFloat(num.toFixed(precision));
    };

    const reset = () => {
        setNumVariables('');
        setNumFunctions('');
        setVariables([]);
        setFunctionNames([]);
        setEquations([]);
        setResults([]);
    };

    const closeBanner = () => {
        setShowBanner(false);
    };

    return (
        <div>
            {showBanner && (
                <div className="banner active" id="banner">
                    <span className="close" onClick={closeBanner}>&times;</span>
                    <p>Important update: This site is undergoing maintenance from 12:00 AM to 2:00 AM.</p>
                </div>
            )}
            <div className="watermark">v</div>
            <div className="container ">
                <h1>Math Operation Solver</h1>
                <div className="table-container">
                    <div>
                        <h2>Variables</h2>
                        <label htmlFor="numVariables">Enter number of variables:</label>
                        <input type="number" id="numVariables" value={numVariables} onChange={(e) => setNumVariables(e.target.value)} />
                        <button onClick={createInputFields}>Submit</button>
                        <div id="variables">
                            {variables.map((variable, index) => (
                                <div key={index}>
                                    <label htmlFor={`variable${index}`}>Enter value for variable {variable}:</label>
                                    <input type="number" id={`variable${index}`} className="variable-input" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2>Functions</h2>
                        <label htmlFor="numFunctions">Enter number of functions:</label>
                        <input type="number" id="numFunctions" value={numFunctions} onChange={(e) => setNumFunctions(e.target.value)} />
                        <button onClick={createFunctionFields}>Submit</button>
                        <div id="equations">
                            {functionNames.map((func, index) => (
                                <div key={index}>
                                    <input type="text" className="equation-input" placeholder={`Enter equation for function ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2>Results</h2>
                        <button onClick={solve}>Solve</button>
                        <button onClick={reset}>Reset</button>
                        <div id="result" className="result">
                            {results.map((result, index) => (
                                <p key={index}>{result}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MathSolver;