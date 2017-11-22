// ==UserScript==
// @name         Helper plus
// @version      3.9
// @author       izayats@avito.ru
// @include      https://adm.avito.ru/*
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
var usersComment = true;
var login = "";
var userID = getId(window.location.href);
var comments = [];
var COMM_AMOUNTS = 20;
var MAX_LEN = 600;
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
  if(window.location.href.indexOf('/user/info') != -1){
    login = $('.dropdown-toggle').slice(-1)[0].innerHTML.match(/([^\n]+)/i)[1];
  }
  if(window.location.href.indexOf('/item/info') != -1){
      var abuse = document.getElementsByClassName("form-group")[5];
      var ourElement = document.createElement('div');
      ourElement.innerHTML = `<div class="form-group"> <label class="col-xs-3 control-label">Wallet Log</label> <div class="col-xs-9 form-control-static">
  <a href="/billing/walletlog?date=${timeToFind}&itemIds=${userID}" target="_blank/"><span>Перейти</span></a> </div> </div>`
      var parentDiv = abuse.parentNode;
      parentDiv.insertBefore(ourElement, abuse);
    $("button[value=Добавить]").after('<button type="submit" class="btn btn-info pull-left" id="task865"> <i class="glyphicon glyphicon-plus"></i> 865 </button>');
    $("#task865").after('<button type="submit" class="pull-left btn btn-primary col-md-offset-1" id="tn"> <i class="glyphicon glyphicon-plus"></i> ТН </button>');
    $("#tn").after('<button type="submit" class="pull-left btn btn-warning col-md-offset-1" id="pushUp"> <i class="glyphicon glyphicon-plus"></i> Push </button>');
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
        $('input[name^="item_id"]:checked').each(function(){
            var itemComment = {"type": 1, "ID": $(this).val(), "comment": message};
            console.log(itemComment);
            comment(itemComment);
        });
        alert('комментарий был успешно оставлен');
    }
function collectItemsNumbers(){
        var s = '';
        $('input[name^="item_id"]:checked').each(function(){
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
