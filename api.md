# api
### /api  
[/agent/](Агенты-api-agent-controller)  
/call/  
/category/  
/question/  
/comment/  
/role/  
/tag/  
/taggroup/  
/stat/  
## Агенты api, Agent Controller
### /agent/all 	- (GET) -  
  выводит общий список агентов   
### /agent/{id} - (GET) -  
 находит конкретного агента по id  
### /agent/username/{username} - (GET) -  
 или по username
### /agent/add - (POST) -  
 добавить нового агента 
### /agent/update - (POST) -  
 обновление агента по ID  
### /agent/notes/update - (POST) -  
 обновление заметок агента по ID  
### /agent/notes/find - (GET) -  
 чтение заметок агента по ID  
  
## Звонки api, Call Controller 
### /call/agent/{startPeriod}/{endPeriod} - (GET) -  
 возвращает список звонков для авторизованного агента за указанный период  
### /call/update - (POST) -  
 обновление звонка. Ждет объект с параметрами Значения параметров могут быть NULL, но имена должны строго соответствовать указанным.  
    * Integer id;  
    * String chainId;  
    * Integer questId;  
    * Integer shopCategoryId;  
    * Integer agentId;  
    * Long avitoUserId;  
    * Boolean isManager;  
    * String type;  
    * Set<Tag> tags;  
### /call/feedback - (POST) -  
 обновление feedback - звонков. Ждет объект с параметрами Значения параметров могут быть NULL, но имена должны строго соответствовать указанным.  
    * Integer id;  
    * Integer agentId;  
    * String comId;  
    * Long avitoUserId;  
    * Long timeStart;  
    * String type;  
    * String comments;  
    * Set<Tag> tags;  
### /call/type/{typecall}/{startPeriod}/{endPeriod} - (GET) -  
 возвращает список звонков конкретного типа для авторизованного агента  
typecall: EMPTY, EMPTY_FEEDBACK, FULL_FEEDBACK, UPDATED.  
### /call/byTags - (POST) -  
 поиск по тегам.  
Ждет массив объектов тэг (можно только id) пример: var ids=[{"id":17},{"id":18}]  
    int id;  
    String name;  
    String value;  
    private String description;  
### /call/user/{avitoUserId}/{page} - (GET) -  
 поиск всех звонков по ID пользователя постранично, по убыванию. - пока не используется  
### /call/user/{avitoUserId}/all - (GET) -  
 поиск всех звонков по ID пользователя.  
### /call/user/{avitoUserId}/agent/{agentId} - (GET) -  
 поиск звонков определенного агента среди всех звонков по пользователю  
### /call/question/{question}/{startPeriod}/{endPeriod} - (GET) -  
 поиск звонков по определенному вопросу и периоду времени (для статистики)  
## Категории api, Category Controller  
### /category/all  - (GET) -  
 список категорий.  
### <del>category/{id} </del>  
### <del>category/add </del>  
## Вопросы api, question controller
### /question/all  - (GET) -  
 список вопросов.  
### <del>question/{id} </del>  
### <del>question/add </del>  
## Комментарии api, Comment Controller 
### /comment/user/{avitoUserId}  - (GET) -  
 список комментариев для указанного пользователя.  
### /comment/add - (POST) -  
 добавляет комментарий на учетку.  
### <del> /comment/delete </del>  
## Роли api, Role Controller
### /role/all - (GET) -  
 список ролей.  
### <del>role/{id}</del>   
## Тэги api, Tag controller		  
### /tag/all - (GET) -  
 список тегов без групп  
### /tag/{id} - (GET) -  
 поиск тега по заданному ID  
### /tag/changeGroup - (POST) -  
 редактирование группы тэга  
### /tag/add - (POST) -  
 добавление тега   
### /tag/update - (POST) -  
 редактирование информации о тэге  
## Группы тэгов api, Taggroup Controller						  
### /taggroup/all  - (GET) -  
 список групп тегов  
### /taggroup/{id} - (GET) -  
 поиск группы тегаов по ID  
### /taggroup/add  - (POST) -  
 добавление группы тегов   
### /taggroup/update - (POST) -  
 редактирование группы тегов   
 ## Статистика api, Stat Controller 
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
