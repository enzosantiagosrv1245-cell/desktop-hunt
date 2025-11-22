import React, { useState } from 'react';

export default function CalculatorReal() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setDisplay('0');
      setEquation('');
    } else if (value === '=') {
      try {
        const result = eval(display);
        setEquation(display + ' =');
        setDisplay(result.toString());
      } catch {
        setDisplay('Erro');
      }
    } else if (value === '⌫') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const buttons = [
    ['%', 'CE', 'C', '⌫'],
    ['1/x', 'x²', '√', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['±', '0', '.', '=']
  ];

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col">
      <div className="mb-4">
        <div className="text-right text-sm text-gray-500 h-6">{equation}</div>
        <div className="bg-white text-right p-6 rounded-lg text-5xl font-light text-gray-900 border border-gray-300">
          {display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.flat().map((btn, i) => (
          <button
            key={i}
            onClick={() => handleClick(btn)}
            className={`rounded-lg font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-sm ${
              btn === '=' ? 'bg-blue-500 hover:bg-blue-600 text-white col-span-1' :
              ['/', '*', '-', '+'].includes(btn) ? 'bg-gray-300 hover:bg-gray-400 text-gray-900' :
              ['%', 'CE', 'C', '⌫', '1/x', 'x²', '√', '±'].includes(btn) ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' :
              'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}