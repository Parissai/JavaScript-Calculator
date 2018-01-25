const display = document.getElementById('display');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('.button');
const equalsButton = document.getElementById('equalsButton');
const allClearButton = document.getElementById('allClearButton');
const displayClearButton = document.getElementById('displayClearButton');
const arrow = document.getElementById('arrow');
let cached = "";


function addToDisplay() {       //ADD S.TH FOR 0-8   INSTEAD OF -8  //////IS THIS NEEDED?!?!?

    //checks if display and result both have the value of zero remove the 0 in display and add the first digit
    display.innerHTML = ((((this.value == "*") || (this.value == "/")) && (result.innerHTML === "0") && (display.innerHTML === "0")) ? "error" :
        ((display.innerHTML === "0") ? this.innerHTML : display.innerHTML + this.innerHTML));

    cached = (cached === "0" ? this.value : cached + this.value);

    //display.innerHTML = (display.innerHTML === "0" ? this.innerHTML : display.innerHTML + this.innerHTML )     ;
}

function showResult() {
    result.innerHTML = eval(cached);
    display.innerHTML = result.innerHTML;
    cached = result.innerHTML;
}

function clearDisplay() {
    display.innerHTML = 0;
    cached = result.innerHTML;
};

function allClear() {
    result.innerHTML = 0;
    display.innerHTML = 0;
    cached = "";
};

function dropLast() {
    //TODO check if it is the last digit remained
    cached = cached.slice(0, -1);
    display.innerHTML = (display.innerHTML).slice(0, -1);
}

buttons.forEach(button => button.addEventListener('click', addToDisplay));
equalsButton.addEventListener('click', showResult);
displayClearButton.addEventListener('click', clearDisplay);
allClearButton.addEventListener('click', allClear);
arrow.addEventListener('click', dropLast);