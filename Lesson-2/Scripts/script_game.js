var numberOfTurns = 3;
var IsGamerunning = true;
var randomNumber = GetRandomNumberInt(15);

alert(`Угадайте число от 0 до 15 за ${numberOfTurns} попытки`);

while(IsGamerunning)
{
    let userNumber = +prompt("Введите число : ");
    if(isNaN(userNumber))
    {
        alert("Вы указали не число!");
        continue;
    }

    let currentTurn = NumberOfTurns(--numberOfTurns);

    if(userNumber > randomNumber)
    {
        alert(`Вы указали число больше. \n Количество попыток : ${currentTurn}`);
        continue;
    }
    if(userNumber < randomNumber)
    {
        alert(`Вы указали число меньше. \n Количество попыток : ${currentTurn}`);
        continue;
    }
    if(userNumber == randomNumber)
    {
        alert("Вы угадали число!");
        break;
    }
}

function GetRandomNumberInt(maxRandomNumber)
{
    return parseInt(Math.random() * maxRandomNumber);
}

function NumberOfTurns(maxTurns)
{
    if(maxTurns == 0)
    {
        IsGamerunning = false;
    }

    return maxTurns;
}