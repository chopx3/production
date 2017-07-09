## Общие js
### [calendar.js](common.md#calendarjs-1)
### [commonData.js](common.md#commondatajs-1)
___
### calendar.js
#### Логика работы календаря 
#### Функции
1.  [cb(start,end)](common.md#cbstartend)
2.  [dateSingleCalendar(start)](common.md#datesinglecalendarstart)
3.  [changeDate(start,end)](common.md#changedatestartend) 
4.  [createSingleCalendar(startDate)](common.md#createsinglecalendarstartdate)
5.  [createCalendar(startDate,endDate)](common.md#createcalendarstartdateenddate)
6.  [startSingleCalendar(start)](common.md#startsinglecalendarstart)
7.  [startCalendar()](common.md#startcalendar)
8.  [afterClickActions()](common.md#afterclickactions)
___

#### Глобальные переменные
1. startDate, endDate - начальная и конечная дата для календаря
___

##### cb(start,end)
функция для установки переменных startDate и endDate для передачи в функции статистики, звонков итд. Проверка на вид передаваемой даты, конвертация в цифровой вид (11.11.2011)
##### dateSingleCalendar(start)
дублирующая функция, но для одной даты, вторая выставляется автоматически.
##### changeDate(start,end)
функция для смены дат начала и окончания, сделано для сохранения даты в dayCalls. Потом отдает дальше на отрисовку в drawDayCalls. 
##### createSingleCalendar(startDate)
Создание календаря со стандартными значениями дней, месяцев и первым днем. Одинарная дата, выезд влево.
##### createCalendar(startDate, endDate)
Тоже самое, но для двойного календаря.
##### startSingleCalendar(start)
Функция для старта одинарного календаря. Создать календарь, записать даты в календарь
##### startCalendar()
Тоже самое для двойного календаря. Создать, записать даты, получить статистику по этим датам.
##### afterClickActions()
отдельная функция, вызываемая после нажатия каждой кнопки, отрисовка календаря, передача данных + передача переменной "дата" для сохранения инфы в статистике. Также содержит в себе логику нажатия каждой кнопки. Вчера, сегодня, неделя, месяц.
___
### commonData.js
#### Файл с общими функциями, а также со всеми URL. Чтобы легко было их держать в одном месте.
#### Функции
1.  [document.ready()](common.md#documentready)
2.  [RestPost](common.md#restpost)
3.  [sorting(json,key)](common.md#sortingjsonkey)
4.  [getQuestions()](common.md#getquestions)
5.  [getCategories()](common.md#getcategories)
6.  [collectMultipleCalls(options)](common.md#collectmultiplecallsoptions)
7.  [getUniqueData(data)](common.md#getuniquedatadata)
___

#### Глобальные переменные
##### Все URL,
которые используются в сервисе.
##### Categories = []
массив для хранения названия категорий
##### Questions = []
тоже самое для вопросов
##### dateFormat = 'DD.MM.YYYY HH:mm:ss'
общий формат для отображения даты
##### iJump 
для объединения звонков, прыжок на это количество в цикле
___
#### document.ready()
загрузка информации о вопросах и о категориях для отображения на звонках
#### RestPost
= function(sendData, url){...}
стандартный ajax запрос к базе, с уже заполненными параметрами ( json, post, JSON.stringify(data) итд)
#### sorting(json,key)
Сортировка json объекта по ключу (key). В обратном порядке.
#### getQuestions()
получить массив вопросов, если длина больше 20 - обрезать
#### getCategories()
получить массив категорий, если длина больше 20 - обрезать
#### collectMultipleCalls(options)
функция отрисовки нескольких звонков, получает на вход объект options, переменные onPlay и isItSameAgent опциональные, если их нет - дефолтное значение. Проверяет до конца списка, пока не находит звонок, chainId которого не совпадает -> break, попутно плюсуя в iJump количество звонков, где chainId совпал. После этого, во втором цикле, добавляются звонки, а также проставляются отступы. Возвращает функция уже сформированную html-разметку звонка.
Для feedback, dayCalls и emptyCalls onPlay, в котором хранится вся инфа о функции, которая будет вызвана по нажатию.
#### getUniqueData(data,param)
подсчет уникальных звонков в data по param, проходит по каждому звонку и считает уникальный param.