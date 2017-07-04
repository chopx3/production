# api
### /api  
[/agent/](api.md#agent-json)  
[/call/](api.md#call-json)  
[/category/](api.md#category-json )  
[/question/](api.md#question-json)  
[/comment/](api.md#comment-json)  
[/role/](api.md#role-json)  
[/tag/](api.md#tag-json)  
[/taggroup/](api.md#taggroup-json)  
[/stat/](api.md#stat-json-2-or-3-fields)  
## Агенты api, Agent Controller
### Agent JSON  
```sh
{"id":1,"username":"name","oktellLogin":"Oktell Login","department":"pro","notes":null,"roles":[{"id":2,"name":"ROLE_USER"}]}
```
### /agent/all 	- (GET) -  
  выводит общий список агентов  
### /agent/{id} - (GET) -  
 находит конкретного агента по id  
### /agent/username/{username} - (GET) -  
 или по username
### /agent/add - (POST) -  
 добавить нового агента  
```sh
{"username": value,"oktellLogin":value}  
```
### /agent/update - (POST) -  
 обновление агента по ID
```sh 
{"id":value, "username": value, "oktellLogin": value, "roles": value, "department": value}
``` 
### /agent/notes/update - (POST) -  
 обновление заметок агента по ID  
 ```sh 
 {"id": value, "notes": value } 
 ```  
### /agent/notes/find - (GET) -  
 чтение заметок агента по ID  
  
## Звонки api, Call Controller 
### Call JSON
```sh
{"id":221937,"agent":{...},"type":"UPDATED","timeStart":1499065882000,"timeEnd":1499065969000,"chainId":"de855c02-06b4-4b81-8838-2139dc51acdd","comId":"E5EF8B6A-2F47-4B68-81AB-C7015F8AC1AC","tags":[{...}],"comments":"","avitoUserId":123456,"questionId":5,"shopCategoryId":2,"out":false,"manager":false}
```
### /call/agent/{startPeriod}/{endPeriod} - (GET) -  
 возвращает список звонков для авторизованного агента за указанный период  
### /call/update - (POST) -  
 обновление звонка. Ждет объект с параметрами Значения параметров могут быть NULL, но имена должны строго соответствовать указанным.  
```sh
{agentId: 33, avitoUserId: "101053604", chainId: "7d716d26-1234-5678-849e-ca22ea451022", comments: "", isManager: false, questId: 1, shopCategoryId: 5, tags: [{...}], type: "UPDATED"}
```
### /call/feedback - (POST) -  
 обновление feedback - звонков. Ждет объект с параметрами Значения параметров могут быть NULL, но имена должны строго соответствовать указанным.  
 ```sh
 {agentId: 33, chainId: "b3dce215-1234-5678-b3dc-da4179b7da19", comments: "123", tags: [...], type: "FULL_FEEDBACK"}
 ```
### /call/type/{typecall}/{startPeriod}/{endPeriod} - (GET) -  
 возвращает список звонков конкретного типа для авторизованного агента  
typecall:    
* EMPTY - пустой звонок, еще не заполнен
* UPDATED - заполненный звонок
* EMPTY_FEEDBACK - заполненный звонок, тэг feedback(unhappy) стоит, но информация feedback'a еще не отправлена
* FULL_FEEDBACK - заполненный звонок, стоит тэг feedback(unhappy), информация отправлена
### `/call/byTags - (POST) -  `
### `/call/user/{avitoUserId}/{page} - (GET) -`  
 `поиск всех звонков по ID пользователя постранично, по убыванию. - пока не используется`  
### /call/user/{avitoUserId}/all - (GET) -  
 поиск всех звонков по ID пользователя.  
### /call/user/{avitoUserId}/agent/{agentId} - (GET) -  
 поиск звонков определенного агента среди всех звонков по пользователю  
### /call/question/{question}/{startPeriod}/{endPeriod} - (GET) -  
 поиск звонков по определенному вопросу и периоду времени (для статистики)  
## Категории api, Category Controller  
### Category JSON
```sh
[{"description":"Недвижимость","id":1}, ... ]
```
### /category/all  - (GET) -  
 список категорий.  
### `category/{id} `  
### `category/add `  
## Вопросы api, question controller
### Question JSON
```sh
[{"id":1,"description":"Блокировка (отклонение) объявления"}, ... ]
```
### /question/all  - (GET) -  
 список вопросов.  
### `question/{id} `  
### `question/add `  
## Комментарии api, Comment Controller 
### Comment JSON
```sh
[{"id":711,"avitoUserId":123456,"postTime":1498746357442,"message":"505","agent":{...} }, ...]
```
### /comment/user/{avitoUserId}  - (GET) -  
 список комментариев для указанного пользователя.  
### /comment/add - (POST) -  
 добавляет комментарий на учетку.  
 ```sh
 {"avitoUserId": id, "postTime": new Date().getTime(), "message": message }
 ```
### ` /comment/delete `  
## Роли api, Role Controller
### Role JSON
```sh
[{"id":1,"name":"ROLE_ADMIN"},{"id":2,"name":"ROLE_USER"}]
```
### /role/all - (GET) -  
 список ролей.  
### `role/{id}`   
## Тэги api, Tag controller
### Tag JSON
```sh
[ {"id":1,"name":"Listing Fees","value":"lf","description":"Вопросы по платным размещениям"}, ... ]
```
### /tag/all - (GET) -  
 список тегов без групп  
### /tag/{id} - (GET) -  
 поиск тега по заданному ID  
### /tag/changeGroup - (POST) -
 редактирование группы тэга  
 ```sh
 { "id": idNum, "value": $("#exampleSelect1").val() }
 ```
### /tag/add - (POST) -  
 добавление тега   
 ```sh
 {"value":$(firstField).val(), "name": $(secondField).val(), "description": $(thirdField).val() };
 ```
### /tag/update - (POST) -  
 редактирование информации о тэге  
  ```sh
 {"id":idNum, "value":$(firstField).val(), "name": $(secondField).val(), "description": $(thirdField).val() };
 ```
## Группы тэгов api, Taggroup Controller		
### Taggroup JSON
```sh
[{"id":1,"name":"Main","description":"Основная группа ","tags":[...]}, ...]
```
### /taggroup/all  - (GET) -  
 список групп тегов  
### /taggroup/{id} - (GET) -  
 поиск группы тегаов по ID  
### /taggroup/add  - (POST) -  
 добавление группы тегов   
 ```sh
 {"name": $(firstField).val(), "description": $(secondField).val()}
 ```
### /taggroup/update - (POST) -  
 редактирование группы тегов   
 ```sh
 {"id":id, "name": $(firstField).val(), "description": $(secondField).val()}
 ```
 ## Статистика api, Stat Controller 
 ### Stat JSON (2 or 3 fields)
 ```sh
 {"fields":["Category", "Total"], "columns":[{"category":"Недвижимость","total":"4"}, ...]}
 ```
  ```sh
 {"fields":["Category", "Total", "ID"], "columns":[ {"category":"Частник", "total":"3", "id":"-1"}, ... ]}
 ```
### /stat/byCategory/{startPeriod}/{endPeriod} - (GET) -  
 вывод статистики по категориям за определенный период  
### /stat/outcomings/{startPeriod}/{endPeriod} - (GET) -  
 вывод статистики по исходящим звонкам за определенный период  
### /stat/byQuestion/{startPeriod}/{endPeriod} - (GET) -  
 вывод статистики по звонкам менеджеров за определенный период  
### /stat/manager/{startPeriod}/{endPeriod} - (GET) -  
 вывод статистики по звонкам менеджеров за определенный период  
### /stat/byID/{startPeriod}/{endPeriod} - (GET) -  
 вывод статистики по звонкам от учетной записи за определенный период  
### /stat/updatedCalls/{startPeriod}/{endPeriod} - (GET) -  
 вывод статистики по заполненным звонкам агента за определенный период  
### /stat/emptyCalls/{startPeriod}/{endPeriod} - (GET) -  
 вывод статистики по незаполненным звонкам агента за определенный период  
### /stat/fullInfoByAgent/{startPeriod}/{endPeriod} - (GET) -  
 вывод общей статистики по заполненным и незаполненным звонкам агента за определенный период  
### /stat/feedback/{startPeriod}/{endPeriod} - (GET) -  
 вывод общей статистики по feedback'ам за определенный период 
