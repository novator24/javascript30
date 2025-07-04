# useState Hook in React

`useState` — это React Hook, который позволяет добавлять состояние в функциональные компоненты.

## Краткое содержание урока

- `useState` вызывается на верхнем уровне компонента и возвращает массив из двух элементов: текущее состояние и функцию для его обновления.
- Начальное состояние (`initialState`) может быть значением любого типа или функцией-инициализатором, которая вызывается только при первом рендере.
- Функция обновления состояния (`setState`) принимает новое значение или функцию-обновлятор, которая получает текущее состояние и возвращает новое.
- Обновление состояния через `setState` запускает повторный рендер компонента с новым состоянием.
- Важно не мутировать объекты и массивы в состоянии, а создавать новые копии с изменениями.
- При нескольких вызовах `setState` с вычислением на основе предыдущего состояния рекомендуется использовать функцию-обновлятор для корректного последовательного обновления.
- Для оптимизации инициализации состояния можно передавать функцию-инициализатор, чтобы избежать затратных вычислений при каждом рендере.
- С помощью атрибута `key` можно сбрасывать состояние компонента, заставляя React пересоздавать его.
- В редких случаях можно обновлять состояние во время рендера, но обычно это не рекомендуется.

## Тест по уроку

1. Что возвращает хук `useState`?  
   - a) Текущее состояние и функцию для его обновления — **ПРАВИЛЬНО**  
   - b) Только текущее состояние  
   - c) Только функцию для обновления состояния  
   - d) Объект с методами жизненного цикла  

2. Как правильно обновлять состояние, если новое значение зависит от предыдущего?  
   - a) Вызывать `setState` с новым значением напрямую  
   - b) Использовать функцию-обновлятор, принимающую предыдущее состояние и возвращающую новое — **ПРАВИЛЬНО**  
   - c) Мутировать текущее состояние и вызывать `setState` без аргументов  
   - d) Использовать `useEffect` для обновления состояния  

3. Что произойдет, если передать функцию-инициализатор в `useState`?  
   - a) Функция будет вызвана при каждом рендере  
   - b) Функция будет вызвана только при первом рендере для получения начального состояния — **ПРАВИЛЬНО**  
   - c) React вызовет функцию дважды в продакшене  
   - d) Это вызовет ошибку  

