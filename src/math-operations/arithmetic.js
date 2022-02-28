import MathOperation, { OPERANDS_BINARY } from '../math-operation.js';

const SYMBOL_ADD = '+';
const SYMBOL_SUBTRACT = '-';
const SYMBOL_MULTIPLY = '*';
const SYMBOL_DIVIDE = '/';

export function createAddOperation() {
  return new MathOperation(SYMBOL_ADD, OPERANDS_BINARY, ([op1, op2]) => {
    return op1 + op2;
  });
}

export function createSubtractOperation() {
  return new MathOperation(SYMBOL_SUBTRACT, OPERANDS_BINARY, ([op1, op2]) => {
    return op1 - op2;
  });
}

export function createMultiplyOperation() {
  return new MathOperation(SYMBOL_MULTIPLY, OPERANDS_BINARY, ([op1, op2]) => {
    return op1 * op2;
  });
}

export function createDivideOperation() {
  return new MathOperation(SYMBOL_DIVIDE, OPERANDS_BINARY, ([op1, op2]) => {
    if (op2 === 0) {
      throw new Error('Dividing by zero is not allowed!');
    }
    return op1 / op2;
  });
}
