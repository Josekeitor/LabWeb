const basicMath = require("./mathAct");
const readline = require("readline");

const middleman = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validOperations = {
  "+": basicMath.add,
  "-": basicMath.substract,
  "*": basicMath.multiply,
  "/": basicMath.divide,
};

function askForOperation() {
  middleman.question(
    "Choose a mathematical operation to perform ( +, -, *, /) ",
    (operation) => {
      if (operation in validOperations) {
        middleman.question("Enter first number", (firstNum) => {
          middleman.question("Enter second number", (secondNum) => {
            console.log(
              `${firstNum} ${operation} ${secondNum} = ${validOperations[
                operation
              ](Number(firstNum), Number(secondNum))}`
            );
            middleman.question("Another operation? 0=no", (answer) => {
              if (answer == "0") {
                middleman.close();
              } else {
                askForOperation();
              }
            });
          });
        });
      }
    }
  );
}

askForOperation();

middleman.on("close", function () {
  console.log("Good bye!");
  process.exit(0);
});
