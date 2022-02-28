# Introduction

**rpn-calc** is a postfix (aka "reverse polish notation" or RPN) calculator application designed to run on the command line. It was written as a take-home programming exercise.

In postfix expressions, operands precede operators, such as: 1 2 +

rpn-calc reads input from **stdin** and calculates the results of expressions as they become available, displaying results via **stdout**. Input is processed as it's received, and results of the last input operation are shown based on the calculations performed.

## Examples (from a clear state):

- 1 2 + _(enter)_ : shows the result (3), and saves it as an operand for future calculation.
- 1 2 + 4 _(enter)_ : shows the result (3), and saves both the result and the following 4 as operands for future calculation.
- 1 _(enter)_ 2 _(enter)_ + _(enter)_ : shows the result (3) and saves it as an operand for future calculation.

## Other commands:

- q (enter) : exits the application
- c (enter) : clears the operands awaiting calculation

# Implementation

The application collects text input from a given source and feeds it to the **Lexer** to produce a tokenized representation. Tokens are classified as either **operands** (with a numeric value), or **operators** (with a string value.) The tokenized input is then fed into the Calculator itself. The Calculator is not concerned with where the tokens came from, allowing support for other sources.

The Calculator supports different math operations via dependency injection, such that the selection of supported operations can be changed without altering the calculator's core functionality. An optional output stream is also injected, for displaying the results where desired.

## Math operations

A math operation is composed of an evaluation function (Strategy pattern), a symbol (such as '+' for addition), and a numeric range (min/max) of the number of expected operands. While common binary operations such as addition will have both a min and mix of 2 operands, supporting a variable number of operands allows for things like unary operations (e.g., factorial or sqrt.) Making it an actual range also allows for more advanced operations, such as using all available operands (e.g., averages, min, max, etc.)

Supported operations are added to an object, passed into the Calculator, and can be indexed by the associated operator symbol. That is how they are ultimately connected to the operator tokens provided by the Lexer.

## Calculator evaluation

At evaluation time, the Calculator iterates through the tokenized input. If it encounters an operand, it pushes it on to a stack. If it encounters an operation token, it checks that the associated symbol is found in the 'available operations.' If the operation can not be found, it throws an error. If the operation is supported, it determines how many operands to pop off the stack (based on the range for that specific operation), and provides those to the operation for evaluation. The result is then pushed back on the stack. If the required number of operands are not provided for a requested operation, it throws an error.

## Thoughts and Limitations

- **Approach**: I used a few different approaches for how the modules are implemented and exported, as there's a wide range of debate with regard to what different teams consider best practice. For example, some folks eschew the use of classes at all in Javascript due to the nuances of 'this' binding. My intention here was to attempt a somewhat balanced approach overall.

- **Numeric handling**: While there's basic numeric error handling (like preventing inputs of Infinity, or divide by zero), one of the most glaring limitations is that it does not handle operations that overflow or underflow. In a real application, I would aim to detect where calculation beyond Number.MIN/MAX_VALUE can occur-- which, due to how Javascript handles numbers-- is not as simple as just checking for (-)Infinity.

- **Custom exceptions**: At the moment, failures result in throwing a basic Error. A more advanced application might warrant custom exception types. It would also allow more robust testing, by ensuring the specific errors are thrown.

- **Use case errors**: There's very little error checking in areas like overlapping operations or input commands that could clobber operations. For example there's nothing stopping a user from adding multiple implementations of the same operation symbol, or adding a non-operator command such as '+' to do something which can interfere with addition, depending on how it's called. Further, there's no hard checking that objects conform to their expected shapes. In TypeScript, I'd use tools such as interfaces to ensure objects are the correct shape.

- **String constants**: In a real application, I would move all hard-coded strings (informational, error messages, etc) to a data table of some kind. There are many benefits to this, such as easier language localization, ease of checking for specific messages in tests, and non-programmers being able to update application text.

## Feature ideas

- **Operand constants**: In the lexer, tokens are classified as operands based on whether they're considered valid numbers or not. A few small changes in that approach could allow for additional operand types, such as constants like PI, E, etc. They could be identified in a constant map, and swapped for their numeric representation. This could be trivially added without changing logic elsewhere.

- **Fancier operations**: I added some examples of operations that require different numbers of operands, mainly to ensure the design would make it easy to extend. "!" will calculate factorial with a single operand, while "AVG" will calculate the (mean) average of all preceding operands. Operations that use "all operands" are probably considered non-standard, but this was more a fun attempt to keep the design as flexible as possible. It was tempting to add a whole mess of additional operations (like sqrt, sin, cos, etc), but I opted to stop here.

#### Examples:

- 5 ! (enter) : shows the result (120), and saves it as an operand for future calculation.
- 1 2 3.5 1.5 AVG (enter) : shows the result (2), and saves it as an operand for future calculation.

# Running the application

To run the application (after cloning the repository):

```
npm install
npm start
```

# Unit Tests

The application was not developed with a strict TDD approach, but I added a reasonable range of unit tests to ensure changes during development didn't break the core expected functionality.

To run the tests (mocha and chai):

```
npm test
```
