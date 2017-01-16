
/*
* Replace all is a method that uses regex to replace the slashes (-) with (/), but it can be used for other means.
*/
String.prototype.replaceAll = function(search, replace)
{
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};
/*
* replaceOne num is to replace the number length if it's a single digit number or leave it alone if it's larger than that, for use with the date calls to the Spire API
*/
function replaceOneNum(number){
  if(number.length == 1){
    number = "0"+number;
    return number;
  }
  else{
    return number;
  }
}

var request = require('request');

//You have to specify the date ranges you are looking for, or provide it within a CSV and use that to parse through.
var datestring = "2016-12-21"
var dateend = "2017-01-03";
/* Access token will be given after you go into the Spire API web portal, the e-mail and id is more for tracking multiple users, you will either need to fill it in here, or provide a CSV and iterate
* through it.
*/
var access_token="token here";
var email = "email here";
var id = "id here";
var fs = require('fs');

var writespirestreakstream=fs.createWriteStream("spireStreakOutput.csv");

var realStartDate = new Date(datestring.replaceAll('-', '/'));
var realEndDate = new Date(dateend.replaceAll('-', '/'));

while (realStartDate < realEndDate){
  var year = realStartDate.getFullYear().toString();
  var month = replaceOneNum(realStartDate.getMonth()+1);
  var monthconv = replaceOneNum(month);
  var day = replaceOneNum(realStartDate.getDate().toString());
  var realStartDateString = year+"-"+month+"-"+day;
  var newDate = realStartDate.setDate(realStartDate.getDate() + 1);
  realStartDate = new Date(newDate);
  var datetowrite = realStartDateString;

  processSpireStreaks(realStartDateString);

}

/* Keeping Spire breathing, but it's a rather large dataset and sometimes access tokens give blank arrays, even though I get a successful code back.
* This is most likely due to changes introduced in the Spire API to Version 2 back in late November of 2016, a lot of the functionality of their API wasn't as seamless as it was before,
  They also introduced rate limits.
*/

/*
function processSpireBreathing(realStartDateString){
  request('https://app.spire.io/api/v2/events?access_token='+access_token+'&type="br"'+'&date='+realStartDateString, function (error, response, body) {
    if(error){
      console.log("This is the error "+error);
      console.log(body);
    }
    //console.log(response.statusCode);
  if (!error && response.statusCode == 200) {
    //console.log(body) // Show the HTML for the Google homepage.
    console.log(body);
    var r=JSON.parse(body);
    console.log("This is the body of breathing "+JSON.stringify(r));
    if(r["data"] != undefined){
    for(i=0; i<r["data"].length; i++){
        var date = new Date(0);
        var hours= Math.floor(new Date(r["data"][i]["timestamp"]*1000).getHours());
        var minutes= Math.floor(new Date(r["data"][i]["timestamp"]*1000).getMinutes());
        var seconds= Math.floor(new Date(r["data"][i]["timestamp"]*1000).getSeconds());
        writespirebreathingstream.write("\n"+email);
        writespirebreathingstream.write(","+id);
        writespirebreathingstream.write(","+access_token);
        writespirebreathingstream.write(","+hours+":"+""+minutes+":"+""+seconds);
        writespirebreathingstream.write(","+r["data"][i]["value"]+",");
        writespirebreathingstream.write(""+realStartDateString);
      }
    }
  }
  })
}
*/


  function processSpireStreaks(realStartDateString){
  request('https://app.spire.io/api/v2/streaks?access_token='+access_token+'&date='+realStartDateString, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(JSON.parse(body));
    var r=JSON.parse(body);
        if(r.length != undefined){
        for (var i=0; i<r.length; i++){
        writespirestreakstream.write("\n"+email);
        writespirestreakstream.write(","+id);
        writespirestreakstream.write(","+access_token);
        writespirestreakstream.write(","+r[i]["type"]);
        writespirestreakstream.write(","+r[i]["value"]);
        writespirestreakstream.write(","+r[i]["original_type"]);
        writespirestreakstream.write(","+new Date(r[i]["start_at"]*1000).getHours() +":"+new Date(r[i]["start_at"]*1000).getMinutes()+":"+ new Date(r[i]["start_at"]*1000).getSeconds());
        writespirestreakstream.write(","+new Date(r[i]["stop_at"]*1000).getHours() +":"+new Date(r[i]["stop_at"]*1000).getMinutes()+":"+ new Date(r[i]["stop_at"]*1000).getSeconds());
        writespirestreakstream.write(","+realStartDateString);

        }
      }
    }
  })
}
