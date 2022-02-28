#!/usr/bin/env node

import process from 'process';
import * as readline from 'readline';
import * as Lexer from '../src/lexer.js';
import Calculator from '../src/calculator.js';

import { createMathOperations } from '../src/math-operations/index.js';
import { createOutputStdout } from '../src/output/stdout.js';

function captureInputStdin(handler) {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  reader.prompt();
  reader.on('line', (input) => {
    handler(input.trim());
    reader.prompt();
  });
}

function main() {
  try {
    const operations = createMathOperations();
    const output = createOutputStdout();

    const calculator = new Calculator(operations, output);
    const commands = {
      q: () => {
        process.exit();
      },
      c: () => {
        calculator.clear();
      },
    };

    captureInputStdin((input) => {
      if (!input) {
        output('Please enter an expression...');
      } else {
        try {
          if (input in commands) {
            commands[input]();
          } else {
            calculator.evaluate(Lexer.tokenize(input));
          }
        } catch (error) {
          output(error?.message);
          calculator.clear();
        }
      }
    });
  } catch (error) {
    console.log(error?.message);
  }
}

main();
