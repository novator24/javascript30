function maxProfit(prices: number[]): number {
/**
 * ЗАДАЧА: 122. Best Time to Buy and Sell Stock II
 * 
 * ОПИСАНИЕ АЛГОРИТМА:
 * Эта задача решается с помощью жадного алгоритма. Ключевая идея заключается в том,
 * что для получения максимальной прибыли нужно захватить каждый возможный рост цены.
 * 
 * СТРАТЕГИЯ:
 * 1. Проходим по массиву цен и сравниваем каждый день с предыдущим
 * 2. Если цена сегодня больше чем вчера - это означает, что мы могли бы купить вчера 
 *    и продать сегодня, получив прибыль
 * 3. Суммируем все такие положительные разности
 * 
 * МАТЕМАТИЧЕСКОЕ ОБОСНОВАНИЕ:
 * Допустим, у нас есть цены [1, 3, 5, 2, 4]
 * Оптимальная стратегия: купить в день 1 (цена=1), продать в день 3 (цена=5), 
 * затем купить в день 4 (цена=2), продать в день 5 (цена=4)
 * Прибыль = (5-1) + (4-2) = 4 + 2 = 6
 * 
 * Это эквивалентно: (3-1) + (5-3) + (4-2) = 2 + 2 + 2 = 6
 * То есть сумме всех положительных разностей между соседними днями
 * 
 * ВРЕМЕННАЯ СЛОЖНОСТЬ: O(n) - один проход по массиву
 * ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ: O(1) - используем только одну переменную для прибыли
 */
    
    // Инициализируем переменную для накопления общей прибыли
    let totalProfit = 0;
    
    // Проходим по массиву, начиная со второго элемента
    // Сравниваем каждый день с предыдущим
    for (let i = 1; i < prices.length; i++) {
        // Если цена сегодня больше цены вчера,
        // добавляем разность к общей прибыли
        // Это эквивалентно покупке вчера и продаже сегодня
        if (prices[i] > prices[i - 1]) {
            totalProfit += prices[i] - prices[i - 1];
        }
    }
    
    return totalProfit;

/**
 * ОТВЕТЫ НА ВОЗМОЖНЫЕ ВОПРОСЫ:
 * 
 * Q: Почему этот алгоритм работает корректно?
 * A: Алгоритм основан на том, что любую последовательность покупок и продаж 
 *    можно разложить на сумму разностей между соседними днями. Если мы покупаем 
 *    в день i и продаем в день j, то прибыль равна prices[j] - prices[i], что 
 *    можно записать как сумму (prices[i+1] - prices[i]) + (prices[i+2] - prices[i+1]) + 
 *    ... + (prices[j] - prices[j-1]). Поэтому захватывая все положительные разности,
 *    мы получаем максимально возможную прибыль.
 * 
 * Q: Что если все цены убывают?
 * A: В этом случае не будет ни одной положительной разности, поэтому прибыль 
 *    будет равна 0, что корректно (лучше не покупать вообще).
 * 
 * Q: Можно ли решить эту задачу с помощью динамического программирования?
 * A: Да, можно использовать DP с состояниями "держу акцию" и "не держу акцию", 
 *    но жадный алгоритм проще и эффективнее для этой конкретной задачи.
 * 
 * Q: Почему мы можем использовать жадный подход?
 * A: Потому что нет ограничений на количество транзакций, и мы можем покупать/продавать 
 *    в любой день. Это позволяет захватывать каждый рост цены независимо.
 * 
 * Q: Что если цены одинаковые несколько дней подряд?
 * A: Разность будет равна 0, что не повлияет на общую прибыль. Алгоритм корректно 
 *    обрабатывает такие случаи.
 * 
 * Q: Как обрабатывается случай с массивом из одного элемента?
 * A: Цикл не выполнится ни разу (i = 1, но length = 1), поэтому вернется 0,
 *    что корректно - нельзя совершить сделку с одним днем.
 * 
 * ПРИМЕРЫ РАБОТЫ:
 * 
 * Пример 1: [7,1,5,3,6,4]
 * i=1: 1 < 7, не добавляем
 * i=2: 5 > 1, добавляем 5-1 = 4
 * i=3: 3 < 5, не добавляем  
 * i=4: 6 > 3, добавляем 6-3 = 3
 * i=5: 4 < 6, не добавляем
 * Итого: 4 + 3 = 7
 * 
 * Пример 2: [1,2,3,4,5]
 * Каждый день цена растет: (2-1) + (3-2) + (4-3) + (5-4) = 1+1+1+1 = 4
 * 
 * Пример 3: [7,6,4,3,1]
 * Цены только падают, поэтому прибыль = 0
 */
}
