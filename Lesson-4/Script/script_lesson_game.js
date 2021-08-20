const gameField = [
    [null, null, "goblin", null, null, null, null, "troll", null, null],
    ["goblin", null, null, "troll", null, "cyclops", null, null, "goblin", null],
    [null, null, "troll", null, "goblin", null, "goblin", null, null, "cyclops"],
    ["goblin", null, "goblin", null, null, "cyclops", null, null, "goblin", null],
    [null, null, null, null, "goblin", null, "cyclops", "troll", null, "troll"],
    ["troll", "goblin", "cyclops", "goblin", null, null, "goblin", null, "cyclops", null,],
    [null, null, null, null, null, "cyclops", null, null, null, null],
    [null, "cyclops", null, "goblin", "cyclops", null, null, "goblin", null, "troll",],
    ["troll", null, "goblin", null, "goblin", "troll", null, null, null, null],
    [null, "goblin", null, null, null, null, "troll", "goblin", null, "dragon"],
];

//Если побеждаем дракона, то good и выходим из игры.
const MONSTERS = {
    goblin: {
        power: 10,
    },
    troll: {
        power: 20,
    },
    cyclops: {
        power: 50,
    },
    dragon: {
        power: 100,
        isAlive: true,
    },
};

const stateOfGame = {
    player: {
        power: 10,
        position: {
            x: 0,
            y: 0,
        },
    },
};

const GAME_FIELD_SIZE = {
    WIDTH: gameField[0].length,
    HEIGHT: gameField.length,
};

const MOVEMENTS_OF_PLAYER = {
    up: "up",
    down: "down",
    right: "right",
    left: "left",
};

const movementsOfPlayer = {
    up: () => {
        stateOfGame.player.position.y -= 1;
    },
    down: () => {
        stateOfGame.player.position.y += 1;
    },
    right: () => {
        stateOfGame.player.position.x += 1;
    },
    left: () => {
        stateOfGame.player.position.x -= 1;
    },
};

const PLAYER = {
    playerName: "",
};

const logArray = [
    
];

const countOfTurns = {
    count: 0,
};

const validation = () => {
    PLAYER.playerName = prompt("Введите имя игрока: ");
    // TODO: проверить всё ли игровое поле корректное
    // TODO: проверить все ли строки одинаковые
};

const getAvailableMovements = () => {
    const availableMovements = [];

    if (stateOfGame.player.position.y >= 1) {
        availableMovements.push(MOVEMENTS_OF_PLAYER.up);
    }

    if (stateOfGame.player.position.y < GAME_FIELD_SIZE.HEIGHT - 1) {
        availableMovements.push(MOVEMENTS_OF_PLAYER.down);
    }

    if (stateOfGame.player.position.x >= 1) {
        availableMovements.push(MOVEMENTS_OF_PLAYER.left);
    }

    if (stateOfGame.player.position.x < GAME_FIELD_SIZE.WIDTH - 1) {
        availableMovements.push(MOVEMENTS_OF_PLAYER.right);
    }

    return availableMovements;
};

const getMessageForMovement = (availableMovements) => {
    const movementString = `[${PLAYER.playerName}]\nВведите направление движения(${availableMovements.join(", ")}): `;
    const currentCoordinatesString = `Текущие координаты x: ${stateOfGame.player.position.x} y: ${stateOfGame.player.position.y}`;

    return `${currentCoordinatesString}\n${movementString}`;
};

const recordingGameLog = (gameCell) => {
    const dateTime = new Date();
    
    let loggingObject = {
        turns: countOfTurns.count,
        playerName: PLAYER.playerName,
        time: dateTime,
        gameEvent: gameCell,
        coord_X: stateOfGame.player.position.x,
        coord_Y: stateOfGame.player.position.y,
    };

    logArray.push(loggingObject);
};

const playerStatistic = () => {
    
    let isRunning = true;
    while(isRunning) {
        var input = +prompt(`Статистика игры: \nВведите [номер хода], чтобы посмотреть всю статистику [000]`);
        if(isNaN(input)) {
            alert("Не корректный ввод");
            continue;
        }
        if(input === 000) {
            for(let turnAll of logArray) {
                alert(`Имя: ${turnAll.playerName}\nХод: ${turnAll.turns}\nВремя: ${turnAll.time}\nСобытие: ${turnAll.gameEvent}\nX: ${turnAll.coord_X}\nY: ${turnAll.coord_Y}`);
            }
            isRunning = false;
        }
        let turn = logArray[--input];
        alert(`Имя: ${turn.playerName}\nХод: ${turn.turns}\nВремя: ${turn.time}\nСобытие: ${turn.gameEvent}\nX: ${turn.coord_X}\nY: ${turn.coord_Y}`);
        isRunning = false;
    }
};


validation();
var isGameRunning = true;
while (isGameRunning) {

    const availableMovements = getAvailableMovements();
    const stringMovementOfPlayer = prompt(getMessageForMovement(availableMovements));
    if (availableMovements.indexOf(stringMovementOfPlayer) === -1) {
        alert("Некорректный ввод, попробуйте еще раз");
        continue;
    }
    countOfTurns.count += 1;
    
    movementsOfPlayer[stringMovementOfPlayer]();

    // проверка на монстра
    const gameCell = gameField[stateOfGame.player.position.y][stateOfGame.player.position.x];
    // запись ходов

    if (gameCell === null) {
        recordingGameLog(gameCell);
        continue;
    }

    const monster = MONSTERS[gameCell];
    // сражение с монстром
    let messageOfBattle = `[${PLAYER.playerName}]\nВы встретили монстра ${gameCell}\n`;
    if (stateOfGame.player.power >= monster.power) {
        stateOfGame.player.power += monster.power;
        messageOfBattle += "Вы выиграли\n";
        messageOfBattle += `Ваша сила теперь ${stateOfGame.player.power}`;
        if(stateOfGame.player.position.y === 9 && stateOfGame.player.position.x === 9) {
            monster.isAlive = false;
            alert("Драконоборец");
        }
        alert(messageOfBattle);
        recordingGameLog(gameCell);
        if(monster.isAlive === false) isGameRunning = false;
    }
    else {
        messageOfBattle += "Вы проиграли\n";
        messageOfBattle += "Конец игры";
        alert(messageOfBattle);
        recordingGameLog(gameCell);
        isGameRunning = false;
    }

    //Выход из игры
    if(isGameRunning == false) {
        playerStatistic();
        break;
    }
}
