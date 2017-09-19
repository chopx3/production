var clientsInFCBaseMap = new Map();
var clientsToAddFromBI = new Map();
var clientsFromBIBaseArray = [];
var clientsInFCBaseArray = [];
var finalCSVFile = [];
var correctNumbers = [];
var wrongNumbers = []; 
$(document).ready(function() {
    $('#files').change(function(){ start(); });
});
function start() {
  var files = document.getElementById('files').files;
  var file = files[0];
  readFile(file)
  .then(function(csv) { return map=convertCsvToMap(csv); })
  .then(function(map){ return updatedMap = updateMap(map) })
  .then(function(updatedMap){ 
    setTimeout(function(){  
    for (var [key, value] of updatedMap) {
      if (value["inBase"] == false && key>0){ 
        checkNumber(value);
        addClient(value);
      }
    };
    var date = new Date();
    downloadCSV({
              data: dedupe(correctNumbers),
              filename: "reprem-"+date.getHours()+"-"+date.getMinutes()+".csv"
          })
    downloadCSV({
              data: dedupe(wrongNumbers),
              filename: "wrongNumbers-"+date.getHours()+"-"+date.getMinutes()+".csv"
          })
  }, 1000)
  });
}
function readFile(file){
  return new Promise(function(resolve, reject) {
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = function(evt) {
    if (evt.target.readyState == FileReader.DONE) { // DONE == 2
      resolve(evt.target.result);
    }
  };
})
}
function convertCsvToMap(csv){
  var headerNames = ["External_id", "name", "ADMIN Contact Name", "Phone from admin", "телефон1"];
  var neededHeaders = ["avitoId", "username", "contactPerson", "admPhone", "contactPhone"];
  var clientsFromBIBaseMap = new Map();
  var regExpTab = /\t/gm;
  csv = csv.replace(regExpTab, ";");
  console.log(csv);
  var lines=csv.split("\n");
  console.log(lines);
  var mapResult = [];
  var headers=lines[0].split(";");
  console.log(headers);
  for(var i=1;i<lines.length;i++){
    var obj = {};
    var currentline=lines[i].split(";");
    var combinedArrayLine = [];
    var lineID = 0;
    for(var j=0;j<headers.length;j++){
      if (headerNames.indexOf(headers[j])+1){
      combinedArrayLine[neededHeaders[headerNames.indexOf(headers[j])]] = currentline[j];
      }
      if (neededHeaders[headerNames.indexOf(headers[j])] === "avitoId"){
        lineID = currentline[j];
      }
    }
    combinedArrayLine["inBase"] = false;
    clientsFromBIBaseMap.set(+lineID, combinedArrayLine);
  }
  return clientsFromBIBaseMap;
}
function updateMap(map) {
  var updatedMap = map;
  $.get(getAllRepremUsersURL).done(function (data) {
  var info = data;  
  for (var i = 0;i<info.length;i++) {
    if ( updatedMap.has(info[i].avitoId) && info[i].avitoId > 0 ) {
    checkNumber(info[i]);
    var idArray = updatedMap.get(info[i].avitoId);
    idArray["inBase"] = true;
    updatedMap.set(info[i].avitoId, idArray);
  }
  }
})
return updatedMap;
}
function addClient(client) {
  var newClient = {
      "avitoId" : client.avitoId,
      "admPhone" : client.admPhone,
      "contactPerson" :  client.contactPerson,
      "contactPhone" :  client.contactPhone,
      "username" :  client.username,
      "active" : 1
  }
  RestPost(newClient, addRepremURL);
}
function checkNumber(number){  
  var regExpMultilines = /(\r\n|\n|\r)\1{1,}/gm;
  var phoneRegExp = /([7|8])([0-9]{10})/gm;
  var obj = {};
  var username = number.username || "-";
  var nameWOComma = username.replace(",", ".");
  var phone = (number.admPhone+"").replace(phoneRegExp, "$2");
      obj = {
          "Name" : number.avitoId + ", " + nameWOComma,
          "Phone" : +phone            
      }
      if (checkPhone(phone)){wrongNumbers.push(obj);}
      else {correctNumbers.push(obj)};
      if (number.contactPhone > 0){
          var phone = (number.contactPhone+"").replace(phoneRegExp, "$2");
          obj = {
          "Name" : number.avitoId + ", " + nameWOComma,
          "Phone" : +phone            
          }
          if (checkPhone(phone)){wrongNumbers.push(obj);}
      else {correctNumbers.push(obj)};  
      }
      if(number.additionalPhones !== null && number.additionalPhones !== undefined) {
          if ((number.additionalPhones).replace(regExpMultilines, "") !== null && (number.additionalPhones).replace(regExpMultilines, "") !== "" && (number.additionalPhones).replace(regExpMultilines, "") !== " "){
              var numbers = (number.additionalPhones).replace(regExpMultilines, "\n").trim();
              var numbersArray = numbers.split("\n");
              for (var j=0;j<numbersArray.length; j++) {
                  var phone = parseInt((numbersArray[j]+"").replace(phoneRegExp, "$2"));
                  obj = {
                  "Name" : number.avitoId + ", " + nameWOComma,
                  "Phone" : phone           
                  }
                  if (checkPhone(phone)){wrongNumbers.push(obj);}
                  else {correctNumbers.push(obj)};  
              }
          }       
      }           
}
function checkPhone(phone){
  var minNumber = 1000000000;
  var maxNumber = 70000000000;
  return (phone<minNumber || phone>maxNumber || phone === NaN) ;
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