import MathOperation, { OPERANDS_ALL } from '../math-operation.js';

const SYMBOL_AVERAGE = 'AVG';

export function createAverageOperation() {
  return new MathOperation(SYMBOL_AVERAGE, OPERANDS_ALL, (inputs) => {
    return inputs.reduce((p1, p2) => p1 + p2) / inputs.length;
  });
}
