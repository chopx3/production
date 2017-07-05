# js files
## [/testpageAgentsController.js/](admin.md#testpageagentscontrollerjs-1)
## [/testpageCommonController.js/](admin.md#testpagecommoncontrollerjs-1)
## [/testpageStatController.js/](admin.md#testpagestatcontrollerjs-1)
## [/testpageTagsController.js/](admin.md#testpagetagscontrollerjs-1)

### testpageAgentsController.js
#### Небольшой файл, в котором происходит отрисовка информации по агентам, целая одна функция
#### Функции
1.  [/fillAgents()/](admin.md#fillagents)

#### Глобальные переменные
1. roleUser - роль User, кэп
2. roleAdmin - роль Admin, нужны для смены ролей агентов

##### fillAgents()
Отрисовывает таблицу Агенты. После отрисовки боковых кнопок, обнуления всех полей, а также установки кнопок в нужные позиции, происходит запрос к базе по агентам. После этого, в цикле, строится таблица, включающая в себя: 
* id 
* username
* OktellLogin
* Отдел
* Роль
* кнопка edit, которая, при нажатии, отправляет в кнопку редакта всю вышеперечисленную информацию

### testpageCommonController.js
#### Основной общий файл для отрисовки боковых кнопок, управления информацией и отправки данных на сервер, а также поиска и подсветки активного пункта меню
#### Функции
1.  [/drawInfo()/](admin.md#drawinfo)
2.  [/infoCheck()/](admin.md#infocheck)
3.  [/fillInfo(type)/](admin.md#fillinfotype)
4.  [/updateInfo(id, nameTag, loginShort, desc)/](admin.md#updateinfo)
5.  [/document-ready()/](admin.md#tcc-documentready)

#### Глобальные переменные
1. idNum - общая переменная для хранения id элемента для дальнейшей отправки в запрос на сервер
2. dataArray[] - хранит в себе данные, для отрисовки в боковой области update, а также для отправки на сервер.

#### drawInfo()
Огромная функция, которая содержит в себе, в основном, html код заполнения информации по двум группам областей - update и add. Включает в себя, пока что, 4 возможных варианта заполнения:
* agents
* tags
* taggroup(group)
* stat

Отрисовка происходит в зависимости от данного значения.
#### infoCheck()
Содержит в себе двойной вложенный  switch(case), add|upd (agent|tag|group), который отправляет в зависимости от параметров информацию на сервер. Перед отправкой происходит проверка данных. После этого делается запрос на отрисовку страницы в зависимости от параметра, опять же таки.
#### fillInfo(type)
делает тоже самое, что и clickOnLabel, но в цикле и для всех кнопок тэгов
#### updateInfo(id, nameTag, loginShort, desc)
добавление данных в поле обновления информации
#### tcc-document.ready()
При загрузке страницы открывает вкладку с агентами и подгружает группы тэгов в массив. После этого включает подсветку активного элемента навигации. Также здесь описана логика работы поиска+модная анимация прокрутки и обработка нажатия клавиши enter

### testpageStatController.js
#### Здесь хранится вся логика отрисовки страницы статистики
#### Функции
1.  [/openStat()/](admin.md#openstat)
2.  [/getInfo(value)/](admin.md#getinfovalue)
3.  [/getQuestions(value)/](admin.md#getquestionsvalue)
4.  [/document-ready()/](admin.md#tsc-documentready)

#### Глобальные переменные
1. startDate - дата начала отсчета
2. endDate - дата окончания отсчета для запросов
3. tempValue - буферное значение для сохранения подсветки кнопок

##### openStat()
при нажатии на "статистика" очищается информация, добавляются кнопки, стартует календарь, нажимаются кнопки "Всего" и "Сегодня" и рисуются боковые панели
##### getInfo(value)
основная функция отрисовки таблицы. После получения времени и вида отрисовываемой статистики, а также установки подсветки активной кнопки, происходит запрос.
Сначала очищаются все переменные, заполняются html кодом переменные для отрисовки таблицы, переменные полей и данных. В зависимости от запроса рисуется 3 колоночная или 2 колоночная таблица. При необходимости подсчитывается процентное соотношение данных, а также общее количество звонков. Если value = byQuestion также дорисовывается справа дополнительная кнопка show для показа звонков в каждой конкретной категории.
##### getQuestions(value)
логика кнопки show. устанавливается время и делается запрос в базу на показ звонков по каждому конкретному вопросу. Отрисовка стандартная. Звонок, поля, аудиотэг (собранный, если звонков несколько), дополнительная информация на звонке
# css files
## [/testPage.css/](admin.md#testpage-1)
## [/calls.css/](admin.md#callscss-3)
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