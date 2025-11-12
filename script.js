const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let current = '0';
let operator = '';
let operand = null;
let afterEqual = false;

function updateDisplay() {
  display.textContent = current;
}

function clearAll() {
  current = '0';
  operator = '';
  operand = null;
  afterEqual = false;
  updateDisplay();
}

function backspace() {
  if (afterEqual) return;
  if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) {
    current = '0';
  } else {
    current = current.slice(0, -1);
  }
  updateDisplay();
}

function inputNumber(num) {
  if (afterEqual) {
    current = num;
    afterEqual = false;
    updateDisplay();
    return;
  }
  if (current === '0') {
    current = num;
  } else {
    current += num;
  }
  updateDisplay();
}

function inputDot() {
  if (afterEqual) {
    current = '0.';
    afterEqual = false;
    updateDisplay();
    return;
  }
  if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay();
}

function setOperator(op) {
  if (operator && !afterEqual) {
    compute();
  }
  operator = op;
  operand = parseFloat(current);
  afterEqual = false;
  current = '0';
}

function compute() {
  if (!operator || operand === null) return;
  let result;
  let second = parseFloat(current);

  switch (operator) {
    case '+': result = operand + second; break;
    case '-': result = operand - second; break;
    case '*': result = operand * second; break;
    case '/':
      if (second === 0) {
        result = 'Error';
        break;
      }
      result = operand / second; break;
    default: return;
  }
  current = String(result);
  operator = '';
  operand = null;
  afterEqual = true;
  updateDisplay();
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-action');
    if (!isNaN(action)) {
      inputNumber(action);
    } else if (action === 'clear') {
      clearAll();
    } else if (action === 'back') {
      backspace();
    } else if (action === '.') {
      inputDot();
    } else if (action === '=') {
      compute();
    } else if (['+', '-', '*', '/'].includes(action)) {
      setOperator(action);
    }
  });
});

// Inisialisasi tampilan
updateDisplay();
