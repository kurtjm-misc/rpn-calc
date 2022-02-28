import Calculator from '../src/calculator.js';
import * as Lexer from '../src/lexer.js';
import { expect } from 'chai';

import { createMathOperations } from '../src/math-operations/index.js';

describe('Calculator tests', function () {
  let calculator;
  const operations = createMathOperations();

  beforeEach(() => {
    calculator = new Calculator(operations);
  });

  // helper utility;
  const calc = (input) => {
    return calculator.evaluate(Lexer.tokenize(input));
  };

  describe('sequential inputs', function () {
    it('should return a result only when an operation occurs', function () {
      expect(calc('1')).to.equal(null);
      expect(calc('1')).to.equal(null);
      expect(calc('+')).to.equal(2);
    });

    it('should keep operands after an operation occurs', function () {
      expect(calc('1 2 + 10 7')).to.equal(3);
      expect(calc('+')).to.equal(17);
      expect(calc('+')).to.equal(20);
      expect(calc('1 2 + 10 7 + +')).to.equal(20);
    });
  });

  describe('provided examples', function () {
    it('should correctly calculate example 1', function () {
      calc('5');
      calc('8');
      expect(calc('+')).to.equal(13);
    });

    it('should correctly calculate example 2', function () {
      expect(calc('5 5 5 8 + + -')).to.equal(-13);
      expect(calc('13 +')).to.equal(0);
    });

    it('should correctly calculate example 3', function () {
      calc('-3');
      calc('-2');
      expect(calc('*')).to.equal(6);
      calc('5');
      expect(calc('+')).to.equal(11);
    });

    it('should correctly calculate example 4', function () {
      calc('5');
      calc('9');
      calc('1');
      expect(calc('-')).to.equal(8);
      expect(calc('/')).to.equal(0.625);
    });
  });

  describe('basic arithmetic', function () {
    it('should correctly add numbers', function () {
      expect(calc('1 1 +')).to.equal(2);
      expect(calc('1 2 + 3 4 + +')).to.equal(10);
      expect(calc('0.5 0.5 + 0.75 0.1 + +')).to.equal(1.85);
      expect(calc('-1.5 -2 -3 + +')).to.equal(-6.5);
    });

    it('should correctly subtract numbers', function () {
      expect(calc('1 1 -')).to.equal(0);
      expect(calc('2 1 - 3 4 - -')).to.equal(2);
      expect(calc('0.5 0.5 - 0.75 0.1 - -')).to.equal(-0.65);
      expect(calc('-1.5 -2 -3 - -')).to.equal(-2.5);
    });

    it('should correctly multiply numbers', function () {
      expect(calc('2 4 *')).to.equal(8);
      expect(calc('1 2 * 3 4 * *')).to.equal(24);
      expect(calc('0.1 10 * 0.1 200 * * 0.5 *')).to.equal(10);
      expect(calc('-1 -3 *')).to.equal(3);
    });

    it('should correctly divide numbers', function () {
      expect(calc('8 4 /')).to.equal(2);
      expect(calc('40 20 / 10 30 / /')).to.equal(6);
      expect(calc('10 0.1 / 200 0.1 / / 0.2 /')).to.equal(0.25);
      expect(calc('-3 -1 /')).to.equal(3);
    });

    it('should correctly mix operations', function () {
      expect(calc('5 1 2 3 4 + - * /')).to.equal(-1);
      expect(calc('1 2 + 4 - 1 * 2 /')).to.equal(-0.5);
    });

    it('should fail on divide by zero', function () {
      expect(() => calc('1 0 /')).to.throw('Dividing by zero is not allowed!');
      expect(() => calc('1 1 1 - /')).to.throw(
        'Dividing by zero is not allowed!'
      );
    });

    it('should fail when operations are missing operands', function () {
      expect(() => calc('+')).to.throw(Error);
      expect(() => calc('1 +')).to.throw(Error);
      expect(() => calc('-')).to.throw(Error);
      expect(() => calc('1 -')).to.throw(Error);
      expect(() => calc('*')).to.throw(Error);
      expect(() => calc('1 *')).to.throw(Error);
      expect(() => calc('/')).to.throw(Error);
      expect(() => calc('1 /')).to.throw(Error);
    });
  });

  describe('fancier operations', function () {
    it('should correctly calculate factorials', function () {
      expect(calc('0 !')).to.equal(1);
      expect(calc('1 !')).to.equal(1);
      expect(calc('3 !')).to.equal(6);
      calc('6');
      expect(calc('!')).to.equal(720);
      expect(calc('1 2 3 + + !')).to.equal(720);
    });

    it('should correctly calculate averages', function () {
      expect(calc('1 AVG')).to.equal(1);
      calculator.clear();
      expect(calc('2 2 2 2 2 AVG')).to.equal(2);
      calculator.clear();
      expect(calc('2 4 2 4 2 4 AVG')).to.equal(3);
      calculator.clear();
      expect(calc('1 2 3 AVG')).to.equal(2);
      calculator.clear();
      expect(calc('12 13 + 75 AVG')).to.equal(50);
    });

    it('should fail when operations are missing operands', function () {
      expect(() => calc('!')).to.throw(Error);
      expect(() => calc('AVG')).to.throw(Error);
    });
  });

  describe('other errors', function () {
    it('should fail on unrecognized commands', function () {
      expect(() => calc('x')).to.throw(Error);
      expect(() => calc('x y z')).to.throw(Error);
      expect(() => calc('8a 8b +')).to.throw(Error);
      expect(() => calc('8 7 x')).to.throw(Error);
      expect(() => calc('Infinity')).to.throw(Error);
    });
  });
});
