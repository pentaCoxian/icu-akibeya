//This Google Apps Script is for converting that awful table to filters for openclassrooms.icu
//It should be almost fully automated, exept for *4. *4 is NOT detected by default and needs the dot to be moved to the top slot manually.

const days = ["M", "TU", "W", "TH", "F", "SA"];
var headletter;

function myFunction() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  for(let j = 0; j < days.length; j++){
    var sheet = spreadsheet.getSheetByName(days[j]);
    headletter = days[j].toLowerCase();
    //range ops
    var startrow = 5;
    var startcol = 2;
    var maxperiod = 7;
    for (let i = startrow; i < 130;i = i + 2){
      var range = sheet.getRange(i,startcol,1,startcol + maxperiod -1);
      var value = range.getValues();
      //Logger.log(value);
      var temp = value.map(joinArrayToString);
      
      Logger.log(temp);
      var writeto = sheet.getRange(i,11).setValue(temp);
    }
  }
  rollSheets();
}

function joinArrayToString(val) {
  convertEmojiToFilter.apply(headletter);
  var temp = val.map(convertEmojiToFilter).join("");
  
  return(temp);
}

function convertEmojiToFilter(value,index){
  if(value == 0){
    return headletter + (index + 1) + " ";
  }
  else{
    return "";
  }
}

function rollSheets(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var startrow = 5;
  
  for(let i = startrow; i < 130; i = i + 2){
    var output = spreadsheet.getSheetByName("M")
    var room = output.getRange(i,1).getValue().slice(0,5);
    const res = [];
    for(let j = 0; j < days.length; j++){
     var sheet = spreadsheet.getSheetByName(days[j]); 
     var rang = sheet.getRange(i,11);
     res.push(rang.getValue());
     var filter = res.join("");
    }
    Logger.log(room);
    Logger.log(filter);
    output.getRange(i,17).setValue(room);
    output.getRange(i,18).setValue(filter);
  }
}