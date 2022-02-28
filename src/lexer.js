function isValidOperand(n) {
  return !Number.isNaN(n) && isFinite(n);
}

export function tokenize(input) {
  const tokens = input.split(' ');
  return tokens.map((token) => {
    const asOperand = Number(token);
    return isValidOperand(asOperand)
      ? { isOperand: true, value: asOperand }
      : { isOperand: false, value: token };
  });
}
