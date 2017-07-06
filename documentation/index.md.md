# js files
## Написанные
### [clientCalls.js](index.md#clientcallsjs-1)
### [fireFeedback.js](index.md#firefeedbackjs-1)
### [navbar.js](index.md#navbarjs-1)
### [notesAndComments.js](index.md#notesandcommentsjs-1)
### [todayCallsController.js](index.md#todaycallscontrollerjs-1)
### [webSocket.js](index.md#websocketjs-1)
___
## Внешние
### jquery.min.js (3.1.1) 
### bootstrap.min.js (3.3.7)
### moment.js (latest) 
для работы с датами
### daterangepicker (2) 
для работы с календарем
### bootstrap-toggle.min.js (2.2.2)
переключатель
___
## Общие
### [calendar.js](common.md#calendarjs-1)
### [commonData.js](common.md#commonDatajs-1)
___
### clientCalls.js
#### Файл, отвечающий за отрисовку звонков пользователей.
#### Функции
1.  [document.ready()](index.md#cc-documentready)
2.  [getCalls()](index.md#getcalls)
3.  [drawClientCalls(page)](index.md#drawclientcallspage)
4.  [collectTagForGetCalls(data)](index.md#collecttagforgetcallsdata)
5.  [addButton()](index.md#addbutton)

#### Глобальные переменные
callsData - информация о всех звонках. Из-за структуры файла вынесена в глобальную переменную.
##### cc-document.ready()
содержит в себе логику обработки события нажатия на кнопку Звонки пользователя, а именно - стандартное заполнение информации, отрисовка поля с кнопкой и расширение основного поля на весь (оставшийся) экран.
##### getCalls()
Подфункция запрос, с передачей информации в уже, собственно, отрисовку ->(drawClientCalls). Сохраняет в переменные id учетной записи и осуществляет get запрос стандартный, попутно сортируя данные. Запрос делается на получение всех звонков с учетки и сохранение их в переменную(переделать на уровне базы данных можно). Если звонки есть - кидает на отрисовку первой страницы.
##### drawClientCalls(page)
Сама отрисовка звонков, постраничная, звонков на странице <=50. Сначала осуществляется проверка на количество звонков и страниц, соответственно. Если страниц больше чем одна, строится пагинатор со своей логикой внизу и вверху.
Логика:
1. подсветка активной страницы
2. Проверка isFirstPage и isLastPage, чтобы отключить возможность нажимать на кнопки >> и << .
3. Максимальное количество страниц - 20, остальные просто не отображаются. Количество звонков максимальное - 50*20 = 1000
Потом идет цикл отрисовки звонков. Стандартный. Соединение нескольких звонков в один, отступы итд + подсветка твоих звонков, вывод комментариев и тэгов справа от звонка(именно для этого и нужно увеличение ширины экрана на всю доступную область).
___ 
### fireFeedback.js
#### Файл, отвечающий за отрисовку страницы feedback в firecatcher
#### Функции
1.  [createTagsTable()](index.md#createtagstable)
2.  [collectInfo()](index.md#collectinfo)
3.  [isInfoCorrect()](index.md#isinfocorrect)
4.  [postFeedback()](index.md#postfeedback)
5.  [clearFeedback()](index.md#clearfeedback)
6.  [drawFeedback()](index.md#drawfeedback)

#### Глобальные переменные
lengthOfTagGroup - количество выбранных агентом тэгов.
outputTags - JSONовская инфа, которая будет отправлена в базу, формируется при выборе какого-либо тэга.
##### createTagsTable()
начальная функция, которая отвечает за запрос к базе по группам тэгов, хранение этой информации и отрисовке всего блока feedback. Пробегаясь циклом по информации из запроса строится feedback, обходя стороной группы Main, пустые группы и User Satisfaction,  + блок комментариев + кнопка отправки, на которой висит событие сбора полученных данных -> collectInfo()
##### collectInfo()
переходная функция, в которой собирается информация о выделенных тэгах, пробегая по всем отрисованным лейблам в цикле, плюсуя выделенные и формируя JSON текст для отправки. После этого запрос переходит в функцию isInfoCorrect()
##### isInfoCorrect()
Проверка корректности информации и ее отправка, в случае успеха. Алгоритм:
1. Очистка полей ввода от выделения.
2. Проверка - выбран ли звонок, если нет, то вывод ошибки, если да, то ---
3. Проверка количества выбранных тэгов (подсветка в случае 0)
4. Проверка введен ли комментарий (подсветка в случае "")
5. Если проверки провалены - ошибка, если нет ---
6. Вызов функции postFeedback()
7. сброс сообщения об ошибке
8. Отрисовка значков о количестве незаполненных звонков\фидбеков
9. Отрисовка страницы фидбек

##### postFeedback()
Функция отправки данных на сервер, очень простая, поле-значение.
##### clearFeedback()
функция сброса всех значений на пустые\незаполненные
##### drawFeedback()
Отрисовка фидбека, алгоритм:
1. clearFeedback()
2. запрос к базе, запись в переменную полученных данных
3. проход по циклу и отрисовка звонков. Стандартная. С мультизвонками, данными на звонке итд. Добавляется только сбор уже проставленных тэгов в звонке в спец. переменной.

### notesAndComments.js
Отвечает за все, что связано с работой заметок и комментариев. 
#### Функции
1.  [document.ready()](index.md#nac-documentready)
2.  [getComments()](index.md#getcomments)
3.  [changeHeight(i)](index.md#changeheighti)
4.  [postComment()](index.md#postcomment)
5.  [updateNotes()](index.md#updatenotes)
6.  [getNotes()](index.md#getnotes)


___
# css files
## Написанные
### [testPage.css](index.md#testpage-1)
### [calls.css](index.md#callscss-1)
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
Страница включает в себя навигационную панель из 5(пока что) кнопок.
1. Агенты ( fillAgents() )
2. Тэги ( fillTags(tags) )
3. Группы тэгов ( fillTags(group) )
4. Статистика ( openStat() )
5. Feedback( переход на другую страницу )
А также строки поиска, которая ищет по названию строки и модно прокручивается к найденному элементу.
Основная обертка(\#wrapper) включает в себя внутреннюю(\# infoWrapper). А уже в ней происходит вся магия. Внутри есть 2 таблицы: 
1. Основная (\#allAgentsTable) - сюда и выводится основная информация
2. Вспомогательная (\#secondTable) - сюда выводятся звонки из статистики по конкретным вопросам по нажатию на кнопку show (Рекламные, Блокировки итд)
Также здесь есть скелет правых панелей(\#updateAgent) для добавления (\#addWrapper) и обновления информации (\#updateWrapper). Каждая панель состоит из 3 блоков (Header, Body и Footer).
### Функция
#### RestPost(sendData, url)
стандартный ajax запрос к базе, с уже заполненными параметрами ( json, post, JSON.stringify(data) итд)