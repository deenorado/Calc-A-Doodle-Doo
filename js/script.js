// References DOM elements and buttons
const numbers = document.querySelectorAll("[data-number]");
const currentOperand = document.querySelector("[data-current-operand]");
const previousOperand = document.querySelector("[data-previous-operand]");
const operator = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-all-clear");

// Add event listeners to buttons
for (i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
    if (e.target.innerText === "." && currentOperand.textContent.includes("."))
      return;
    if (currentOperand.innerText.length > 10) return;
    currentOperand.textContent += e.target.innerText;
  });
}

for (i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", (e) => {
    if (
      previousOperand.innerText.includes("+") ||
      previousOperand.innerText.includes("-") ||
      previousOperand.innerText.includes("*") ||
      previousOperand.innerText.includes("÷")
    ) {
      if (previousOperand.innerText.includes("+")) {
        previousOperand.textContent = `${sum(
          parseFloat(previousOperand.innerText.slice(0, -2)),
          parseFloat(currentOperand.innerText)
        )} ${e.target.innerText}`;
        currentOperand.textContent = "";
      } else if (previousOperand.innerText.includes("-")) {
        previousOperand.textContent = `${difference(
          parseFloat(previousOperand.innerText.slice(0, -2)),
          parseFloat(currentOperand.innerText)
        )} ${e.target.innerText}`;
        currentOperand.textContent = "";
      } else if (previousOperand.innerText.includes("*")) {
        previousOperand.textContent = `${product(
          parseFloat(previousOperand.innerText.slice(0, -2)),
          parseFloat(currentOperand.innerText)
        )} ${e.target.innerText}`;
        currentOperand.textContent = "";
      } else if (previousOperand.innerText.includes("÷")) {
        previousOperand.textContent = `${quotient(
          parseFloat(previousOperand.innerText.slice(0, -2)),
          parseFloat(currentOperand.innerText)
        )} ${e.target.innerText}`;
        currentOperand.textContent = "";
      }
    } else if (!previousOperand.innerText && !currentOperand.innerText) {
      return;
    } else if (previousOperand.innerText && !currentOperand.innerText) {
      return;
    } else {
      previousOperand.textContent = `${currentOperand.textContent} ${e.target.innerText}`;
      currentOperand.textContent = "";
    }
  });
}

deleteButton.addEventListener("click", () => {
  let deletedNumber = currentOperand.textContent.slice(0, -1);
  currentOperand.textContent = deletedNumber;
});

clearButton.addEventListener("click", (e) => {
  currentOperand.textContent = "";
  previousOperand.textContent = "";
});

equalsButton.addEventListener("click", () => {
  if (!currentOperand.innerText) {
    return;
  } else if (previousOperand.innerText.includes("+")) {
    currentOperand.innerText = sum(
      parseFloat(previousOperand.innerText.slice(0, -2)),
      parseFloat(currentOperand.innerText)
    );
    previousOperand.textContent = "";
  } else if (previousOperand.innerText.includes("-")) {
    currentOperand.innerText = difference(
      parseFloat(previousOperand.innerText.slice(0, -2)),
      parseFloat(currentOperand.innerText)
    );
    previousOperand.textContent = "";
  } else if (previousOperand.innerText.includes("*")) {
    currentOperand.innerText = product(
      parseFloat(previousOperand.innerText.slice(0, -2)),
      parseFloat(currentOperand.innerText)
    );
    previousOperand.textContent = "";
  } else if (previousOperand.innerText.includes("÷")) {
    currentOperand.innerText = quotient(
      parseFloat(previousOperand.innerText.slice(0, -2)),
      parseFloat(currentOperand.innerText)
    );
    previousOperand.textContent = "";
  }
});

// Add keyboard support


// Functions for operations (+, -, x, /)
function sum(num1, num2) {
  return num1 + num2;
}

function difference(num1, num2) {
  return num1 - num2;
}

function product(num1, num2) {
  return num1 * num2;
}

function quotient(num1, num2) {
  if (num2 === 0) {
    return "You can't do that, dingus";
  } else {
    return +(num1 / num2).toFixed(5);
  }
}
