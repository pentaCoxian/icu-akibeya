//This Google Apps Script is for converting the awful table to filters for openclassrooms.icu
//Beware that this script has to be adjusted for each day of the week.It will output filters based on which sheet youre on.
//Also, this script can NOT read *4 rooms, please move the dot to the upper row in order for it to work.

const headletter = "tu" //Change for day of　week probablly can do it with sheet name but too Mendokusai

function joinArrayToString(val) {
  var tmp = val.map(convertEmojiToFilter).join("");
  Logger.log(tmp);
  return(tmp);
}

function convertEmojiToFilter(value,index){
  if(value == 0){
    return headletter + (index + 1) + " ";
  }
  else{
    return "";
  }
}

function myFunction() {
  Logger.log("hello?");
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var lastrow = sheet.getLastRow();
  //range ops
  var startrow = 5;
  var startcol = 2;
  var maxperiod = 7;
  Logger.log("start");
  for (let i = startrow; i < lastrow;i = i + 2){
    var range = sheet.getRange(i,startcol,1,startcol + maxperiod -1);
    var value = range.getValues();
    //Logger.log(value);
    var temp = value.map(joinArrayToString);
    Logger.log(temp);
    var writeto = sheet.getRange(i,12).setValue(temp);
  }

}