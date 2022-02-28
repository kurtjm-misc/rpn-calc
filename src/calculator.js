class Calculator {
  #operations;
  #outputStream;

  #operandStack = [];
  #lastResult = null;

  constructor(operations, outputStream = null) {
    this.#operations = operations;
    this.#outputStream = outputStream;
  }

  evaluate(tokens) {
    this.#clearLastResult();
    tokens.forEach((token) => {
      if (token.isOperand) {
        this.#output(token.value);
        this.#pushOperand(token.value);
      } else {
        this.#processOperation(token.value);
      }
    });
    this.#outputLastResult();
    return this.#lastResult;
  }

  clear() {
    this.#operandStack = [];
    this.#output('(cleared)');
  }

  #getOperation(op) {
    if (!(op in this.#operations)) {
      throw new Error(`Unsupported operation: ${op}`);
    }
    return this.#operations[op];
  }

  #processOperation(op) {
    const operation = this.#getOperation(op);
    const requiredOperands = operation.minOperandCount;
    const operands = this.#popOperands(
      Math.min(this.#operandStack.length, operation.maxOperandCount)
    );
    if (operands.length < requiredOperands) {
      throw new Error(
        `Operation: "${op}" requires at least ${requiredOperands} operand(s)!`
      );
    }
    this.#lastResult = operation.evaluate(operands);
    this.#pushOperand(this.#lastResult);
  }

  #pushOperand(value) {
    this.#operandStack.push(value);
  }

  #popOperands(count) {
    const available = this.#operandStack.length;
    return this.#operandStack.splice(available - count, count);
  }

  #output(s) {
    if (this.#outputStream) {
      this.#outputStream(s);
    }
  }

  #clearLastResult() {
    this.#lastResult = null;
  }

  #outputLastResult() {
    if (this.#lastResult === null) {
      return;
    }
    this.#output(`Result: ${this.#lastResult}`);
    this.#output(`Operands: [ ${this.#operandStack.join(' | ').toString()} ]`);
  }
}

export default Calculator;
