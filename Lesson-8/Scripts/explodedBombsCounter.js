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