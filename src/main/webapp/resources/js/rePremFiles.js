var clientsFromBIBaseMap = new Map();
var clientsInFCBaseMap = new Map();
var clientsToAddFromBI = new Map();
var clientsFromBIBaseArray = [];
var clientsInFCBaseArray = [];
var result = [];
var finalCSVFile = [];
var headerNames = ["External_id", "name", "ADMIN Contact Name", "Phone from admin", "телефон1"];
var neededHeaders = ["avito_id", "username", "contact_person", "adm_phone", "contact_phone"];
var arrayOfObjectsOfActiveUsers = [];
var wrongNumbers = []; 
$(document).ready(function() {
    $('#files').change(function(){ readFile(); });
});
function readFile() {
    var files = document.getElementById('files').files;
    var file = files[0];
    var ourData = "";
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        ourData = evt.target.result;
      }
    };
    reader.readAsText(file);
    setTimeout(function(){csvJSON(ourData);
    getAllRepremUsers();
    setTimeout(function(){checkClientsToAdd(clientsInFCBaseMap, result);}, 1500);
    createCSV();    }, 2000);
    console.log(clientsInFCBaseMap);
    console.log(clientsFromBIBaseMap);
  }
function csvJSON(csv){
  var lines=csv.split("\n");
  console.log(lines);
  var mapResult = [];
  var headers=lines[0].split(";");
  console.log(headers);
  for(var i=1;i<lines.length;i++){
    var obj = {};
    var currentline=lines[i].split(";");
    for(var j=0;j<headers.length;j++){
      if (headerNames.indexOf(headers[j])+1){
      obj[neededHeaders[headerNames.indexOf(headers[j])]] = currentline[j];
      }
      if (neededHeaders[headerNames.indexOf(headers[j])] === "avito_id"){
        clientsFromBIBaseMap.set(+currentline[j], "true");
      }
    }
    result.push(obj);
  }
  console.log(result);
}
function setActiveStatus(status, id){
    var client ={
                "avitoId" : id,
                "active"  : +status
              };
              RestPost(client, updateRepremActiveURL);
}
function getAllRepremUsers(){
$.get(getAllRepremUsersURL).done(function (data) {
  var info = data;
  for (var i = 0;i<info.length;i++){
    if(clientsFromBIBaseMap.has(info[i].avitoId) != info[i].active){setActiveStatus(clientsFromBIBaseMap.has(info[i].avitoId), info[i].avitoId);}
      clientsInFCBaseMap.set(info[i].avitoId, true);
  }
  }) 
}
function checkClientsToAdd(map, array){
    console.log(map);
    console.log(array);
    for (var i=0; i<array.length; i++){
        if(!map.has(+array[i].avito_id) && +array[i].avito_id > 0){
            var newClient = {
                "avitoId" : array[i].avito_id,
                "admPhone" : array[i].adm_phone,
                "contactPerson" :  array[i].contact_person,
                "contactPhone" :  array[i].contact_phone,
                "username" :  array[i].username,
                "active" : 1
            }
            RestPost(newClient, addRepremURL);
        }
    }
}
function createCSV(){
$.get(getAllRepremUsersURL).done(function (data) {
  var info = data;
  var regExpMultilines = /(\r\n|\n|\r)\1{1,}/gm;
  var phoneRegExp = /([7|8])([0-9]{10})/gm;
  for (var i = 0;i<info.length;i++){
    var obj = {};
    if (info[i].active){
        var nameWOComma = (info[i].username).replace(",", ".");
        var phone = (info[i].admPhone+"").replace(phoneRegExp, "$2");
            obj = {
                "Name" : info[i].avitoId + ", " + nameWOComma,
                "Phone" : +phone            
            }
            if (phone<1000000000 || phone>70000000000){wrongNumbers.push(obj);}
            else {arrayOfObjectsOfActiveUsers.push(obj)};
            if (info[i].contactPhone > 0){
                var phone = (info[i].contactPhone+"").replace(phoneRegExp, "$2");
                obj = {
                "Name" : info[i].avitoId + ", " + nameWOComma,
                "Phone" : +phone            
                }
                if (phone<1000000000 || phone>70000000000){wrongNumbers.push(obj);}
            else {arrayOfObjectsOfActiveUsers.push(obj)};  
            }
            if(info[i].additionalPhones !== null){
                if ((info[i].additionalPhones).replace(regExpMultilines, "") !== null && (info[i].additionalPhones).replace(regExpMultilines, "") !== "" && (info[i].additionalPhones).replace(regExpMultilines, "") !== " "){
                    var numbers = (info[i].additionalPhones).replace(regExpMultilines, "\n").trim();
                    var numbersArray = numbers.split("\n");
                    for (var j=0;j<numbersArray.length; j++){
                        var phone = parseInt((numbersArray[j]+"").replace(phoneRegExp, "$2"));
                        obj = {
                        "Name" : info[i].avitoId + ", " + nameWOComma,
                        "Phone" : phone           
                        }
                        if (phone<1000000000 || phone>70000000000 || phone === NaN){wrongNumbers.push(obj);}
                        else {arrayOfObjectsOfActiveUsers.push(obj)};  
                    }
                }       
            }           
    }   
  } 
  var date = new Date();
  downloadCSV({
            data: dedupe(arrayOfObjectsOfActiveUsers),
            filename: "reprem-"+date.getHours()+"-"+date.getMinutes()+".csv"
        })
  downloadCSV({
            data: dedupe(wrongNumbers),
            filename: "wrongNumbers-"+date.getHours()+"-"+date.getMinutes()+".csv"
        })
  })
}
function dedupe(arr) {
  return arr.reduce(function (p, c) {
    var id = [c.Name, c.Phone].join('|');
    if (p.temp.indexOf(id) === -1) {
      p.out.push(c);
      p.temp.push(id);
    }
    return p;
  }, { temp: [], out: [] }).out;
}
function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;
        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }
        columnDelimiter = args.columnDelimiter || ';';
        lineDelimiter = args.lineDelimiter || '\n';
        keys = Object.keys(data[0]);
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }
function downloadCSV(args) {
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: args.data
        });
        if (csv == null) return;
        filename = args.filename || 'export.csv';
        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=cp1251,' + csv;
        }
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
}