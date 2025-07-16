/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
/*
АЛГОРИТМ РЕШЕНИЯ:
1. Функция cancellable принимает три параметра:
   - fn: функция, которую нужно выполнить
   - args: массив аргументов для функции
   - t: время задержки в миллисекундах

2. Внутри функции:
   - Создаем setTimeout, который выполнит функцию fn через t миллисекунд
   - Сохраняем ID таймаута, чтобы можно было его отменить
   - Используем fn.apply(null, args) для вызова функции с массивом аргументов

3. Возвращаем функцию отмены, которая:
   - При вызове использует clearTimeout для отмены запланированного выполнения
   - Эта функция и есть cancelFn, которая передается в setTimeout

4. Механизм работы:
   - Если cancelFn вызывается до истечения времени t, функция fn не выполнится
   - Если cancelFn вызывается после времени t, функция fn уже будет выполнена
*/

    // Store the timeout ID so we can clear it if cancelled
    let timeoutId = setTimeout(() => {
        fn.apply(null, args);
    }, t);
    
    // Return the cancel function
    return function() {
        clearTimeout(timeoutId);
    }  

/*
ОТВЕТЫ НА ВОЗМОЖНЫЕ ВОПРОСЫ:

1. Почему используется fn.apply вместо прямого вызова?
   - apply позволяет передать массив аргументов как список параметров
   - Это необходимо, так как args приходит как массив, а нам нужно передать его элементы как отдельные аргументы

2. Почему используется let для timeoutId?
   - let используется вместо var для блочной области видимости
   - Это предотвращает возможные проблемы с замыканиями

3. Почему не используется async/await?
   - setTimeout уже асинхронный
   - Задача не требует дополнительной асинхронности
   - Использование промисов усложнило бы решение

4. Что произойдет если cancelFn вызвать несколько раз?
   - Ничего страшного, clearTimeout безопасно обрабатывает повторные вызовы
   - После первой отмены последующие вызовы ничего не сделают

5. Почему не нужно очищать timeoutId после выполнения функции?
   - После выполнения setTimeout таймер автоматически очищается
   - Даже если вызвать clearTimeout после выполнения, это безопасно
*/
};

/**
 *  const result = [];
 *
 *  const fn = (x) => x * 5;
 *  const args = [2], t = 20, cancelTimeMs = 50;
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
 *  const maxT = Math.max(t, cancelTimeMs);
 *           
 *  setTimeout(cancel, cancelTimeMs);
 *
 *  setTimeout(() => {
 *      console.log(result); // [{"time":20,"returned":10}]
 *  }, maxT + 15)
 */
