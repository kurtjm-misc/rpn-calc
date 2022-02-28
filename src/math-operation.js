class MathOperation {
  #symbol;
  #operandCountRange;
  #evaluator;

  constructor(symbol, operandCountRange, evaluator) {
    this.#symbol = symbol;
    this.#operandCountRange = operandCountRange;
    this.#evaluator = evaluator;
  }

  evaluate(operands) {
    return this.#evaluator(operands);
  }

  get symbol() {
    return this.#symbol;
  }

  get minOperandCount() {
    return this.#operandCountRange.min;
  }

  get maxOperandCount() {
    return this.#operandCountRange.max;
  }
}

export const OPERANDS_UNARY = { min: 1, max: 1 };
export const OPERANDS_BINARY = { min: 2, max: 2 };
export const OPERANDS_ALL = { min: 1, max: Number.MAX_SAFE_INTEGER };

export default MathOperation;
