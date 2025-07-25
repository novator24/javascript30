# pnpm package.json - Конфигурация пакетов

## Описание урока

Данный урок охватывает работу с файлом `package.json` в контексте пакетного менеджера [pnpm](https://pnpm.io/package_json). 

### Основные темы урока:

**1. Основы package.json**
- Манифест-файл пакета с метаданными (зависимости, автор, версия и т.д.)
- Поддержка форматов: `package.json`, `package.json5`, `package.yaml`

**2. Поле engines**
- Указание требуемых версий Node.js и pnpm
- Контроль совместимости в процессе разработки

**3. dependenciesMeta**
- Дополнительная мета-информация для зависимостей
- **injected** - создание жестких ссылок вместо символических для workspace пакетов
- Решение проблем с peer dependencies в монорепозиториях

**4. peerDependenciesMeta** 
- Управление peer dependencies
- **optional** - пометка peer dependencies как необязательных

**5. publishConfig**
- Переопределение полей перед публикацией пакета
- **executableFiles** - пометка файлов как исполняемых
- **directory** - кастомизация публикуемой поддиректории
- **linkDirectory** - симлинкинг во время разработки

---

## Тест по материалу

### Вопрос 1
Какие форматы файлов поддерживает pnpm для описания пакета?

A) Только package.json  
B) package.json и package.yaml  
C) package.json, package.json5 и package.yaml **ПРАВИЛЬНО**  
D) package.json и package.xml

### Вопрос 2
Что происходит, когда для зависимости в workspace установлено `"injected": true`?

A) Зависимость игнорируется при установке  
B) Создается символическая ссылка на исходную директорию  
C) Создается жесткая ссылка в виртуальном хранилище **ПРАВИЛЬНО**  
D) Зависимость загружается из npm registry

### Вопрос 3
Для чего используется поле `publishConfig.executableFiles`?

A) Для указания файлов, которые нужно исключить из публикации  
B) Для пометки дополнительных файлов как исполняемых (+x), не указанных в bin **ПРАВИЛЬНО**  
C) Для указания точки входа в приложение  
D) Для настройки процесса сборки пакета

---

## Полезные ссылки

- [Официальная документация pnpm package.json](https://pnpm.io/package_json)
- [pnpm Workspace](https://pnpm.io/workspaces)
- [Node.js package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)

---

*Урок подготовлен на основе официальной документации pnpm* 
