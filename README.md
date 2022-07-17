# css-properties (beta)
Все CSS-свойства и медиавыражения в одном месте. 
Основная задача проекта собрать в одном месте все CSS-свойства, медиавыражения и значения с сортировкой по выходу в браузерах. 

## Для контрибьютеров
[Почитайте небольшой документ как правильнее контрибьютить в проект.](./CONTRIBUTING.md)

## Как запустить проект
1. Установить node.js. Поддерживаемая версия 16
2. Установить зависимости проекта
```bash
npm ci
```
3. Запустить проект
```bash
npm start
```

## Структура проекта
- `site` - файлы для сборки сайта: шаблонизаторы, препроцессоры, данные.
- `build` - автогенерируемые файлы для сайта (прод).
- `файлы в корне` - конфигурационные файлы проекта.