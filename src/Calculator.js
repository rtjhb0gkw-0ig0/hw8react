import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearInput = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const clearEntry = () => {
    setDisplayValue('0');
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = evaluate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const evaluate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="calculator">
      <input type="text" className="calculator-screen" value={displayValue} disabled />
      <div className="calculator-keys">
        <button className="calculator-key key-clear" onClick={clearInput}>AC</button>
        <button className="calculator-key" onClick={clearEntry}>C</button>
        <button className="calculator-key" onClick={() => performOperation('/')}>÷</button>

        <button className="calculator-key" onClick={() => inputDigit(7)}>7</button>
        <button className="calculator-key" onClick={() => inputDigit(8)}>8</button>
        <button className="calculator-key" onClick={() => inputDigit(9)}>9</button>
        <button className="calculator-key" onClick={() => performOperation('*')}>×</button>

        <button className="calculator-key" onClick={() => inputDigit(4)}>4</button>
        <button className="calculator-key" onClick={() => inputDigit(5)}>5</button>
        <button className="calculator-key" onClick={() => inputDigit(6)}>6</button>
        <button className="calculator-key" onClick={() => performOperation('-')}>-</button>

        <button className="calculator-key" onClick={() => inputDigit(1)}>1</button>
        <button className="calculator-key" onClick={() => inputDigit(2)}>2</button>
        <button className="calculator-key" onClick={() => inputDigit(3)}>3</button>
        <button className="calculator-key" onClick={() => performOperation('+')}>+</button>

        <button className="calculator-key key-zero" onClick={() => inputDigit(0)}>0</button>
        <button className="calculator-key" onClick={inputDecimal}>.</button>
        <button className="calculator-key key-equals" onClick={() => performOperation('=')}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
