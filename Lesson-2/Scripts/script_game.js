var numberOfTurns = 3;
var IsGamerunning = true;

alert(`Угадайте число от 0 до 15 за ${numberOfTurns} попытки`);

while(IsGamerunning)
{
    let randomNumber = GetRandomNumberInt(15);

    let userNumber = +prompt("Введите число : ");

    if(userNumber == randomNumber)
    {
        alert("Вы угадали число!");
        break;
    }
    let currentTurn = NumberOfTurns(--numberOfTurns);

    alert(`Вы не угадали число, повторите попытку! \n Количество попыток : ${currentTurn}`);
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