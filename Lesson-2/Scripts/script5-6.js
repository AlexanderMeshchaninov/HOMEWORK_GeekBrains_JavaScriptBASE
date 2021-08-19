var arg1 = +prompt("Введите первое число: ");
var arg2 = +prompt("Введите второе число: ");
var operation = +prompt("Выберите действие над числами: \n[1 - cложение]\n[2 - вычитание]\n[3 - умножение]\n[4 - деление]");

MathOperation(arg1, arg2, operation);

//сложение
function Addition (a, b)
{
    return (a + b);
}
//вычитание
function Subtraction(a, b)
{
    return (a - b);
}
//умножение
function Multiplication(a, b)
{
    return (a * b);
}
//деление
function Divition(a, b)
{
    return (a / b);
}
//операция
function MathOperation(arg1, arg2, operation)
{
    switch(operation)
    {
        case 1:
            let result1 = Addition(arg1, arg2);
            alert(`${arg1} + ${arg2} = ${result1}`);
            break;
        case 2:
            let result2 = Subtraction(arg1, arg2);
            alert(`${arg1} - ${arg2} = ${result2}`);
            break;
        case 3:
            let result3 = Multiplication(arg1, arg2);
            alert(`${arg1} * ${arg2} = ${result3}`);
            break;
        case 4:
            let result4 = Divition(arg1, arg2);
            alert(`${arg1} / ${arg2} = ${result4}`);
            break;
    }   
}
