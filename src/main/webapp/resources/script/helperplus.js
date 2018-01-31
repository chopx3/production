// ==UserScript==
// @name         Helper plus
// @version      5.2
// @author       izayats@avito.ru
// @include      https://adm.avito.ru/*
// @include      http://192.168.8.56/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require      https://cdn.jsdelivr.net/momentjs/latest/moment.min.js
// @require      https://raw.githubusercontent.com/phstc/jquery-dateFormat/master/dist/jquery-dateFormat.min.js
// @downloadURL  https://raw.githubusercontent.com/chopx3/production/dev/src/main/webapp/resources/script/helperplus.js
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// ==/UserScript==

'use strict';
var serverURL = "10.10.36.50";
var showRemovedHistory = true;
var backUpHtml = [];
var phoneVerificationCheck = false;
var checkEmails = true;
var login = "";
var userID = getId(window.location.href);
var removed = "<span class='item-status  grey'>Removed</span>";
var archived = '<span class="item-status  grey">Archived</span>';
var notSync = 0;
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
    if(showRemovedHistory)
        turnOnRemovedHistory();
    if(phoneVerificationCheck)
        turnOnPhoneVerificationCheck();
    if(checkEmails)
        turnOnEmailChecking();
    if(window.location.href.indexOf('/packages/info/') != -1){
        var shopLink = $("section.content>div>div>a")[0].href;
        var shopLinkHTML = $("section.content>div>div>a")[0].outerHTML;
        $.get(shopLink).done(function(data){
            var userLink = $("[data-userid]", data)[0].dataset.userid;
            $("section.content>div>div>a")[0].outerHTML = (shopLinkHTML+'<a href="/users/user/info/'+userLink+'" type="button" class="btn btn-success" style="margin-left:20px">← Вернуться на УЗ</a>');
            var subsNums = $(".header__title")[0].innerHTML.match(/\d+/g);
            console.log(subsNums[0], subsNums[1]);
            $("[type=submit]")[0].after("  max = " + (subsNums[1] - subsNums[0]));
            $("tr[data-status-id='']>td:nth-child(2)").html("Archived");
        });
    }
    if(window.location.href.indexOf('/user/info') != -1){
        login = $('.dropdown-toggle').slice(-1)[0].innerHTML.match(/([^\n]+)/i)[1];
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
    if(window.location.href.indexOf('users/account/info') != -1){
        var packRefundRows = $(".account-history>tbody>tr>td:contains('Списание при возврате по пакету')").parent();
        packRefundRows.each(function (index){
            var packageRefundNum = ($("td",this)[1].innerHTML).replace(/(\s|[a-яА-Я])+/g, "");
            var packageRefundSum = ($("td>span",this)[0].innerHTML).replace(/(\s|[а-я]|\+|\.|\-)+/g, "");
            var packageRefundLink = $("td>a",this)[0].href;
            $("td>button",this).after(`<button class="btn btn-default btn-xs packageButtons" data-refund=${packageRefundSum} data-package=${packageRefundNum} data-text="Тикет №___ ," data-link=${packageRefundLink}><i class="glyphicon glyphicon-envelope"></i></button><button class="btn btn-default btn-xs packageButtons" data-refund=${packageRefundSum} data-package=${packageRefundNum} data-text="Звонок," data-link=${packageRefundLink}><i class="glyphicon glyphicon-earphone"></i></button>`);        });
        $('.packageButtons').bind("click",function(){
            var message = `${this.dataset.text} Корректировка бонусами за пакет ${this.dataset.package},  ${this.dataset.link}`;
            $($(".js-payment-method")[0]).val("101");
            $($("input[name=comment]")[0]).val(message);
            $(".form-control.js-payment-amount").val(this.dataset.refund);
            $(window).scrollTop($('#payin').offset().top-50);
            });
    }
    if(window.location.href.indexOf('shops/info/view') != -1){
        if ($("#watermark").prop("checked") != undefined){
            var isWmChecked = $("#watermark").prop("checked");
            var wmSpan = (isWmChecked) ? `<span class="label label-info" id=watermarkSpan style="cursor:pointer;"> Подключен </span>` : `<span class="label label-danger" id=watermarkSpan style="cursor:pointer;"> Отключен </span>`;
            var tarifDiv = document.getElementsByClassName("form-group")[4];
            var waterMarkDiv = document.createElement('div');
            waterMarkDiv.innerHTML = `<div class="form-group"> <label class="col-xs-4 control-label">Водяной знак</label> <div class="col-xs-8"> <div class="help-block">${wmSpan}</div>  </div> </div>`
            var parentDiv = tarifDiv.parentNode;
            parentDiv.insertBefore(waterMarkDiv, tarifDiv);
            $('#watermarkSpan').bind("click",function(){
                $(window).scrollTop($('#watermark').offset().top);
            });
            $("button[value=Добавить]").after('<button type="submit" class="btn btn-info pull-left watermarkButtons" id="repeatWaterMark" title="Водяной знак переподключен"> <i class="glyphicon glyphicon-repeat"></i> WM</button>');
            $("button[value=Добавить]").after('<button type="submit" class="btn btn-danger pull-left watermarkButtons" id="removeWaterMark" title="Водяной знак отключен"> <i class="glyphicon glyphicon-minus"></i> WM</button>');
            $("button[value=Добавить]").after('<button type="submit" class="btn btn-success pull-left watermarkButtons" id="addWaterMark" title="Водяной знак подключен"> <i class="glyphicon glyphicon-plus"></i> WM</button>');
            $('.watermarkButtons').bind("click",function(){
                var message = this.title;
                console.log(message);
                var shopComment = {"type": 3, "ID": userID, "comment": message};
                comment(shopComment);
            });
        }
        var isGeneral = ($(".js-notification-phone")[0] != undefined);
            console.log(isGeneral);
            if (isGeneral){
                var afterPlaceholder = ($("#watermark").prop("checked") != undefined) ? ["#repeatWaterMark", "col-lg-offset-2"] : ["button[value=Добавить]", ""];
                var phone = $(".js-notification-phone")[0].value;
                var dateInterval = $(".js-notification-interval-days option:selected").text();
                $(afterPlaceholder[0]).after('<button type="submit" class="btn btn-info pull-left '+afterPlaceholder[1]+'" id="smsNotification" title="Замена номера телефона"> <i class="glyphicon glyphicon-phone"></i> SMS </button>');
                $('#smsNotification').bind("click",function(){
                    if ( (phone != $(".js-notification-phone")[0].value) || (dateInterval != $(".js-notification-interval-days option:selected").text()) ){
                        var newPhone = $(".js-notification-phone")[0].value;
                        var newInterval = $(".js-notification-interval-days option:selected").text().trim();
                        dateInterval = dateInterval.trim();
                        var message = `Настройки СМС-оповещения изменены:\n Номер телефона: ${phone}, (${dateInterval}) --> \nНомер телефона: ${newPhone}, (${newInterval})`;
                        var shopComment = {"type": 3, "ID": userID, "comment": message};
                        comment(shopComment);
                    }
                });
            }
    }
    if(window.location.href.indexOf('helpdesk?') != -1){
        var helpdeskEl = document.getElementsByClassName("helpdesk-main-section")[0].getElementsByTagName("header")[0].getElementsByTagName("div")[1].getElementsByTagName("div")[0];
        var abuseButton = document.createElement('div');
       /* abuseButton.className  += `btn btn-default`;
        abuseButton.id  = `abuseButton`;
        abuseButton.innerHTML  = `Создать жалобу`;*/
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
            setTimeout(function(){
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
                    "description": `
___ - ссылка на объявления или учетную запись пользователя
___ - ID пользователя, если нет информации выше.
___ - детальное описание жалобы
___ - инициатор жалобы (ID)
___ - категория проверяемого контента жалобы
___ - адресат для ответа: МП или клиент, инициирующий проверку`,
                    "requesterEmail": localStorage.agentEmail,
                    "requesterName": localStorage.agentName
                };
                $.post('https://adm.avito.ru/helpdesk/api/1/ticket/add', toPostJSON, function(data, status){
                    console.log(data);
                    var url = "https://adm.avito.ru/helpdesk/details/" + data.id;
                    window.open( url, '_blank');
                });
            }, 300);
        })
    }
  if(window.location.href.indexOf('/item/info') != -1){
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
    $("button[value=Добавить]").after('<button type="submit" class="btn btn-info pull-left" id="task865"> <i class="glyphicon glyphicon-plus"></i> 865 </button>');
    $("#task865").after('<button type="submit" class="pull-left btn btn-primary buttonMargin" id="tn"> <i class="glyphicon glyphicon-plus"></i> ТН </button>');
    $("#tn").after('<button type="submit" class="pull-left btn btn-warning buttonMargin" id="pushUp"> <i class="glyphicon glyphicon-plus"></i> Push </button>');
    $("#pushUp").after('<button type="submit" class="pull-left btn btn-success buttonMargin" id="doubleComment"> <i class="glyphicon glyphicon-plus"></i> Учетка </button>');
    $(".buttonMargin").css("margin-left", "20px");
    var itemId = getId(window.location.href);
    var userId = getId($($(".form-group>.col-xs-9>a")[1]).attr("href"));
    $('#task865').bind("click",function(){
    var message = "Таск 865, активация, объявление №" + itemId;
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
    var message = $("[name=comment]").val() + ", " + itemId;
    var pageComment = {"type": 2, "ID": userId, "comment": message };
    comment(pageComment);
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
    $("input.mb_unblock").after('<button class="btn btn-default mb_unblock green" id="Activate">Waiting for Package</button>');
      $('#Activate').bind("click",function(){
        $('input[name^="item_id"]:checked').each(function(){
            var id = $(this).val();
            var fullStatus = $($(this).parent().parent().html()).find('.item_cell_row>.item-status').text();
            var wfpStatus = fullStatus.substring(fullStatus.lastIndexOf('/')+1).trim();
            var itemStatus = fullStatus.substring(0, fullStatus.indexOf('/')).trim();
            console.log(wfpStatus, itemStatus);
            var done = 0;
            if (wfpStatus == "Waiting for package"){
                if (itemStatus == "Paid" && itemStatus == "Unblocked" && itemStatus == "Added" && itemStatus == "Activated"){
                    activateItems(id);
                    done++;
                }
                if (itemStatus == "Blocked"){
                    unblockItems(id);
                    activateItems(id);
                    done++;
                }
                if (itemStatus == "Rejected"){
                    activateItems(id);
                    activateItems(id);
                    done++;
                }
            }
            if (done){
                var message = "Таск 865, активация, объявление №" + id;
                var itemComment = {"type": 1, "ID": id, "comment": message};
                comment(itemComment);
            }
      });
          location.reload();
      });
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
            checkIsWFP($(row).find('.item_title').attr('href'), items[i], status);
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
            location.reload();
        }
}
function pushUpItems(zEvent){
        if(confirm('Вы уверены что хотите поднять выделенные объявления?')){
            $('input[name^="item_id"]:checked').each(function(){
                $.get('https://adm.avito.ru/items/item/push2up/' + $(this).val()).fail(function(resp){alert('Ошибка: ' + resp);});
            });
            location.reload();
        }
    }
function addCommentToItem(isTN){
        var message = (isTN) ? "ТН, поднятие в поиске, блич" : prompt('Введите пожалуйста комментарий');
        if(message == null)
            return;
        $('td>input[name^="item_id"]:checked').each(function(){
            var itemComment = {"type": 1, "ID": $(this).val(), "comment": message};
            console.log(itemComment);
            comment(itemComment);
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
        console.log(data);
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
