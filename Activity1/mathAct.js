exports.multiply = function (a, b) {
  return a * b;
};

exports.add = function (a, b) {
  return a + b;
};

exports.divide = function (a, b) {
  return a / b;
};

exports.substract = function (a, b) {
  return a - b;
};

const validOperations = {
  "+": exports.add,
  "-": exports.substract,
  "*": exports.multiply,
  "/": exports.divide,
};

exports.validOperations = validOperations;
