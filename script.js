const display = document.getElementById('display');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('.button');
const equalsButton = document.getElementById('equalsButton');
const clearButton = document.getElementById('clearButton');


function addToDisplay() {
    display.innerHTML = (display.innerHTML === "0" ? this.value : display.innerHTML + this.value);
}

function showResult(){
    result.innerHTML = eval(display.innerHTML);
    display.innerHTML = eval(display.innerHTML);
}

function clearDisplay() {
    display.innerHTML = 0;
    result.innerHTML = 0;
};

buttons.forEach(button => button.addEventListener('click', addToDisplay));
equalsButton.addEventListener('click', showResult);
clearButton.addEventListener('click', clearDisplay);