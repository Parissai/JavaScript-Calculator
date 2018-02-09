const display = document.getElementById('display');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('.button');
const equalsButton = document.getElementById('equalsButton');
const allClearButton = document.getElementById('allClearButton');
const displayClearButton = document.getElementById('displayClearButton');
const backspace = document.getElementById('backspace');
let cached = [];

/*
function addAutoMultiply() {    
}
*/
function addToDisplay() {
    //issue after alert(error) display should return 0 and also cached
    //checks if display and result both have the value of zero remove the 0 in display and add the first digit
    display.innerHTML = ((((this.value === "*") || (this.value === "/")) && (resultDisplay.innerHTML === "0") && (display.innerHTML === "0")) ?
        alert("error") : ((display.innerHTML === "0") ?
            this.innerHTML : display.innerHTML + this.innerHTML));


    const filterInt = function (value) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return 'number';
    };

    //if before log and radical and pi is a digit automatically add *
    if (this.classList.contains('math') &&
        !((cached[cached.length - 1] === '/') || (cached[cached.length - 1] === '+') || (cached[cached.length - 1] === '-') || (cached[cached.length - 1] === '*') || !cached.length)) {
        cached.push(`${'*' + this.value}`);}
    //if after pi is a digit automatically add *
    else if ((filterInt(this.value) == 'number') && ((cached[cached.length - 1] == 'Math.PI') || (cached[cached.length - 1] == '*Math.PI'))) {
        cached.push(`${'*' + this.value}`);}
    else {cached.push(this.value);}

    console.log(cached);
    //display.innerHTML = (display.innerHTML === "0" ? this.innerHTML : display.innerHTML + this.innerHTML )     ;
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
    if(cached.length === 1 && cached[0] === '0') cached.length = 0;
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
    else if (newCached.slice(-3) === 'log'){ 
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