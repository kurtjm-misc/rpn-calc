import {
  createAddOperation,
  createSubtractOperation,
  createMultiplyOperation,
  createDivideOperation,
} from './arithmetic.js';

import { createAverageOperation } from './average.js';
import { createFactorialOperation } from './factorial.js';

export function createMathOperations() {
  const supported = {};
  const registerOperation = (operation) => {
    supported[operation.symbol] = operation;
  };

  // basic arithmetic;
  registerOperation(createAddOperation());
  registerOperation(createSubtractOperation());
  registerOperation(createMultiplyOperation());
  registerOperation(createDivideOperation());

  // fancier maths;
  registerOperation(createFactorialOperation());
  registerOperation(createAverageOperation());
  return supported;
}
