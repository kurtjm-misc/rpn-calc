import * as Lexer from '../src/lexer.js';
import { expect } from 'chai';

describe('Lexer tests', function () {
  describe('sequential inputs', function () {
    it('should recognize positive integers as operands', function () {
      const tokens = Lexer.tokenize('1 2 3');
      expect(tokens.length).to.equal(3);
      expect(tokens[0].isOperand).to.equal(true);
      expect(tokens[0].value).to.equal(1);

      expect(tokens[1].isOperand).to.equal(true);
      expect(tokens[1].value).to.equal(2);

      expect(tokens[2].isOperand).to.equal(true);
      expect(tokens[2].value).to.equal(3);
    });

    it('should recognize negative integers as operands', function () {
      const tokens = Lexer.tokenize('-1 -2 -3');
      expect(tokens.length).to.equal(3);
      expect(tokens[0].isOperand).to.equal(true);
      expect(tokens[0].value).to.equal(-1);

      expect(tokens[1].isOperand).to.equal(true);
      expect(tokens[1].value).to.equal(-2);

      expect(tokens[2].isOperand).to.equal(true);
      expect(tokens[2].value).to.equal(-3);
    });

    it('should recognize decimal numbers as operands', function () {
      const tokens = Lexer.tokenize('0.5 -1.5 3.1415');
      expect(tokens.length).to.equal(3);
      expect(tokens[0].isOperand).to.equal(true);
      expect(tokens[0].value).to.equal(0.5);

      expect(tokens[1].isOperand).to.equal(true);
      expect(tokens[1].value).to.equal(-1.5);

      expect(tokens[2].isOperand).to.equal(true);
      expect(tokens[2].value).to.equal(3.1415);
    });

    it('should recognize scientific notation as operands', function () {
      const tokens = Lexer.tokenize('10e1 10e-1 10e+10');
      expect(tokens.length).to.equal(3);
      expect(tokens[0].isOperand).to.equal(true);
      expect(tokens[0].value).to.equal(100);

      expect(tokens[1].isOperand).to.equal(true);
      expect(tokens[1].value).to.equal(1);

      expect(tokens[2].isOperand).to.equal(true);
      expect(tokens[2].value).to.equal(100000000000);
    });

    it('should not recognize infinity as an operand', function () {
      let tokens = Lexer.tokenize('Infinity');
      expect(tokens.length).to.equal(1);
      expect(tokens[0].isOperand).to.equal(false);

      tokens = Lexer.tokenize('-Infinity');
      expect(tokens.length).to.equal(1);
      expect(tokens[0].isOperand).to.equal(false);
    });

    it('should not recognize null or undefined as an operand', function () {
      let tokens = Lexer.tokenize('null');
      expect(tokens.length).to.equal(1);
      expect(tokens[0].isOperand).to.equal(false);

      tokens = Lexer.tokenize('undefined');
      expect(tokens.length).to.equal(1);
      expect(tokens[0].isOperand).to.equal(false);
    });

    it('should recognize arithmetic operations as operators', function () {
      const tokens = Lexer.tokenize('+ - * /');
      expect(tokens.length).to.equal(4);
      expect(tokens[0].isOperand).to.equal(false);
      expect(tokens[0].value).to.equal('+');
      expect(tokens[1].isOperand).to.equal(false);
      expect(tokens[1].value).to.equal('-');
      expect(tokens[2].isOperand).to.equal(false);
      expect(tokens[2].value).to.equal('*');
      expect(tokens[3].isOperand).to.equal(false);
      expect(tokens[3].value).to.equal('/');
    });
  });
});
