/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation
 * class Iterator {
 *      hasNext(): boolean {}
 *
 *      next(): number {}
 * }
 */

class PeekingIterator {
/**
 * ДЕТАЛЬНОЕ ОПИСАНИЕ АЛГОРИТМА РЕШЕНИЯ:
 * 
 * Задача заключается в создании "заглядывающего" итератора, который позволяет 
 * просматривать следующий элемент без его потребления (метод peek).
 * 
 * ОСНОВНАЯ ИДЕЯ:
 * Используем паттерн "кэширование следующего элемента" (lookahead caching):
 * - Храним следующий элемент в переменной cachedNext
 * - Используем флаг hasCachedNext для отслеживания наличия кэшированного значения
 * - При вызове peek() возвращаем кэшированное значение, не перемещая указатель
 * - При вызове next() возвращаем кэшированное значение и обновляем кэш
 * 
 * АЛГОРИТМ РАБОТЫ:
 * 1. Конструктор: Инициализируем базовый итератор, кэш пустой
 * 2. peek(): Если кэш пуст - загружаем следующий элемент в кэш, возвращаем кэшированное значение
 * 3. next(): Если кэш пуст - загружаем элемент, возвращаем и очищаем кэш
 * 4. hasNext(): Проверяем наличие кэшированного элемента или элементов в базовом итераторе
 * 
 * СЛОЖНОСТЬ:
 * - Временная: O(1) для всех операций
 * - Пространственная: O(1) - храним только один дополнительный элемент
 * 
 * ИНВАРИАНТЫ:
 * - Если hasCachedNext = true, то cachedNext содержит следующий элемент
 * - Порядок элементов сохраняется
 * - Каждый элемент возвращается ровно один раз через next()
 */

/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation
 * class Iterator {
 *      hasNext(): boolean {}
 *
 *      next(): number {}
 * }
 */

    private iterator: Iterator;
    private cachedNext: number | null = null;
    private hasCachedNext: boolean = false;

    constructor(iterator: Iterator) {
        this.iterator = iterator;
    }

    /**
     * Возвращает следующий элемент без перемещения указателя
     * Если кэш пуст, загружает следующий элемент из базового итератора
     */
    peek(): number {
        if (!this.hasCachedNext) {
            this.cachedNext = this.iterator.next();
            this.hasCachedNext = true;
        }
        return this.cachedNext!;
    }

    /**
     * Возвращает следующий элемент и перемещает указатель
     * Если есть кэшированный элемент - возвращает его и очищает кэш
     * Иначе получает элемент напрямую из базового итератора
     */
    next(): number {
        if (this.hasCachedNext) {
            const result = this.cachedNext!;
            this.cachedNext = null;
            this.hasCachedNext = false;
            return result;
        }
        return this.iterator.next();
    }

    /**
     * Проверяет наличие следующих элементов
     * Учитывает как кэшированный элемент, так и элементы в базовом итераторе
     */
    hasNext(): boolean {
        return this.hasCachedNext || this.iterator.hasNext();
    }

/**
 * ОТВЕТЫ НА ВОЗМОЖНЫЕ ВОПРОСЫ:
 * 
 * Q: Почему используется кэширование вместо создания копии итератора?
 * A: Копирование итератора может быть дорогой операцией или вообще невозможной.
 *    Кэширование одного элемента - это минимальное и эффективное решение.
 * 
 * Q: Что произойдет, если вызвать peek() несколько раз подряд?
 * A: Вернется один и тот же элемент, так как кэш не обновляется при peek().
 *    Это корректное поведение согласно спецификации.
 * 
 * Q: Почему используется флаг hasCachedNext вместо проверки cachedNext !== null?
 * A: Элемент может быть null или undefined, поэтому нужен отдельный флаг для
 *    отслеживания валидности кэша.
 * 
 * Q: Как обрабатывается случай, когда итератор пустой?
 * A: hasNext() вернет false, и вызовы next()/peek() будут делегированы базовому
 *    итератору, который должен корректно обработать эту ситуацию.
 * 
 * Q: Можно ли сделать решение generic для работы с любыми типами?
 * A: Да, можно заменить number на generic тип T:
 *    class PeekingIterator<T> {
 *        private cachedNext: T | null = null;
 *        peek(): T { ... }
 *        next(): T { ... }
 *    }
 * 
 * Q: Потокобезопасно ли это решение?
 * A: Нет, для многопоточного использования потребуется синхронизация доступа
 *    к полям cachedNext и hasCachedNext.
 * 
 * Q: Как тестировать это решение?
 * A: Основные сценарии:
 *    - Чередование next() и peek()
 *    - Множественные вызовы peek()
 *    - hasNext() на пустом и непустом итераторе
 *    - Полное потребление всех элементов
 * 
 * ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ:
 * 
 * const iter = new PeekingIterator(new ArrayIterator([1, 2, 3]));
 * console.log(iter.next());    // 1
 * console.log(iter.peek());    // 2
 * console.log(iter.peek());    // 2 (тот же элемент)
 * console.log(iter.next());    // 2
 * console.log(iter.hasNext()); // true
 * console.log(iter.next());    // 3
 * console.log(iter.hasNext()); // false
 */

}

/**
 * Your PeekingIterator object will be instantiated and called as such:
 * var obj = new PeekingIterator(iterator)
 * var param_1 = obj.peek()
 * var param_2 = obj.next()
 * var param_3 = obj.hasNext()
 */
