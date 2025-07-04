/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
/**
 * АЛГОРИТМ РЕШЕНИЯ ЗАДАЧИ МЕМОИЗАЦИИ:
 * 
 * 1. ОСНОВНАЯ ИДЕЯ:
 *    Мемоизация - это техника оптимизации, которая сохраняет результаты дорогостоящих 
 *    вычислений и возвращает кешированный результат, когда те же входные данные 
 *    встречаются снова.
 * 
 * 2. СТРУКТУРА ДАННЫХ:
 *    - Используем Map для хранения кеша результатов
 *    - Map обеспечивает быстрый поиск O(1) по ключу
 *    - Ключом служит строковое представление аргументов
 * 
 * 3. КЛЮЧИ КЕША:
 *    - Для функций с несколькими аргументами создаем ключ из всех аргументов
 *    - Порядок аргументов важен! (3,2) и (2,3) - разные ключи
 *    - Используем JSON.stringify для преобразования аргументов в строку
 * 
 * 4. СЧЕТЧИК ВЫЗОВОВ:
 *    - Ведем подсчет количества фактических вызовов оригинальной функции
 *    - Увеличиваем только при реальном вызове, не при возврате из кеша
 * 
 * 5. АЛГОРИТМ РАБОТЫ:
 *    а) Проверяем, есть ли результат в кеше для данных аргументов
 *    б) Если есть - возвращаем кешированное значение
 *    в) Если нет - вызываем оригинальную функцию
 *    г) Сохраняем результат в кеш
 *    д) Увеличиваем счетчик вызовов
 *    е) Возвращаем результат
 */

    // Кеш для хранения результатов вычислений
    // Ключ: строковое представление аргументов, Значение: результат функции
    const cache = new Map();
    
    // Счетчик фактических вызовов оригинальной функции
    let callCount = 0;
    
    // Возвращаем новую функцию, которая обертывает оригинальную
    const memoizedFunction = function(...args) {
        // Создаем уникальный ключ для набора аргументов
        // JSON.stringify гарантирует, что (2,3) и (3,2) будут разными ключами
        const key = JSON.stringify(args);
        
        // Проверяем, есть ли результат в кеше
        if (cache.has(key)) {
            // Если есть - возвращаем кешированное значение
            // НЕ увеличиваем счетчик, так как функция не вызывается
            return cache.get(key);
        }
        
        // Если результата нет в кеше:
        // 1. Вызываем оригинальную функцию
        const result = fn(...args);
        
        // 2. Сохраняем результат в кеш
        cache.set(key, result);
        
        // 3. Увеличиваем счетчик реальных вызовов
        callCount++;
        
        // 4. Возвращаем результат
        return result;
    };
    
    // Добавляем метод для получения количества вызовов
    memoizedFunction.getCallCount = function() {
        return callCount;
    };
    
    return memoizedFunction;

/**
 * ОТВЕТЫ НА ВОЗМОЖНЫЕ ВОПРОСЫ:
 * 
 * Q: Почему используется Map вместо обычного объекта?
 * A: Map имеет несколько преимуществ:
 *    - Ключи могут быть любого типа (не только строки)
 *    - Лучшая производительность для частых добавлений/удалений
 *    - Более предсказуемый порядок ключей
 *    - Встроенные методы has(), get(), set()
 * 
 * Q: Почему JSON.stringify для создания ключей?
 * A: JSON.stringify обеспечивает:
 *    - Уникальность ключей для разных комбинаций аргументов
 *    - Правильную обработку порядка аргументов
 *    - Работу с различными типами данных (числа, строки, объекты)
 * 
 * Q: Что если аргументы содержат функции или циклические ссылки?
 * A: JSON.stringify может не сработать с функциями или циклическими объектами.
 *    В реальных проектах можно использовать более сложные алгоритмы хеширования
 *    или библиотеки вроде lodash.isEqual для сравнения аргументов.
 * 
 * Q: Как работает мемоизация для рекурсивных функций?
 * A: Для функций вроде fibonacci мемоизация особенно эффективна:
 *    - fib(5) вызовет fib(4) и fib(3)
 *    - fib(4) вызовет fib(3) и fib(2)
 *    - Но fib(3) уже будет в кеше, поэтому не пересчитается
 *    - Это существенно сокращает количество вычислений
 * 
 * Q: Есть ли ограничения по памяти?
 * A: Да, кеш может расти неограниченно. В производственном коде часто используют:
 *    - LRU (Least Recently Used) кеш с ограниченным размером
 *    - TTL (Time To Live) для автоматического удаления старых записей
 *    - Методы очистки кеша при необходимости
 * 
 * Q: Почему callCount увеличивается только при реальном вызове?
 * A: По условию задачи нужно считать именно вызовы оригинальной функции,
 *    а не обращения к мемоизированной версии. Это важно для измерения
 *    эффективности мемоизации.
 * 
 * Q: Можно ли мемоизировать функции с побочными эффектами?
 * A: Мемоизация подходит только для "чистых" функций - функций, которые:
 *    - Всегда возвращают одинаковый результат для одинаковых аргументов
 *    - Не имеют побочных эффектов (не изменяют внешнее состояние)
 *    - Не зависят от внешнего изменяемого состояния
 * 
 * СЛОЖНОСТЬ АЛГОРИТМА:
 * - Временная сложность: O(1) для поиска в кеше, O(f) для вызова функции
 * - Пространственная сложность: O(n), где n - количество уникальных вызовов
 * 
 * ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ:
 * const sum = (a, b) => a + b;
 * const memoizedSum = memoize(sum);
 * 
 * console.log(memoizedSum(2, 3)); // 5, вызов функции
 * console.log(memoizedSum(2, 3)); // 5, из кеша
 * console.log(memoizedSum.getCallCount()); // 1
 */
}

/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */
