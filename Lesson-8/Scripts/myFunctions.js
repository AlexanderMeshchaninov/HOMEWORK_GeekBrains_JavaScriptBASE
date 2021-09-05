/**
 * Счетчик подсчета взорванных бомб c замыканием
 */
export const explodedBombsCounter = () => {
    var bombExplosionCounter = 0;
  
    function counter () {
      bombExplosionCounter += 1;
      const scoreDom = document.getElementById("bomb_explosion");
      scoreDom.innerHTML = `${bombExplosionCounter}`;
      return bombExplosionCounter;
    }
    return counter;
};

/**
  * Получение случайного числа для установки врагов
  */
export const setRandomNumber = () => {
    /**
    * Алгоритм перемешивания массива Фишера-Йетса (загуглил)
    */
    function shuffleArray(array) {
        var currentIndex = array.length, randomIndex;
      
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    };
    const enemyAllowNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,];
    shuffleArray(enemyAllowNumbers);

    let randomIterator = Math.floor(Math.random() * enemyAllowNumbers.length);
    return enemyAllowNumbers[randomIterator];
};

/**
 * Проверка находится ли бомбермен в зоне поражения бомбы
 */
export const checkBombermanToGetDamage = (gameState) => {
    //Нормальная практика впихнуть в одно функцию другую, чтобы код не расползался?
    function splitExplodePositionString(item) {
      let firstStrEl = item.id.replace("cell-position", "");
      let getRowNumberPosition = parseInt(firstStrEl);
      let secondStrEl = item.id.split(",");
      let getColNumberPosition = parseInt(secondStrEl[1]);
      
      gameState.bombExplodePosition.rowNumber = getRowNumberPosition;
      gameState.bombExplodePosition.columnNumber = getColNumberPosition;
    };
    
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