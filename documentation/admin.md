# js files
## Написанные
### [testpageAgentsController.js](admin.md#testpageagentscontrollerjs-1)
### [testpageCommonController.js](admin.md#testpagecommoncontrollerjs-1)
### [testpageStatController.js](admin.md#testpagestatcontrollerjs-1)
### [testpageTagsController.js](admin.md#testpagetagscontrollerjs-1)
### [testpageQuestionsController.js](admin.md#testpagequestionscontrollerjs-1)
___
## Внешние
### jquery.min.js (3.1.1) 
### bootstrap.min.js (3.3.7)
### moment.js (latest) 
для работы с датами
### daterangepicker (2) 
для работы с календарем
___
## Общие
### [calendar.js](common.md#calendarjs-1)
### [commonData.js](common.md#commondatajs-1)
___
### testpageAgentsController.js
#### Небольшой файл, в котором происходит отрисовка информации по агентам, целая одна функция
#### Функции
1.  [openAgents()](admin.md#openagents)

#### Глобальные переменные
1. roleUser - роль User, кэп
2. roleAdmin - роль Admin, нужны для смены ролей агентов

##### openAgents()
Отрисовывает таблицу Агенты. После отрисовки боковых кнопок, обнуления всех полей, а также установки кнопок в нужные позиции, происходит запрос к базе по агентам. После этого, в цикле, строится таблица, включающая в себя: 
* id 
* username
* OktellLogin
* Отдел
* Роль
* кнопка edit, которая, при нажатии, отправляет в кнопку редакта всю вышеперечисленную информацию
___
### testpageCommonController.js
#### Основной общий файл для отрисовки боковых кнопок, управления информацией и отправки данных на сервер, а также поиска и подсветки активного пункта меню
#### Функции
1.  [drawInfo()](admin.md#drawinfo)
2.  [infoCheck()](admin.md#infocheck)
3.  [invokeFunc(func,param)](admin.md#invokefuncfuncparam)
4.  [updateInfo(id, nameTag, loginShort, desc)](admin.md#updateinfoid-nametag-loginshort-desc)
5.  [document-ready()](admin.md#tcc-documentready)

#### Глобальные переменные
1. idNum - общая переменная для хранения id элемента для дальнейшей отправки в запрос на сервер
2. dataArray[] - хранит в себе данные, для отрисовки в боковой области update, а также для отправки на сервер.

#### drawInfo()
Огромная функция, которая содержит в себе, в основном, html код заполнения информации по двум группам областей - update и add. Включает в себя, пока что, 5 возможных вариантов заполнения:
* agents
* tags
* taggroup(group)
* stat
* quest

Отрисовка происходит в зависимости от данного значения.
#### infoCheck()
Содержит в себе двойной вложенный  switch(case), add|upd (agent|tag|group|quest), который отправляет в зависимости от параметров информацию на сервер. Перед отправкой происходит проверка данных. После этого делается запрос на отрисовку страницы в зависимости от параметра, опять же таки.
#### invokeFunc(func,param)
запускает переданную ей func с параметром param, сделано для обновления страницы после добавления данных
#### updateInfo(id, nameTag, loginShort, desc)
добавление данных в поле обновления информации
#### tcc-document.ready()
При загрузке страницы открывает вкладку с агентами и подгружает группы тэгов в массив. После этого включает подсветку активного элемента навигации. Также здесь описана логика работы поиска+модная анимация прокрутки и обработка нажатия клавиши enter
___
### testpageStatController.js
#### Здесь хранится вся логика отрисовки страницы статистики
#### Функции
1.  [openStat()](admin.md#openstat)
2.  [getInfo(value)](admin.md#getinfovalue)
3.  [showCallsByQuestion(value)](admin.md#showcallsbyquestionvalue)
4.  [document-ready()](admin.md#tsc-documentready)

#### Глобальные переменные
1. startDate - дата начала отсчета
2. endDate - дата окончания отсчета для запросов
3. tempValue - буферное значение для сохранения подсветки кнопок

##### openStat()
при нажатии на "статистика" очищается информация, добавляются кнопки, стартует календарь, нажимаются кнопки "Всего" и "Сегодня" и рисуются боковые панели
##### getInfo(value)
основная функция отрисовки таблицы. После получения времени и вида отрисовываемой статистики, а также установки подсветки активной кнопки, происходит запрос.
Сначала очищаются все переменные, заполняются html кодом переменные для отрисовки таблицы, переменные полей и данных. В зависимости от запроса рисуется 3 колоночная или 2 колоночная таблица. При необходимости подсчитывается процентное соотношение данных, а также общее количество звонков. Если value = byQuestion также дорисовывается справа дополнительная кнопка show для показа звонков в каждой конкретной категории.
##### showCallsByQuestion(value)
логика кнопки show. устанавливается время и делается запрос в базу на показ звонков по каждому конкретному вопросу. Отрисовка стандартная. Звонок, поля, аудиотэг (собранный, если звонков несколько), дополнительная информация на звонке
##### tsc-document.ready()
установка времени в стандартные значения, запрос категорий и вопросов для отрисовки
### testpageTagsController.js
#### Здесь хранится вся логика отрисовки страницы тэгов и групп тэгов
#### Функции
1.  [getTagGroups()](admin.md#gettaggroups)
2.  [openTags(value)](admin.md#opentagsvalue)
3.  [drawTable(info,isGroup)](admin.md#drawtableinfoisgroup)
4.  [changeTagGroup()](admin.md#changetaggroup)

#### Глобальные переменные
1. checker - буферное значение выбора режима: тэги или группа тэгов
2. optionsReturn - опции для отображения при выборе группы тэгов для смены группы
3. tagGroupsArray - массив для хранения названий групп тэгов для смены группы

##### getTagGroups()
get запрос к базе, для получения группы тэгов и заполнения массива ими, а также для заполнения этой же инфой переменной, которая хранит в себе выбор опций
##### openTags(value)
функция, которая отрисовывает верх и низ таблицы, а также, после этого, в зависимости от value(tag|group) делает запрос к базу и передает информацию в функцию drawTable, которая рисует уже саму таблицу, попутно устанавливая, если это группа, переменную isGroup
##### drawTable(info,isGroup)
рекурсивная функция, которая пробегает либо по всем тэгам и выводит их, либо по всем группам тэгов, выводя сначала название группы, а потом тэги, которые есть внутри. Если это группа тэгов - isGroup = true, а логика уже сама делает необходимые запросы. Отрисовка стандартная, разница лишь в добавлении специального класса группе тэгов, для небольшого выделения через css
#### changeTagGroup()
немного костыльная функция для изменения группы тэгов через переменную value, которая для этого, так-то, не предназначена. Вероятно, в дальнейшем придется добавить дополнительную переменную для этого дела.
___
### testpageAgentsController.js
#### Небольшой файл, в котором происходит отрисовка информации по агентам, целая одна функция
#### Функции
1.  [openQuestions()](admin.md#openquestions)

#### Глобальные переменные

##### openQuestions()
Отрисовывает таблицу Вопросы. После отрисовки боковых кнопок, обнуления всех полей, а также установки кнопок в нужные позиции, происходит запрос к базе по вопросам. После этого, в цикле, строится таблица, включающая в себя: 
* id 
* description
* shortName
* active
* кнопка edit, которая, при нажатии, отправляет в кнопку редакта всю вышеперечисленную информацию
___
# css files
## Написанные
### [testPage.css](admin.md#testpagecss-1)
### [calls.css](admin.md#callscss-1)
___
## Внешние 
### bootstrap.css (3.3.7)
### daterangepicker (2)
___
### testPage.css
Содержит в себе стили:
1. Основная обертка (wrapper)
2. Блоки добавления и обновления информации (\#updateWrapper, \#updateWrapper.active, \#addWrapper, \#addWrapper.active, \#addWrapper.higher, .roundPlusShadow)
3. Их внутреннее содержание (.form-body, .inputTextField, .leftLabel, .Footer, .activeButton, .activeButton.active, .activeButton:active, .activeButton:focus, .activeButton:hover)
4. Навигационная панель (.navbar-default .navbar-nav>li>a:hover, .navbar-default .navbar-nav>li>a:focus, .navbar-default .navbar-nav>li>a:active, .navbar-default .navbar-nav>li>a.active, .highlight)
5. Поиск (\#searchBar, \#searchField.error, tr.search, )
6. Другое (.box-shadow, .groupTag, .sum)

### calls.css
общий файл для отрисовки звонка. Содержит в себе всю информацию - как звонок рисуется(.call), как он выглядит активным(.call.active), аудио-тэг (.audio-call), отступы (.no-margin-top), подсветка твоих звонков (.yourCall) , дополнительная информация на звонках (.myLabel, .myLabel>a, mylabel>a:link|visited) и комментариев к звонкам (.might-overflow|:hover, .commentBox)
___
# jsp file
## admin.jsp
Страница включает в себя навигационную панель из 6(пока что) кнопок.
1. Агенты ( openAgents() )
2. Тэги ( openTags(tags) )
3. Группы тэгов ( openTags(group) )
4. Вопросы ( openQuestions() )
4. Статистика ( openStat() )
5. Feedback( переход на другую страницу )
А также строки поиска, которая ищет по названию строки и модно прокручивается к найденному элементу.
Основная обертка(\#wrapper) включает в себя внутреннюю(\# infoWrapper). А уже в ней происходит вся магия. Внутри есть 2 таблицы: 
1. Основная (\#allAgentsTable) - сюда и выводится основная информация
2. Вспомогательная (\#secondTable) - сюда выводятся звонки из статистики по конкретным вопросам по нажатию на кнопку show (Рекламные, Блокировки итд)
Также здесь есть скелет правых панелей(\#updateAgent) для добавления (\#addWrapper) и обновления информации (\#updateWrapper). Каждая панель состоит из 3 блоков (Header, Body и Footer).