const display = document.getElementById('display');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('.button');
const equalsButton = document.getElementById('equalsButton');
const allClearButton = document.getElementById('allClearButton');
const displayClearButton = document.getElementById('displayClearButton');
const backspace = document.getElementById('backspace');
let cached = [];

function addToDisplay() {
    //checks if display and result both have the value of zero remove the 0 in display and add the first digit
    if ((this.value === "*" || this.value === "/") && resultDisplay.innerHTML === "0" && display.innerHTML === "0") {
        alert("Error!");
        display.innerHTML = 0;
    }
    else if (display.innerHTML === "0") {
        display.innerHTML = this.innerHTML;
    }
    else {
        display.innerHTML += this.innerHTML;
    }

    const filterInt = function (value) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return 'number';
    };

    const previousChar = cached[cached.length - 1];
    //if before log and radical and pi is a digit automatically add *
    if (this.classList.contains('math') &&
        !(previousChar === '/' || previousChar === '+' || previousChar === '-' || previousChar === '*' || !cached.length)) {
        cached.push(`${'*' + this.value}`);
    }
    //if after pi is a digit automatically add *
    else if ((filterInt(this.value) === 'number') && (previousChar === 'Math.PI' || previousChar === '*Math.PI')) {
        cached.push(`${'*' + this.value}`);
    }
    //if before '(' is a digit automatically add * : 74(3-4)
    else if ((filterInt(previousChar) === 'number' || previousChar === 'Math.PI' || previousChar === '*Math.PI') && (this.value === '(')) {
        cached.push(`${'*' + this.value}`);
    }
    //if 
    else if ((this.value === "*" || this.value === "/") && resultDisplay.innerHTML === "0" && display.innerHTML === "0") {
        cached.length = 0;
    }
    else { cached.push(this.value); }

    console.log(cached);
}

function showResult() {

    let cachedStr = cached.join('')
    const openParenthese = cachedStr.split("(").length - 1;
    const closeParenthese = cachedStr.split(")").length - 1;

    //check if the number of openParenthese and closeParenthese are the same, if not equal them
    cachedStr = (openParenthese != closeParenthese ? cachedStr + ")".repeat(openParenthese - closeParenthese) : cachedStr);

    let result = eval(cachedStr);
    resultDisplay.innerHTML = result;
    display.innerHTML = result;
    cached.length = 0;
    cached = display.innerHTML.split('');

    //check if the result is 0 remove it from cached
    if (cached.length === 1 && cached[0] === '0') cached.length = 0;
}

function clearDisplay() {
    display.innerHTML = 0;
    cached.length = 0;
    cached[0] = resultDisplay.innerHTML;
};

function allClear() {
    resultDisplay.innerHTML = 0;
    display.innerHTML = 0;
    cached.length = 0;
};

function dropLastChar() {
    //store display.innerHTML to avoid splitting 4π√log4  <=   4*Math.PI*Math.sqrt(*Math.log(
    const newCached = display.innerHTML;

    //check if display is empty or it is 0
    if (cached.length === 0) {
        alert('Nothing to delete');
    }
    //check if last char is Math.log and delete 'log' from display
    else if (newCached.slice(-3) === 'log') {
        cached = cached.slice(0, -1);
        display.innerHTML = newCached.slice(0, -3);
    }
    else {
        cached = cached.slice(0, -1);
        display.innerHTML = newCached.slice(0, -1);
    }
}

buttons.forEach(button => button.addEventListener('click', addToDisplay));
equalsButton.addEventListener('click', showResult);
displayClearButton.addEventListener('click', clearDisplay);
allClearButton.addEventListener('click', allClear);
backspace.addEventListener('click', dropLastChar);