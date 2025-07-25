function maxProfit(prices: number[], fee: number): number {
/**
 * АЛГОРИТМ РЕШЕНИЯ ЗАДАЧИ "BEST TIME TO BUY AND SELL STOCK WITH TRANSACTION FEE"
 * 
 * Задача: Найти максимальную прибыль от покупки и продажи акций с учетом транзакционной комиссии.
 * 
 * ПОДХОД: Динамическое программирование с двумя состояниями
 * 
 * СОСТОЯНИЯ:
 * 1. hold (держим акцию) - максимальная прибыль в текущий день, если у нас есть акция
 * 2. sold (не держим акцию) - максимальная прибыль в текущий день, если у нас нет акции
 * 
 * ПЕРЕХОДЫ МЕЖДУ СОСТОЯНИЯМИ:
 * 
 * В каждый день мы можем:
 * 1. Если держим акцию (hold):
 *    - Продолжить держать акцию с предыдущего дня: hold[i-1]
 *    - Купить акцию сегодня: sold[i-1] - prices[i]
 *    hold[i] = max(hold[i-1], sold[i-1] - prices[i])
 * 
 * 2. Если не держим акцию (sold):
 *    - Продолжить не держать акцию: sold[i-1]
 *    - Продать акцию сегодня: hold[i-1] + prices[i] - fee
 *    sold[i] = max(sold[i-1], hold[i-1] + prices[i] - fee)
 * 
 * БАЗОВЫЕ СЛУЧАИ:
 * - hold[0] = -prices[0] (купили акцию в первый день)
 * - sold[0] = 0 (не покупали акцию в первый день)
 * 
 * ОПТИМИЗАЦИЯ ПО ПАМЯТИ:
 * Поскольку текущее состояние зависит только от предыдущего дня,
 * можем использовать две переменные вместо массивов.
 * 
 * ВРЕМЕННАЯ СЛОЖНОСТЬ: O(n), где n - количество дней
 * ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ: O(1) - используем только две переменные
 */

    const n = prices.length;
    
    // Базовые случаи для первого дня
    let hold = -prices[0];  // Купили акцию в первый день
    let sold = 0;           // Не покупали акцию в первый день
    
    // Проходим по всем дням, начиная со второго
    for (let i = 1; i < n; i++) {
        // Сохраняем предыдущие значения для расчетов
        const prevHold = hold;
        const prevSold = sold;
        
        // Обновляем состояние "держим акцию"
        // Либо продолжаем держать с предыдущего дня, либо покупаем сегодня
        hold = Math.max(prevHold, prevSold - prices[i]);
        
        // Обновляем состояние "не держим акцию"
        // Либо продолжаем не держать, либо продаем сегодня (вычитаем комиссию)
        sold = Math.max(prevSold, prevHold + prices[i] - fee);
    }
    
    // Возвращаем максимальную прибыль без акций в руках
    // (в конце всегда выгоднее не держать акции)
    return sold;

/**
 * ОТВЕТЫ НА ВОЗМОЖНЫЕ ВОПРОСЫ:
 * 
 * Q: Почему мы возвращаем sold, а не max(hold, sold)?
 * A: В конце торгового периода всегда выгоднее не держать акции,
 *    так как акции сами по себе не приносят прибыль. Если hold > sold,
 *    это означает, что мы можем продать акцию и получить еще больше прибыли.
 * 
 * Q: Почему комиссия вычитается только при продаже?
 * A: По условию задачи, комиссия взимается за транзакцию (покупка + продажа).
 *    Удобнее вычитать ее при продаже, чем распределять между покупкой и продажей.
 * 
 * Q: Что если fee больше разности между максимальной и минимальной ценой?
 * A: В этом случае любая транзакция будет убыточной, и алгоритм правильно
 *    вернет 0 (не совершать транзакций).
 * 
 * Q: Можно ли решить эту задачу жадным алгоритмом?
 * A: Да, можно. Идея: накапливать прибыль пока цена растет, и "фиксировать"
 *    транзакцию когда накопленная прибыль превышает комиссию. Но DP подход
 *    более интуитивен и проще в понимании.
 * 
 * Q: Как работает пример prices = [1,3,2,8,4,9], fee = 2?
 * A: День 0: hold = -1, sold = 0
 *    День 1: hold = max(-1, 0-3) = -1, sold = max(0, -1+3-2) = 0
 *    День 2: hold = max(-1, 0-2) = -1, sold = max(0, -1+2-2) = 0
 *    День 3: hold = max(-1, 0-8) = -1, sold = max(0, -1+8-2) = 5
 *    День 4: hold = max(-1, 5-4) = 1, sold = max(5, -1+4-2) = 5
 *    День 5: hold = max(1, 5-9) = 1, sold = max(5, 1+9-2) = 8
 *    Ответ: 8
 * 
 * Q: Почему не используем классический подход с покупкой на минимуме?
 * A: Из-за комиссии стратегия меняется. Иногда выгоднее пропустить
 *    небольшие колебания цены, если прибыль не покрывает комиссию.
 *    DP автоматически учитывает все эти нюансы.
 */
}
