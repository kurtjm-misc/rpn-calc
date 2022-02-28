import MathOperation, { OPERANDS_UNARY } from '../math-operation.js';

const SYMBOL_FACTORIAL = '!';

export function createFactorialOperation() {
  return new MathOperation(SYMBOL_FACTORIAL, OPERANDS_UNARY, ([p]) => {
    const factorial = (num) => {
      let result = 1;
      for (let i = 2; i <= num; i += 1) {
        result *= i;
      }
      return result;
    };
    return factorial(p);
  });
}
