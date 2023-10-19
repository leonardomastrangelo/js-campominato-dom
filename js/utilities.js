// utilities

/**
 * [getRndInteger]
 * Genera un numero intero random
 * @param {Number} max //limite massimo
 * @param {Number} min //limite minimo
 * @returns {Number} //numero generato
*/
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

/**
 * [isEven]
 * Determina se il numero è pari
 * @param {Number} num 
 * @returns {Boolean}
 */
function isEven(num) {
  return (num % 2 === 0) ? true : false;
}