var numberOfTurns = 5;
var IsGameRunning = true;
var minNumber = 0;
var maxNumber = 9;

var randomNumberArray = GenerateFourDigitUniqueValue(minNumber, maxNumber);

alert(`Правила: Загадывается четырехзначное число [X][X][X][X] (от ${minNumber} до ${maxNumber}), в котором не повторяются цифры.\nВаша задача — угадать его.\nПодсказками выступают «коровы» (если цифра угадана, а ее позиция — нет) и «быки» (когда совпадает и цифра, и ее позиция).\nЕсли загадано число «1234», а вы называете «6531» — результатом будет одна корова (цифра «1») и один бык (цифра «3»).\nКоличество попыток: ${numberOfTurns}`);

while(IsGameRunning)
{
    var userAnswerArray = UserAnswer();

    let currentTurn = NumberOfTurns(--numberOfTurns);

    var result = CheckAnswer();

    if(result[1] == userAnswerArray.length)
    {
        alert(`Вы победили!\nУ вас [${result[1]}] - быка`);
        IsGameRunning = false;
    }
    else
    {
        alert(`Во введенном числе: ${userAnswerArray}\n[${result[0]}] - коров; \n[${result[1]}] - быков.\nКоличество попыток ${currentTurn}\n\nПовторите ввод числа`);
        continue;
    }
}

function GetRandomNumberInterval(minNumber, maxNumber)
{
    return parseInt(Math.random() * (maxNumber - minNumber + 1) + minNumber);
}

function NumberOfTurns(maxTurns)
{
    if(maxTurns == 0)
    {
        IsGameRunning = false;
    }

    return maxTurns;
}

function GenerateFourDigitUniqueValue(minNumber, maxNumber)
{
    var fourDigitArray = [];
    var generatedNumbersBuffer = [];

    for (let i = 0; i <= 10; i++)
    {
        generatedNumbersBuffer[i] = GetRandomNumberInterval(minNumber, maxNumber);
    }
    
    var uniqueArrayNumbers = CheckUnique(generatedNumbersBuffer);

    for (let i = 0; i <= 3; i++)
    {
        fourDigitArray[i] = uniqueArrayNumbers[i];
    }

    return fourDigitArray;
}

function CheckUnique(array)
{
    let result = [];
    for (let index of array)
    {
        if (!result.includes(index))
        {
            result.push(index);
        }
    }
    return result;
}

function CheckAnswer()
{
    var resultArray = [];
    var cows = 0;
    var bulls = 0;

    for(var i = 0; i < userAnswerArray.length; i++)
    {
        for(var j = 0; j < randomNumberArray.length; j++)
        {
            if(randomNumberArray[i] == userAnswerArray[j])
            {
                if(i == j)
                {
                    bulls++;
                }
                else
                {
                    cows++;
                }
            }
        }
    }

    resultArray[0] = cows;
    resultArray[1] = bulls;

    return resultArray;
}

function UserAnswer()
{
    var isAnswerChecking = true;

    while(isAnswerChecking)
    {
        var userAnswerArray = prompt("Введите четырехзначное (уникальное) число : ").split('');
        if(userAnswerArray.length == 0)
        {
            alert("Вы ввели пустую строку");
            continue;
        }
        if(userAnswerArray.length > 4)
        {
            alert("Вы ввели число больше четырех");
            continue;
        }
        for(let i = 0; i < userAnswerArray.length; i++)
        {
            userAnswerArray[i] = +userAnswerArray[i];
        }

        var equal = FindEqualNumbers(userAnswerArray);
        if(equal != 0)
        {
            alert("Числа повторяются");
            continue;
        }

        isAnswerChecking = false;
    }

    return userAnswerArray;
}

function FindEqualNumbers(array)
{
    var equalNumbers = 0;
    for (let i = 0; i < array.length; ++i)
    {
        for (let j = i + 1; j < array.length; ++j)
        {                    
            if (array[i] == array[j])
            {
                equalNumbers += array[i];
            }                    
        }
    }
    if(equalNumbers != 0)
    {
        return 1;
    }

    return 0;
}
