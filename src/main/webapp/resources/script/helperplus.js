// ==UserScript==
// @name         Helper plus
// @version      6.8
// @author       izayats@avito.ru
// @include      https://adm.avito.ru/*
// @include      http://192.168.8.56/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require      https://cdn.jsdelivr.net/momentjs/latest/moment.min.js
// @downloadURL  https://raw.githubusercontent.com/chopx3/production/dev/src/main/webapp/resources/script/helperplus.js
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// ==/UserScript==

'use strict';
var serverURL = "10.10.36.50";
var backUpHtml = "";
var notSync = "";
var userID = getId(window.location.href);
var firstTime = true;
var todayTime = moment().endOf("day").format("DD/MM/YYYY HH:mm");
var minusMonthTime =  moment().startOf("day").subtract(30, "days").format("DD/MM/YYYY HH:mm");
var timeToFind =  minusMonthTime + " - " + todayTime;
$(document).ready(function(){
    $(".items").after(`<a href="/items/search?user_id=${userID}&date=${timeToFind}&status%5B%5D=rejected&status%5B%5D=blocked" class="items" target="_blank/">bl+rej(30)</a>`);
    $("td.item-checkbox").click(function() {
    if ($(this).find("input").prop('checked')){
      $(this).find("input").prop('checked', false)
    }
    else {$(this).find("input").prop('checked', true)}
  })
        turnOnRemovedHistory();
    if(window.location.href.indexOf('/packages/info/') != -1){
        let lastButton = document.querySelector('.list-inline');
        let checkButtonHTML = `<li><button type="button" class="btn btn-default js-filter-item-status checkUniqueButton">Проверить списания</button></li>`;
        lastButton.insertAdjacentHTML('beforeend', checkButtonHTML);
        let checkButton = document.querySelector(".checkUniqueButton");
        checkButton.addEventListener("click", startCheck);
        let shopButton = document.querySelector("section.content>div>div>a");
        let backToUserHTML = `<button class="btn btn-success backToUser" style="margin-left:10px">← Вернуться на УЗ</button>`;
        shopButton.parentNode.insertAdjacentHTML('beforeend', backToUserHTML);
        let backToUserButton = document.querySelector(".backToUser");
        backToUserButton.addEventListener("click", function(){ getUserID(shopButton.href) });
        var subsNums = document.querySelector(".header__title").innerHTML.match(/\d+/g);
        document.querySelector("[type=submit]").parentNode.insertAdjacentHTML('beforeend', "  max = " + (subsNums[1] - subsNums[0]));
    }

    if(window.location.href.indexOf('/user/info') != -1){
        login = $('.dropdown-toggle').slice(-1)[0].innerHTML.match(/([^\n]+)/i)[1];
        let postCallHTML = `<input type="button" class="ah-default-btn postCall" value="Постобработка" style="float: right; margin-right: 25px; height: 34px;" title="Создать обращение">`;
        document.querySelector(".header__title").insertAdjacentHTML('beforeend', postCallHTML);
        document.querySelector(".postCall").addEventListener("click", createPostCallTicket);
        $(".form-group>label")[0].innerHTML = (
            `<button id="copyID" class="sh-default-btn" type="button" title="Скопировать URL страницы" style="padding: 1px 5px; font-size: 12px;">
                <span class="sh-button-label sh-copy-img" style="border-radius: 0; font-size: 12px; top: 2px; line-height: 16px;">
                </span>ID
            </button>`);
        $('#copyID').bind("click",function(){
                GM_setClipboard(userID);
            });
        if ($(".form-group>div>a")[7].innerHTML != "создать" && $(".form-group>div>a")[7].innerHTML != "Закрыт"){
            var shopLink = $(".form-group>div>a")[7].href;
            var shopLinkHTML = $(".form-group>div>a")[7].outerHTML;
            $(".form-group>div>a")[7].outerHTML = (shopLinkHTML + `<a id="buttonPackage" style="margin-left:20px; cursor:pointer">Пакет</a>`);
            $('#buttonPackage').bind("click",function(){
                $.get(shopLink).done(function(data){
                    var packages = $(".form-group>div.col-xs-4>a[title='Просмотреть историю списаний из пакета']", data);
                    var packagesNum = packages.length;
                    console.log(packages, packagesNum);
                    if (packagesNum > 1){
                        var packageBody = "";
                        for (var i = 0; i<packagesNum; i++){
                            var innerTextShort = (packages[i].innerText).substring(0,20);
                            var link = packages[i].pathname;
                            packageBody+=(`<label class='btn btn-default btn-sm category-label'>
                                             <a class='packageButton' href=${link} autocomplete='off' style="text-decoration:none" target="_blank">${innerTextShort}...</a>
                                         </label>`);
                        }
                        var packageDiv = `
                       <div class='hidden-category-picker' style="position:absolute">
                          ${packageBody}
                       </div>`;
                        $("#buttonPackage").after(packageDiv);

                    }
                    else {
                        var packageLink = packages[0].pathname;
                        if (packageLink != undefined){
                            window.open("https://adm.avito.ru/" + packageLink);
                        }
                    }
                });
            });
        }
    }

    if(window.location.href.indexOf('shops/info/view') != -1){
        if ($("#watermark").prop("checked") != undefined){
            var isWmChecked = $("#watermark").prop("checked");
            var wmSpan = (isWmChecked) ? `<span class="label label-info" id=watermarkSpan style="cursor:pointer;"> Подключен </span>` : `<span class="label label-danger" id=watermarkSpan style="cursor:pointer;"> Отключен </span>`;
            let displayStatus = (!isWmChecked) ? `<button class="btn btn-success btn-sm label watermarkButtons" id=watermarkSpan style="cursor:pointer; margin-left:100px;" title="Водяной знак подключен"> Включить </button>` : `<button class="btn btn-danger btn-sm label watermarkButtons" id=watermarkSpan style="cursor:pointer; margin-left:100px;" title="Водяной знак отключен"> Выключить </button>`;
            var waterMarkDivHTML = `<div class="form-group"> <label class="col-xs-4 control-label">Водяной знак</label> <div class="col-xs-8"> <div class="help-block">${wmSpan} ${displayStatus}</div>  </div> </div>`;
            document.querySelectorAll(".form-group")[4].insertAdjacentHTML('beforebegin', waterMarkDivHTML);
            $('#watermarkSpan').bind("click",function(){
                $(window).scrollTop($('#watermark').offset().top);
            });
            /*$("button[value=Добавить]").after('<button type="submit" class="btn btn-info pull-left watermarkButtons" id="repeatWaterMark" title="Водяной знак переподключен"> <i class="glyphicon glyphicon-repeat"></i> WM</button>');
            $("button[value=Добавить]").after('<button type="submit" class="btn btn-danger pull-left watermarkButtons" id="removeWaterMark" title="Водяной знак отключен"> <i class="glyphicon glyphicon-minus"></i> WM</button>');
            $("button[value=Добавить]").after('<button type="submit" class="btn btn-success pull-left watermarkButtons" id="addWaterMark" title="Водяной знак подключен"> <i class="glyphicon glyphicon-plus"></i> WM</button>');
            */$('.watermarkButtons').bind("click",function(){
                let message = this.title;
                let shopComment = {"type": 3, "ID": userID, "comment": message};
                comment(shopComment);
                document.getElementById('watermark').click();
                document.querySelector("[name=versionNumber]+button").click();
            });
        }
        var isGeneral = ($(".js-notification-phone")[0] != undefined);
        console.log(isGeneral);
        if (isGeneral){
            var phone = $(".js-notification-phone")[0].value;
            var dateInterval = $(".js-notification-interval-days option:selected").text();
            document.querySelector(".js-notification-phone-save").setAttribute('type', 'submit');
            $('.js-notification-phone-save').bind("click",function(){
                if ( (phone != $(".js-notification-phone")[0].value) || (dateInterval != $(".js-notification-interval-days option:selected").text()) ){
                    var newPhone = $(".js-notification-phone")[0].value;
                    var newInterval = $(".js-notification-interval-days option:selected").text().trim();
                    dateInterval = dateInterval.trim();
                    var message = `Настройки СМС-оповещения изменены:\n Номер телефона: ${phone}, (${dateInterval}) --> \nНомер телефона: ${newPhone}, (${newInterval})`;
                    var shopComment = {"type": 3, "ID": userID, "comment": message};
                    comment(shopComment);
                    location.reload();
                }
            });
        }
    }
    if(window.location.href.indexOf('helpdesk?') != -1){
        var helpdeskEl = document.getElementsByClassName("helpdesk-main-section")[0].getElementsByTagName("header")[0].getElementsByTagName("div")[1].getElementsByTagName("div")[0];
        var abuseButton = document.createElement('div');
        abuseButton.className  += `dropdown`;
        abuseButton.id  = `abuseButton`;
        abuseButton.innerHTML  = `
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuAbuse" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Создать жалобу
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuAbuse">
    <li value="366"><a href=#>MOD_GE</a></li>
    <li value="485"><a href=#>MOD_RE</a></li>
    <li value="339"><a href=#>MOD_TR</a></li>
    <li role="separator" class="divider"></li>
    <li value="1261"><a href=#>to_mod_RE</a></li>
	<li value="1254"><a href=#>to_mod_3D</a></li>
	<li value="1252"><a href=#>to_mod_BE</a></li>
	<li value="1255"><a href=#>to_mod_FB</a></li>
	<li value="1256"><a href=#>to_mod_LV</a></li>
	<li value="1257"><a href=#>to_mod_Pets</a></li>
	<li value="1259"><a href=#>to_mod_Serv</a></li>
	<li value="1260"><a href=#>to_mod_TR</a></li>
	<li value="1258"><a href=#>to_mod_Job</a></li>
	<li value="1253"><a href=#>to_mod_HO</a></li>
  </ul>`;
        helpdeskEl.insertBefore(abuseButton, helpdeskEl.firstChild);
        $('#abuseButton>ul>li').bind("click",function(){
            var tag = this.value;
            var toPostJSON = {
                "problemId":67,
                "submitterId":localStorage.agentID,
                "typeId": 1,
                "channelId": 3,
                "receivedAtEmail": "shop_support@avito.ru",
                "subject": "Жалобы",
                "theme": 42,
                "sourceId": 3,
                "problem": 67,
                "statusId": 1,
                "tags[0]": tag,
                "description": "Жалоба пользователя",
                "requesterEmail": localStorage.agentEmail,
                "requesterName": localStorage.agentName
            };

            createTicket(toPostJSON)
                .then(data => {
                var toTicketJson = {
                    "assigneeId" : localStorage.agentID,
                    "versionNum" : 0,
                    "fakeEmailIgnore" : false
                };
                $.post("https://adm.avito.ru/helpdesk/api/1/ticket/"+data.ticket+"/take", toTicketJson);
                return new Promise(function(resolve, reject) {resolve(data.ticket)});
            })
            .then(ticket => {
                var toCommentJson = {
                    "type" : 3,
                    "versionNum" : 0,
                    "type-selector" : 3,
                    "commentTo" : localStorage.agentID,
                    "commentFrom" : localStorage.agentID,
                    "text" : "<p>___ - ссылка на объявления или учетную запись пользователя<br>___ - ID пользователя, если нет информации выше.<br>___ - детальное описание жалобы<br>___ - инициатор жалобы (ID)<br>___ - категория проверяемого контента жалобы<br>___ - адресат для ответа: МП или клиент, инициирующий проверку</p>"
                }
                $.post("https://adm.avito.ru/helpdesk/api/1/ticket/"+ticket+"/comment", toCommentJson);
                return new Promise(function(resolve, reject) {resolve(ticket)});})
            .then(ticket => window.open("https://adm.avito.ru/helpdesk/details/"+ticket));
        })
    }
  if(window.location.href.indexOf('/item/info') != -1){

      let checkFeeReturnButton = `<button class='btn btn-success pull-left feeReturn'>Проверить возврат</button>`;
      document.querySelector('.loadable-history>.form-group').insertAdjacentHTML("beforeend", checkFeeReturnButton);
      document.querySelector(".feeReturn").addEventListener("click", checkFeeReturn);
      var sheet = document.createElement('style');
sheet.innerHTML = `
.ah-user-info-indicators .ah-indicators-title::before {
    content: "•";
    margin-right: 4px;
}
.ah-user-info-indicators .ah-indicators-item {
    padding: 0px 4px;
}
.ah-user-info-indicators{
display: block;position: absolute;z-index: 10; font-weight: bolder;
font-size: 15px;
top: 100px;
right: 100px;
white-space: nowrap;
background-color: white;
width: 200px;
}
.ah-inactive {
    color: rgb(189, 189, 189);
}
.ah-indicators-fired {
    color: rgb(92, 184, 92);
}
`;
      document.body.appendChild(sheet);
      var injectStatus = document.querySelector(".content>.row>.item-page");
      var length = (document.querySelectorAll(".form-group>div.col-xs-9.form-control-static>a").length >= 9) ? "1" : "0";
      var userURL = document.querySelectorAll(".form-group>div>a")[length].href;
      console.log(userURL);

       getInfo(userURL)
          .then(data => {
           var parser = new DOMParser,
               doc    = parser.parseFromString(data, "text/html");
           var subs, isSubActive, shop, isShopActive, shopText, subsText;
           let categories = document.querySelectorAll("span[data-placement='bottom']");
           let catToFind = categories[0].innerHTML.trim() + "/" + categories[1].innerHTML.trim();
           for (const a of doc.querySelectorAll("label.col-xs-3.control-label")) {
               if (a.innerHTML.includes("Подписка")) {
                   subs = a.parentNode.querySelector("div>a").text.trim();
                   subsText = (subs !== "создать") ? subs : "Подписка";

               }
               if ( a.innerHTML.includes("Магазин")) {
                   shop = a.parentNode.querySelector("div>a").text.trim();
                   console.log(shop);
               }
           };

           shopText = (shop !== "создать" && shop !== "Закрыт" && shop !== "Приостановлен" && subs == "создать") ? " "+shop : " ";
           isSubActive = (subs !== "создать" && shop !== "Закрыт" && shop !== "Приостановлен") ? "ah-indicators-fired" : "ah-inactive";
           isShopActive = (shop !== "создать" && shop !== "Закрыт" && shop !== "Приостановлен" && subs == "создать") ? "ah-indicators-fired" : "ah-inactive";
           console.log(doc);
           console.log(doc.querySelector(".js-user-info-personal-manager-select"));
           const isPmAttached = (doc.querySelector(".js-user-info-personal-manager-select").value > 0) ? "ah-indicators-fired" : "ah-inactive";
           var injectStatusHTML = `
<div class="ah-user-info-indicators">
     <div class="ah-indicators-item"><span class="ah-indicators-title ${isShopActive}">Магазин${shopText}</span></div>
     <div class="ah-indicators-item"><span class="ah-indicators-title ${isSubActive}">${subsText}</span></div>
     <div class="ah-indicators-item"><span class="ah-indicators-title ${isPmAttached}">Перс. менеджер</span></div>
</div>`;
      injectStatus.insertAdjacentHTML('afterbegin', injectStatusHTML) ;
             });
      if (!Number.isInteger(parseInt($("#fld_price").val()))) $("#fld_price").val("");
      var isRefunded = false;
      document.querySelectorAll(".loadable-history.js-loadable-history>.table-scroll>table>tbody>tr>td").forEach((elem => { if (elem.innerHTML == "Refund (The blocked item was not in SERP)" || elem.innerHTML == "Refund (The rejected item was not in SERP)") {
          isRefunded = true;
          elem.parentNode.style.fontWeight = "700";
      }}));
       if ($(".loadable-history.js-loadable-history>.table-scroll>table>tbody").length > 1){
      var adminHistoryTable = $(".loadable-history.js-loadable-history>.table-scroll>table>tbody")[1];
	  } else {var adminHistoryTable = $(".loadable-history.js-loadable-history>.table-scroll>table>tbody")[0]}
      var adminHistoryTableRows = adminHistoryTable.getElementsByTagName("tr");
      var isAutoload = [false, true]; // isAutoload = [1 - Вообще была ли АЗ или нет, 2 - Условие item is closed не совпадает]
      var isRefunded = false;
      for (var i = 0; i<adminHistoryTableRows.length; i++){
          if (adminHistoryTableRows[i].getElementsByTagName("td")[2].innerHTML == "daemon-autoload") {
                adminHistoryTableRows[i].getElementsByTagName("td")[2].innerHTML = "<b>daemon-autoload<b>";
                if (adminHistoryTableRows[i].getElementsByTagName("td")[1].innerHTML == "Item is closed" && i>0){
                    isAutoload[1] = (adminHistoryTableRows[i-1].getElementsByTagName("td")[2].innerHTML !== "cron-premoderation");
                } else {
                    console.log(adminHistoryTableRows[i]);
                    isAutoload[0] = true;
                }
          }
          if (adminHistoryTableRows[i].getElementsByTagName("td")[1].innerHTML == "Refund (The blocked item was not in SERP)") {
              adminHistoryTableRows[i].getElementsByTagName("td")[1].innerHTML = "<b>Refund (The blocked item was not in SERP)<b>";
              isRefunded = true;
          }
      }
      if (isAutoload[0] && isAutoload[1]) {
          var ourElem = document.getElementsByTagName("header")[0].getElementsByTagName("h2")[0].getElementsByTagName("div")[0];
          var HTMLCode = document.createElement('i');
          HTMLCode.innerHTML = '<i class="glyphicon glyphicon-cloud-download btn-info" style="font-size:24px; padding: 3px; border-radius: 50%;" title="АЗ"></i>';
          var parent = ourElem.parentNode;
          parent.insertBefore(HTMLCode, ourElem);
      }
      if (isRefunded) {
          var ourElem = document.getElementsByTagName("header")[0].getElementsByTagName("h2")[0].getElementsByTagName("div")[0];
          var HTMLCode = document.createElement('i');
          HTMLCode.innerHTML = '<i class="glyphicon glyphicon-usd btn-info" style="font-size:20px; padding: 5px 6px 4px 4px;border-radius: 50%;" title="Компенсировано"></i>';
          var parent = ourElem.parentNode;
          parent.insertBefore(HTMLCode, ourElem);
      }
      var abuseDiv = document.getElementsByClassName("form-group")[5];
      var ourElement = document.createElement('div');
      ourElement.innerHTML = `<div class="form-group"> <label class="col-xs-3 control-label">Wallet Log</label> <div class="col-xs-9 form-control-static">
  <a href="/billing/walletlog?date=${timeToFind}&itemIds=${userID}" target="_blank/"><span>Перейти</span></a> </div> </div>`
      var parentDiv = abuseDiv.parentNode;
      parentDiv.insertBefore(ourElement, abuseDiv);
    $("button[value=Добавить]").after('<button type="submit" class="btn btn-info pull-left" id="photofake"> <i class="glyphicon glyphicon-plus"></i> Фейк </button>');
    $("#photofake").after('<button type="submit" class="pull-left btn btn-primary buttonMargin" id="tn"> <i class="glyphicon glyphicon-plus"></i> ТН </button>');
    $("#tn").after('<button type="submit" class="pull-left btn btn-warning buttonMargin" id="pushUp"> <i class="glyphicon glyphicon-plus"></i> Push </button>');
    $("#pushUp").after('<button type="button" class="pull-left btn btn-success buttonMargin" id="doubleComment"> <i class="glyphicon glyphicon-plus"></i> Учетка </button>');
    $(".buttonMargin").css("margin-left", "20px");
    var itemId = getId(window.location.href);
    var userId = getId($($(".form-group>.col-xs-9>a")[1]).attr("href"));
    $('#photofake').bind("click",function(){
    var message = "Фотофейк на редакт";
    var itemComment = {"type": 1, "ID": itemId, "comment": message};
    comment(itemComment);
    });
    $('#tn').bind("click",function(){
    var message = "Техническая неполадка, объявление №" + itemId;
    var pageComment = {"type": 2, "ID": userId, "comment": message};
    comment(pageComment);
    var itemComment = {"type": 1, "ID": itemId, "comment": message};
    comment(itemComment);
    });
    $('#doubleComment').bind("click",function(){
        var commentElem = document.getElementsByName("comment")[0];
        if((commentElem.value).trim() !== ""){
            commentElem.style.borderColor = "";
            var itemComment = {"type": 1, "ID": itemId, "comment": commentElem.value };
            comment(itemComment);
            var pageComment = {"type": 2, "ID": userId, "comment": commentElem.value + ", " + itemId };
            comment(pageComment);
            location.reload();
        } else {
            commentElem.style.borderColor = "red";
        }
    });
    $('#pushUp').bind("click",function(){
      var message = "Техническая неполадка, поднятие, №" + itemId;
      var pageComment = {"type": 2, "ID": userId, "comment": message};
      comment(pageComment);
      var itemComment = {"type": 1, "ID": itemId, "comment": message};
      comment(itemComment);
      });
  }
    var sum = 0;
    $('.text-right.red').each(function(){
        var reg = /[^\d]([\d\s]+).*/i;
        sum += parseInt($(this).html().match(reg)[1].replace(' ',''));
    });
var currentPage = window.location.href;
});
function comment(options) {
    $.post('https://adm.avito.ru/comment', {
                objectTypeId: options.type,
                objectId: options.ID,
                comment: options.comment
            });
}
function turnOnRemovedHistory(){
    $('.form-row:nth-child(4)').after('<div class="form-row"><input type="button" id="checkRemoved" value="История" class = "btn btn-default mb_activate green"/>');
    $('#checkRemoved').bind("click",function(){
        var items = document.getElementById('items').rows;
        if (items.length){
        for(var i = 1;i < items.length;i++){
            var row = items[i].innerHTML;
            if(!firstTime){
            checkItemHistory(0, items[i],  backUpHtml[i]);
        }
        else{
            backUpHtml[i] = $($(row)[8]).html();
            var status = $($(row)[8]).find('.item_cell_row').text().trim();
            notSync++;
            checkItemHistory($(row).find('.item_title').attr('href'), items[i], status);
        }
        }
        firstTime = !firstTime;
        console.log(firstTime);
        }
    });
    $('input[name="query"]').before($('<input id="gnum" type="button" value="|">').click(function(){var e = $('input[name="query"]')[0]; var r = $(e).val().match(/\d{9,}/g);r && $(e).val(r.join('|'));}));
    $('input[name="itemIds"]').before($('<input id="gnum" type="button" value=",">').click(function(){var e = $('input[name="itemIds"]')[0]; var r = $(e).val().match(/\d{9,}/g);r && $(e).val(r.join(','));}));
    $('#checkRemoved').after($('<input type="button" value="WalletLog" class = "btn btn-default mb_activate green"/></div>').click(openWalletLog));
    $('#checkRemoved').after($('<input type="button" value="ТН combo" class = "btn btn-default mb_activate green"/>').click(function(){
        bleachItems();
        pushUpItems();
        addCommentToItem(true);
        var message = "ТН, Объявления №" + collectItemsNumbers() + " , поднятие в поиске, bleach"
        var pageComment = {"type": 2, "ID": $(".item_user_login")[0].href.match(/\d{5,9}/)[0] , "comment": message};
        comment(pageComment);
    }))
    $('#checkRemoved').after($('<input type="button" value="Bleach" class = "btn btn-default mb_activate green"/></div>').click(bleachItems));
    $('#checkRemoved').after($('<input type="button" value="Push up" class = "btn btn-default mb_activate green"/>').click(pushUpItems));
    $('#checkRemoved').after($('<input type="button" value="Комментарий" class = "btn btn-default mb_activate green"/>').click(function(){
        addCommentToItem(false);
    }));
    $('#checkRemoved').after($('<input type="button" value="Номера" class = "btn btn-default mb_activate green"/>').click(function(){
        collectItemsNumbers();
    }));
     $('#checkRemoved').after($('<input type="button" value="Открыть каждое" class = "btn btn-default mb_activate green"/>').click(function(){
        var s = [];
        var counter = 0;
        $('input[name^="item_id"]:checked').each(function(){
            s[counter]= $(this).val();
            counter++;
        });
        if(s.length > 0){
            for (var i=0;i<s.length;i++){
            var url = "https://adm.avito.ru/items/item/info/"+s[i];
            window.open(url, '_blank');
            }
        }
    }));
     $('#checkRemoved').after($('<input type="button" value="Поиск по выделенным" class = "btn btn-default mb_activate green"/>').click(function(){
        var s = "";
        $('input[name^="item_id"]:checked').each(function(){
           s += $(this).val() +'|';
        });
        if(s.length > 0){
            var url = "https://adm.avito.ru/items/search?query="+s;
            window.open(url, '_blank');
        }
    }))
    ;
}
function activateItems(link){
                $.get('https://adm.avito.ru/items/item/activate/' + link).fail(function(resp){alert('Ошибка: ' + resp);});
        }
function unblockItems(link){
                $.get('https://adm.avito.ru/items/item/unblock/' + link).fail(function(resp){alert('Ошибка: ' + resp);});
        }
function openWalletLog(){
    var s = "";
    $('input[name^="item_id"]:checked').each(function(){
        s += $(this).val() +',';
    });
    if(s.length > 0){
        var url = `https://adm.avito.ru/billing/walletlog?date=${timeToFind}&itemIds=${s}`;
        window.open(url, '_blank');
    }
}
function bleachItems(zEvent){
if(confirm('Вы уверены что хотите отбелить выделенные объявления?')){
            $('input[name^="item_id"]:checked').each(function(){
                $.get('https://adm.avito.ru/items/item/bleach/' + $(this).val()).fail(function(resp){alert('Ошибка: ' + resp);});
            });

        }
}
function pushUpItems(zEvent){
        if(confirm('Вы уверены что хотите поднять выделенные объявления?')){
            $('input[name^="item_id"]:checked').each(function(){
                $.get('https://adm.avito.ru/items/item/push2up/' + $(this).val()).fail(function(resp){alert('Ошибка: ' + resp);});
            });

        }
    }
function addCommentToItem(isTN){
        var message = (isTN) ? "ТН, поднятие в поиске, блич" : prompt('Введите пожалуйста комментарий');
        if(message == null)
            return;
        $('td>input[name^="item_id"]:checked').each(function(timer){
            var itemComment = {"type": 1, "ID": $(this).val(), "comment": message};
            setTimeout(function(){
                console.log(itemComment);
                comment(itemComment);
            }, timer*100);
        });
        if (!isTN) {
			if(confirm('Добавить комментарий ТАКЖЕ на учетную запись?')){
			var pageComment = {"type": 2, "ID": $(".item_user_login")[0].href.match(/\d{5,9}/)[0] , "comment": "Объявления №" + collectItemsNumbers() + ", " + message};
			comment(pageComment);
			}
			}
		alert('комментарий был успешно оставлен')
    }
function collectItemsNumbers(){
        var s = '';
        $('td>input[name^="item_id"]:checked').each(function(){
            s += $(this).val() +'|';
        });
        if(s.length > 0){
         var result = s.substring(0,s.length-1);
          GM_setClipboard(result);
        }
        return result;
    }
function checkIsWFP(link, row, status) {
 $.get("https://adm.avito.ru/"+ link, function( data ){
     var wfp = $($(data).find(".col-xs-9.form-control-static>span")[4]).text().indexOf("Waiting for package");
     var textToAdd = (wfp>0) ? " / Waiting for package " : "";
     var textToSave = $(row).find('.item-status').text();
     $(row).find('.item-status').text(textToSave+textToAdd);
})
}
function checkItemHistory(link, row, status){
    $("#checkRemoved").removeClass().addClass("btn btn-primary");
    var statusText = status;
    if (link){
    $.get( "https://adm.avito.ru" + link+"/frst_history?history=-100", function( data ) {
        var tables = "";
        var array = [];
        var tableMid = "";
        var tableTop = `
        <div class="table-scroll">
          <table class="table table-striped">
        <thead>
            <tr> <th width="145">Дата</th> <th>Admin event</th> <th>Статус</th></tr>
        </thead>
        <tbody class="js-tbody">`;
        var tableBot = `
        </tbody>
        </table>
        </div>`;
        var dataLength = (data.length >= 3) ? 3 : data.length;
        for (var i = 0; i< data.length; i++){
            if (data[i].admin == "Refund (The blocked item was not in SERP)"){
                $(row).find('.item-status').after('<i class="glyphicon glyphicon-usd btn-primary" style="padding: 5px; border-radius: 50%;" title="'+data[i].formatedDate+'"></i>');
            }
            if (i<dataLength){
            var time = data[i].formatedDate;
            var event = data[i].event;
            var action = data[i].admin;
            tableMid+=`<tr> <td>${time} </td> <td>${action}</td> <td>${event}</td></tr>`;
            }
        }
        var fullTable = tableTop + tableMid + tableBot;
        $(row).find('.sort-time').html(fullTable);
    });
    // /*
    getInfo("https://adm.avito.ru" + link)
    .then(data => {
    var parser = new DOMParser,
        doc    = parser.parseFromString(data, "text/html");
    let feesId = 0;
        for (const a of doc.querySelectorAll(".item-form>.form-group>.form-control-static")) {
            let nodeList = a.querySelectorAll("span[title]:not(.js-tooltip)");
            if (nodeList.length==4) {
                let outputHTML = "";
                let bgColor = "";
                nodeList.forEach(span => {
                    if (span.innerHTML == "—"){bgColor= "style='background-color:pink'"}
                    outputHTML+=span.innerHTML + "<br>";
                })
                row.querySelector(".ah-copy-tooltip-pseudo-link").insertAdjacentHTML('afterend', `<div ${bgColor}><br>${outputHTML}</div>`);
            }
        }
})
// */
    }

    else {$(row).find('.sort-time').parent().html(statusText);
         $("#checkRemoved").removeClass().addClass("btn btn-default green");
         }
}
function getId(url){
    var idNum = url.substring(url.lastIndexOf('/')+1);
    var replace = (idNum.match(/\d+/) === null) ? 0 : idNum.match(/\d+/)[0];
    return replace;
}
var htmlmask = /<(?:.|\n)*?>/gm;
var linkmask = /(https?:\/\/[^\s,]+)/gm;
var imgmask = /(.jpe?g)|(.gif)|(.png)|(.bmp)|(.icon)/gi;
function preprocess(msg){
    msg = msg.replace(htmlmask,'');
    var counter = 0;
    msg = msg.replace(linkmask,function(a){
        if(imgmask.test(a)){
            return '</p><img src="' + a + '" style="border:10px solid #FFEBCD;"><p>';
        }
        counter++;
        return '<a href="' + a + '" target="_blank" style="color:green;"> ' +(a.length < 60 ? a : 'ссылка №' +  (counter) +'('+ extractDomain(a) +')') + '</a>';
    });
    return msg.replace(/\n/g,'<br>');
}

function extractDomain(url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];
    return domain;
}
var emailHistory = null;
var emailMask = /[^@]*@.*/i;
function turnOnEmailChecking(){
    $('.js-history.history.pseudo-link').click(function(){
        var interval = setInterval(
            function(){
                var historyPopUp = $('.popover-content');
                if(historyPopUp.length != 0){
                    clearInterval(interval);
                    if(emailHistory != null){
                        markFakeEmails();
                    }else{
                        getEmailHistory();
                    }
                }
            },300
        );
    });
}
function markFakeEmails(){
    $('.popover-content').find('td').each(function(){
        var s = $(this).text();
        if(emailMask.test(s)){
            $(this).css('color', (emailHistory[s]?"green":"red"));
        }
    });
}
function getEmailHistory(){
    emailHistory = {};
    emailHistory.len = 0;
    $('.popover-content').find('td').each(function(){
        var s = $(this).text();
        if(emailMask.test(s)){
            if(emailHistory[s] == undefined){
                emailHistory.len++;
                emailHistory[s] = true;
            }
        }
    });
    for(var o in emailHistory){
        if(o != 'len'){
            (function(e){
                $.get('https://adm.avito.ru/users/fakeemail?email=' + encodeURIComponent(e))
                    .done(function(data){
                    if(data.indexOf('Emails not found') == -1 && data.indexOf('&#10003;') == -1){
                        emailHistory[e] = false;
                    }
                    emailHistory.len--;
                    if(emailHistory.len == 0){
                        markFakeEmails();
                    }
                })
                    .fail(function(){
                    alert('Ошибка при запросе истории email.');
                });
            })(o);
        }
    }
}
function startCheck(){
    var array = [];
    var items = document.querySelectorAll(".js-history-table-item>td:first-child");
    items.forEach(item => array.push(item.innerHTML));
    Array.prototype.contains = function(v) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === v) return true;
        }
        return false;
    };
    Array.prototype.unique = function() {
        var arr = [];
        var notUnique = [];
        for(var i = 0; i < this.length; i++) {
            if(!arr.includes(this[i])) {
                arr.push(this[i]);
            }
            else {notUnique.push(this[i])}
        }
        return [arr, notUnique];
    };
    var uniques = array.unique();
    console.log(uniques[0], uniques[1]);
        var notUniqueLink = "";
        uniques[1].forEach(item => notUniqueLink+= item+"|");
        console.log(notUniqueLink);
         var tableHTML =
`<style>
.unique-table{
    position: fixed;
    right: 5vw;
    top: 40vh;
    padding: 10px;
    background: #eee;
    opacity: 0.8;
    box-shadow: rgba(0, 0, 0, 0.172549) 0px 0px 12px;
    margin: 0px 0px 8px;
    border-radius: 4px;
}
.unique-table__content>tr>td{
margin:5px;
padding:5px;
}
</style>
<div class="unique-table">
    <table class="unique-table__body">
        <tbody class="unique-table__content">
            <tr>
                <td>Списано размещений</td>
                <td>${uniques[0].length+uniques[1].length}</td>
            </tr>
            <tr>
                <td>Объявлений размещено</td>
                <td>${uniques[0].length}</td>
            </tr>
            <tr>
                <td>Лишние списания</td>
                <td>${uniques[1].length}</td>
            </tr>
             <tr>
                <td>Оплаченные более 1 раза</td>
                <td><a href="https://adm.avito.ru/items/search?date=06%2F03%2F2018+00%3A00+-+06%2F03%2F2018+23%3A59&phone=&user=&ip=&query=${notUniqueLink}&price_min=&price_max=&percent_min=&percent_max=&sort_field=st" target=_blank>Открыть в поиске</a></td>
            </tr>
        </tbody>
    </table>
</div>`;
    if (document.querySelectorAll(".unique-table").length<1){
        document.querySelector(".content").insertAdjacentHTML('afterbegin', tableHTML);
    }
}
function getUserID(url){
   $.get(url).done(function(data){
       let regExp = /data-userid=\"[0-9]+\"/g;
       let userLink = data.match(regExp)[0].match(/[0-9]+/)[0];
       window.open("https://adm.avito.ru/users/user/info/" + userLink);
        });
}
function checkFeeReturn(){
    var length = (document.querySelectorAll(".form-group>div.col-xs-9.form-control-static>a").length >= 9) ? "1" : "0";
    var userURL = document.querySelectorAll(".form-group>div>a")[length].href;
    let userLink = userURL.match(/[0-9]+/)[0];
    console.log(userLink);
    getInfo(userURL)
        .then(data => {
        var parser = new DOMParser,
            doc    = parser.parseFromString(data, "text/html");
        var subs, isSubActive, shop, isShopActive, shopText, subsText;
        let categories = document.querySelectorAll("span[data-placement='bottom']");
        let catToFind = categories[0].innerHTML.trim() + "/" + categories[1].innerHTML.trim();
        let feesId = 0;
        for (const a of doc.querySelectorAll("#fees-packages-available-global>div>table>tbody>tr")) {
            let neededCell = a.cells[1];
            if (neededCell !== undefined) {
                let buttonCell = a.cells[4];

                let children = neededCell.childNodes;
                let outputText = "";
                children.forEach(child => {
                    if (child.textContent !== undefined) outputText+= child.textContent.trim();
                })
                if (outputText.includes(catToFind)) {
                    feesId = buttonCell.childNodes[1].dataset.id;
                    console.log(catToFind);
                    console.log(feesId);
                }
            }
        }
        return feesId;
    })
    .then(id =>{
        $.get("https://adm.avito.ru/users/user/"+userLink+"/fee_limits/"+id).done(data => {
            let itemId = getId(window.location.href);
            let array = data.pubsHistory;
            array.forEach(item =>{
                if (item.itemId == itemId) {
                    let button = document.querySelector(".feeReturn");
                    if (item.isRefund) {
                        button.innerHTML = "Возврат был";
                        button.classList.remove("btn-success");
                        button.classList.add("btn-danger");
                    } else {
                        button.innerHTML = "Возврата не было";
                        button.classList.remove("btn-success");
                        button.classList.add("btn-primary");}
                };
            })
        });
    });
}
function getInfo(url){
          return new Promise(function(resolve, reject) {
              $.get(url).done(data => resolve(data));
          });
      }
function createTicket(json) {
                return new Promise(function(resolve, reject) {
                    $.post('https://adm.avito.ru/helpdesk/api/1/ticket/add', json, function(data, status){
                        var url = "https://adm.avito.ru/helpdesk/details/" + data.id;
                        resolve({"url" : url, "ticket": data.id});
                    });
                });
            }
function createPostCallTicket(){
    let email = document.querySelector(".js-fakeemail-field").innerHTML;
    var toPostJSON = {
                "problemId":50,
                "submitterId":localStorage.agentID,
                "typeId": 1,
                "channelId": 3,
                "receivedAtEmail": "shop_support@avito.ru",
                "subject": "Обращение в службу поддержки",
                "theme": 42,
                "sourceId": 3,
                "problem": 50,
                "statusId": 1,
                "tags[0]": 1296,
                "description": "Здравствуйте. Ваша заявка принята в обработку. Пожалуйста, ожидайте ответа в ближайшее время.",
                "requesterEmail": email,
                "requesterName": localStorage.agentName
            };
    createTicket(toPostJSON)
    .then(data => window.open("https://adm.avito.ru/helpdesk/details/"+data.ticket));
}
