const inputNum = userInput();
const result = fromNumberToObject(inputNum);
if(result === null) {

    console.log(`Object is null`);
}
else {

    alert(`Вы ввели:\n[сотни]   - ${result.сотни};\n[десятки] - ${result.десятки};\n[единицы] - ${result.единицы};`);
}

function fromNumberToObject(inputNum) {

    const numberObject = {};
    var numbersArray = new Array();
    numbersArray = inputNum.split('');

    while(numbersArray.length < 3) {

        numbersArray.unshift(0);
    }
    if(numbersArray.length > 3) {

        return null;
    }

    numberObject['сотни']     = +numbersArray[0];
    numberObject['десятки']   = +numbersArray[1];
    numberObject['единицы']   = +numbersArray[2];

    return numberObject;
}

function userInput()
{
    var isInputProcess = true;
    while(isInputProcess) {

        var numberInput = prompt("Введите число от 0 до 999");
        if(numberInput == 0 || numberInput == -1 || numberInput == "") {
            continue;
        }
        
        isInputProcess = false;
    }

    return numberInput;
}
