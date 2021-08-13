let value = +prompt("Введите число: ");
let power = +prompt("Возведите число в степень: ");

let result = Expontentiation(value, power);
alert(`${value} в степени [${power}] = ${result}`);

//возведение в степень
function Expontentiation(value, power)
{
    //терминальное условие
    if (power == 1)
    {
        return value;
    }

    return value * Expontentiation(value, power - 1);
}