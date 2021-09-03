import {
  tickPerSecond,
  gameFieldWidth,
  gameFieldHeight,
  CELL_TYPE,
  bombExplositonTime,
  bombStopTime,
} from "./constants.js";

let gameField;
const gameState = {
  bomberman: {
    position: {
      rowNumber: 0,
      columnNumber: 0,
    },
  },
  enemy: {
    position: {
      rowNumber: 0,
      columnNumber: 0,
    },
  },
  bombs: [],
  bombExplodeSize: 3,
  bombExploseCells: {
  },
  bombExplodePosition: {
    rowNumber: 0,
    columnNumber: 0,
  },
  gameTickHandler: null,
};

const htmlPositionAttributeName = "cell-position";

let bombExplosionCounter = 0;

/**
 * Создание двойного массива и заполнение игрового поля null
 */
const createGameField = () => {
  const gameFieldRows = new Array(gameFieldHeight).fill(null);

  gameField = gameFieldRows.map(() => {
    return new Array(gameFieldWidth).fill(null);
  });
};

/**
 * Установка id в DOM элементы, для взаимодействия с ними
 */
const setDomTreeAttributes = () => {
  const allCells = document.querySelectorAll(".cell");
  for (let i = 0; i < allCells.length; i++) {
    const numberOfRow = Math.floor(i / gameFieldHeight);
    const numberOfColumn = i % gameFieldWidth;

    allCells[i].id = generateCellId(numberOfRow, numberOfColumn);
  }
};

/**
 * Генерация id ячейки
 */
const generateCellId = (rowNumber, columnNumber) => {
  return `${htmlPositionAttributeName}${rowNumber},${columnNumber}`;
};

/**
 * Получение DOM элемента по позиции в gameField
 */
const getCellDomElement = (rowNumber, columnNumber) => {
  return document.getElementById(generateCellId(rowNumber, columnNumber));
};

/**
 * Получение позиции в gameField из id DOM элемента
 */
const getPositionById = (cellElement) => {
  const cellId = cellElement.id;
  const arrayOfPosition = cellId
    .replace(htmlPositionAttributeName, "")
    .split(",");

  return {
    rowNumber: arrayOfPosition[0],
    columnNumber: arrayOfPosition[1],
  };
};

/**
 * Установка бомбы (gameField и DOM)
 */
const setBombPosition = (rowNumber, columnNumber) => {
  gameField[rowNumber][columnNumber] = CELL_TYPE.BOMB;

  gameState.bombs.push({ rowNumber, columnNumber, startTimeMs: Date.now() });

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMB);
};

/**
 * Установка позиции бомбермена, с удалением старой позиции
 */
const setBombermanPosition = (rowNumber, columnNumber) => {
  gameState.bomberman.position.rowNumber = rowNumber;
  gameState.bomberman.position.columnNumber = columnNumber;

  const currentBombermanPositionElement = document.querySelector(
    `.${CELL_TYPE.BOMBERMAN}`
  );
  if (currentBombermanPositionElement !== null) {
    const bombermanPosition = getPositionById(currentBombermanPositionElement);
    gameField[bombermanPosition.rowNumber][bombermanPosition.columnNumber] =
      null;

    currentBombermanPositionElement.classList.remove(CELL_TYPE.BOMBERMAN);
  }

  gameField[rowNumber][columnNumber] = CELL_TYPE.BOMBERMAN;

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMBERMAN);
};

const shuffleArray = (array) => {
  //Алгоритм перемешивания массива Фишера-Йетса (загуглил)
  var currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

/**
 * Получение случайного числа для установки врагов
 */
const setRandomNumber = () => {
  const enemyAllowNumbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
  ];
  shuffleArray(enemyAllowNumbers);
  let randomIterator = Math.floor(Math.random() * enemyAllowNumbers.length);
  return enemyAllowNumbers[randomIterator];
};

/**
 * Установка позиций противников
 */
 const setEnemyPosition = () => {
  let rowNumber = setRandomNumber();
  let columnNumber = setRandomNumber();

  gameState.enemy.position.rowNumber = rowNumber;
  gameState.enemy.position.columnNumber = columnNumber;

  gameField[rowNumber][columnNumber] = CELL_TYPE.ENEMY;

  const startEnemyElement = getCellDomElement(rowNumber, columnNumber);
  startEnemyElement.classList.add(CELL_TYPE.ENEMY);
};

/**
 * Инициализация игрового поля
 */
export const initializeGameField = () => {
  createGameField();
  setDomTreeAttributes();
  setBombermanPosition(0, 0);
  setEnemyPosition();
  setEnemyPosition();
  setEnemyPosition();
  setEnemyPosition();
  setEnemyPosition();
  setEnemyPosition();
};

/**
 * Обработчик нажатий на клавиатуре
 */
export const setUpKeyboardHandlers = () => {
  document.body.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (gameState.bomberman.position.columnNumber > 0) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber - 1
          );
        }
        //Задание 2.
        else {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber = 15
          );
        };
        break;

      case "ArrowRight":
        if (gameState.bomberman.position.columnNumber < gameFieldWidth - 1) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber + 1
          );
        }
        //Задание 2.
        else {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber = 0
          );
        };
        break;

      case "ArrowDown":
        if (gameState.bomberman.position.rowNumber < gameFieldHeight - 1) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber + 1,
            gameState.bomberman.position.columnNumber
          );
        }
        //Задание 2.
        else {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber = 0,
            gameState.bomberman.position.columnNumber,
          );
        };
        break;
      case "ArrowUp":
        if (gameState.bomberman.position.rowNumber > 0) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber - 1,
            gameState.bomberman.position.columnNumber
          );
        }
        //Задание 2.
        else {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber = 15,
            gameState.bomberman.position.columnNumber,
          );
        };
        break;
      case " ":
        // поставить бомбу
        setBombPosition(
          gameState.bomberman.position.rowNumber,
          gameState.bomberman.position.columnNumber
        );
        break;
    }
  });
};

/**
 * Взрыв бомбы, рисование крестика
 */
const explodeBomb = (i) => {
  // удаление иконки бомбы
  const explodedBomb = gameState.bombs.splice(i, 1)[0];

  const elementWithBomb = getCellDomElement(
    explodedBomb.rowNumber,
    explodedBomb.columnNumber
  );
  elementWithBomb.classList.remove(CELL_TYPE.BOMB);

  // рисование взрыва по вертикали (gameState и DOM)
  for (let i = 0; i < gameState.bombExplodeSize * 2 - 1; i++) {
    const explodeRowNumber =
      explodedBomb.rowNumber - (gameState.bombExplodeSize - 1) + i;
    if (explodeRowNumber < 0 || explodeRowNumber >= gameFieldHeight) {
      continue;
    }
    const cellForExplode = getCellDomElement(
      explodeRowNumber,
      explodedBomb.columnNumber
    );
    cellForExplode.classList.add(CELL_TYPE.EXPLOSION);
    
    // gameState
    gameState.bombExploseCells[
      `${explodeRowNumber},${explodedBomb.columnNumber}`
    ] = Date.now();
  }
  // рисование взрыва по горизонтали (gameState и DOM)
  for (let i = 0; i < gameState.bombExplodeSize * 2 - 1; i++) {
    const explodeColumnNumber =
      explodedBomb.columnNumber - (gameState.bombExplodeSize - 1) + i;
    if (explodeColumnNumber < 0 || explodeColumnNumber >= gameFieldWidth) {
      continue;
    }
    const cellForExplode = getCellDomElement(
      explodedBomb.rowNumber,
      explodeColumnNumber
    );
    cellForExplode.classList.add(CELL_TYPE.EXPLOSION);

    // gameState
    gameState.bombExploseCells[
      `${explodedBomb.rowNumber},${explodeColumnNumber}`
    ] = Date.now();
  }
  countOfExpodedBombs();
  checkBombermanToGetDamage();
};

const splitExplodePositionString = (item) => {
  let firstStrEl = item.id.replace("cell-position", "");
  let getRowNumberPosition = parseInt(firstStrEl);
  let secondStrEl = item.id.split(",");
  let getColNumberPosition = parseInt(secondStrEl[1]);

  gameState.bombExplodePosition.rowNumber = getRowNumberPosition;
  gameState.bombExplodePosition.columnNumber = getColNumberPosition;
};

/**
 * Проверка находится ли бомбермен в зоне поражения бомбы
 */
const checkBombermanToGetDamage = () => {
  const cellExplode = document.getElementsByClassName("cell explosion");
  for (let item of cellExplode) {
    splitExplodePositionString(item);

    if (gameState.bomberman.position.rowNumber === gameState.bombExplodePosition.rowNumber 
      && gameState.bomberman.position.columnNumber === gameState.bombExplodePosition.columnNumber) {
        gameState.gameTickHandler = setTimeout(() => {
          alert("Bomberman died (X_X)");
          return;
        }, 1000);
    }
  }
  return;
};

//Задание 1:
const countOfExpodedBombs = () => {
  bombExplosionCounter += 1;
  const scoreDom = document.getElementById("bomb_explosion");
  scoreDom.innerHTML = `${bombExplosionCounter}`;
};

/**
 * Проверка что пора бомбе взорваться
 * Вызывается на каждом тике
 */
const checkBombsExplosion = () => {
  const currentTime = Date.now();
  for (let i = gameState.bombs.length - 1; i >= 0; i--) {
    const bomb = gameState.bombs[i];
    if (currentTime - bomb.startTimeMs > bombExplositonTime) {
      // взорвать бомбу
      explodeBomb();
    }
  }
};

/**
 * Тушения взрыва бомб, в gameState и DOM дереве
 * Вызывается каждый тик
 */
const checkBombsStop = () => {
  const currentTime = Date.now();
  for (const explodeCellKey in gameState.bombExploseCells) {
    if (
      currentTime - gameState.bombExploseCells[explodeCellKey] >=
      bombStopTime
    ) {
      // удалить из gameState.bombExploseCells поле
      delete gameState.bombExploseCells[explodeCellKey];

      // убрать из DOM класс
      const [explodeCellRow, explodeCellColumn] = explodeCellKey.split(",");
      const explodeCell = getCellDomElement(explodeCellRow, explodeCellColumn);
      explodeCell.classList.remove(CELL_TYPE.EXPLOSION);
    }
  }
};

/**
 * Обработчик на каждом тике игры
 */
export const startGame = () => {
  gameState.gameTickHandler = setInterval(() => {
    checkBombsExplosion();
    checkBombsStop();
  }, 1000 / tickPerSecond);
};

/**
 * Остановка обработчика тиков игры
 */
export const stopGame = () => {
  clearInterval(gameState.gameTickHandler);
};
