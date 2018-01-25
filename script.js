const display = document.getElementById('display');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('.button');
const equalsButton = document.getElementById('equalsButton');
const allClearButton = document.getElementById('allClearButton');
const displayClearButton = document.getElementById('displayClearButton');
const arrow = document.getElementById('arrow');
let cached = "";

function addAutoMultiply() {

    //if before log and radical and pi is a digit automatically add *
    const filterInt = function (value) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return 'number';
    };

    cached = (filterInt(cached.slice(-1)) == 'number' ? cached + '*' : cached);
}

function addToDisplay() {       //ADD S.TH FOR 0-8   INSTEAD OF -8  //////IS THIS NEEDED?!?!?

    if (this.classList.contains('math')) addAutoMultiply();

    //checks if display and result both have the value of zero remove the 0 in display and add the first digit
    display.innerHTML = ((((this.value == "*") || (this.value == "/")) && (result.innerHTML === "0") && (display.innerHTML === "0")) ? "error" :
        ((display.innerHTML === "0") ? this.innerHTML : display.innerHTML + this.innerHTML));

    cached = (cached === "0" ? this.value : cached + this.value);

    //display.innerHTML = (display.innerHTML === "0" ? this.innerHTML : display.innerHTML + this.innerHTML )     ;
}

function showResult() {

    const openParenthese = cached.split("(").length - 1;
    const closeParenthese = cached.split(")").length - 1;

    //check if the number of openParenthese and closeParenthese are the same, if not equal them
    cached = (openParenthese != closeParenthese ? cached + ")".repeat(openParenthese - closeParenthese) : cached);

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

function dropLastChar() {//TODO check if the last char is Math.something and drop that all together eg. "Math.PI" cached "Math.P" cached "Math.P09-2"
    //TODO check if it is the last digit remained is 0 
    //TODO  % also needs checking   /100   back gives   /10 

    cached = cached.slice(0, -1);
    display.innerHTML = (display.innerHTML).slice(0, -1);
}

buttons.forEach(button => button.addEventListener('click', addToDisplay));
equalsButton.addEventListener('click', showResult);
displayClearButton.addEventListener('click', clearDisplay);
allClearButton.addEventListener('click', allClear);
arrow.addEventListener('click', dropLastChar);