function divideArray(nums: number[], k: number): number[][] {
    // Шаг 1: сортируем массив
    nums.sort((a, b) => a - b);

    const result: number[][] = [];

    // Шаг 2 и 3: разбиваем на группы по 3 и проверяем условие
    for (let i = 0; i < nums.length; i += 3) {
        const group = nums.slice(i, i + 3);
        const min = group[0];
        const max = group[2];

        // Шаг 4: проверяем разницу
        if (max - min > k) {
            // Если условие не выполняется, возвращаем пустой массив
            return [];
        }

        result.push(group);
    }

    // Шаг 5: возвращаем результат
    return result;
};
