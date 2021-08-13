let a = +prompt("Введите число A: ");
let b = +prompt("Введите число B: ");

if(a > -1 && b > -1)
{
    let difference = Math.abs(a - b);
    alert("Разность чисел: " + difference);
}
else if(a < -1 && b < -1)
{
    let multiply = (a * b);
    alert("Произведение чисел: " + multiply);
}
else
{
    let sum = (a + b);
    alert("Сумма чисел: " + sum);
}