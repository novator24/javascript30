/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
/**
 * АЛГОРИТМ РЕШЕНИЯ:
 * 
 * 1. Функция должна немедленно вызвать fn с аргументами args
 * 2. Установить интервал, который будет вызывать fn с args каждые t миллисекунд
 * 3. Вернуть функцию отмены, которая очистит интервал при вызове
 * 
 * Ключевые моменты:
 * - Используем setInterval для повторных вызовов
 * - Сохраняем ID интервала для возможности его отмены
 * - Возвращаемая функция должна вызвать clearInterval
 * - Первый вызов происходит немедленно (time: 0)
 */

    // Немедленно вызываем функцию с переданными аргументами
    fn(...args);
    
    // Устанавливаем интервал для повторных вызовов каждые t миллисекунд
    const intervalId = setInterval(() => {
        fn(...args);
    }, t);
    
    // Возвращаем функцию отмены, которая очищает интервал
    return function cancelFn() {
        clearInterval(intervalId);
    };

/**
 * ОТВЕТЫ НА ВОЗМОЖНЫЕ ВОПРОСЫ:
 * 
 * Q: Почему мы вызываем fn(...args) перед setInterval?
 * A: По условию задачи первый вызов должен произойти немедленно (в момент времени 0),
 *    а затем повторяться каждые t миллисекунд.
 * 
 * Q: Что такое spread оператор (...args)?
 * A: Это современный способ передачи массива аргументов как отдельных параметров функции.
 *    Эквивалентно fn.apply(null, args), но более читаемо.
 * 
 * Q: Зачем сохранять intervalId?
 * A: Чтобы иметь возможность остановить интервал с помощью clearInterval.
 *    Каждый setInterval возвращает уникальный ID.
 * 
 * Q: Может ли cancelFn вызываться несколько раз?
 * A: Да, clearInterval безопасно вызывать несколько раз с одним ID.
 *    После первого вызова интервал уже будет очищен.
 * 
 * Q: Что происходит, если t очень маленький?
 * A: JavaScript имеет минимальную задержку ~4ms для setInterval,
 *    но по условию t >= 30ms, поэтому это не проблема.
 * 
 * ПРИМЕР ИСПОЛЬЗОВАНИЯ:
 * const cancelFn = cancellable((x) => x * 2, [4], 35);
 * setTimeout(cancelFn, 190); // остановит через 190ms
 */
 
};

/**
 *  const result = [];
 *
 *  const fn = (x) => x * 2;
 *  const args = [4], t = 35, cancelTimeMs = 190;
 *
 *  const start = performance.now();
 *
 *  const log = (...argsArr) => {
 *      const diff = Math.floor(performance.now() - start);
 *      result.push({"time": diff, "returned": fn(...argsArr)});
 *  }
 *       
 *  const cancel = cancellable(log, args, t);
 *
 *  setTimeout(cancel, cancelTimeMs);
 *   
 *  setTimeout(() => {
 *      console.log(result); // [
 *                           //     {"time":0,"returned":8},
 *                           //     {"time":35,"returned":8},
 *                           //     {"time":70,"returned":8},
 *                           //     {"time":105,"returned":8},
 *                           //     {"time":140,"returned":8},
 *                           //     {"time":175,"returned":8}
 *                           // ]
 *  }, cancelTimeMs + t + 15)    
 */
