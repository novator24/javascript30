/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function(n) {
    
    return function() {
        // Возвращаем текущее значение n, затем увеличиваем n на 1
        return n++;
    };
};
