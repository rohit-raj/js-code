(function(){
  "use strict";
  const axios   = require("axios");
  const moment  = require("moment");
  const async   = require("async");
  class Temperature{
    constructor(city){
      this.avgTemp = {};
      this.city = city;
      this.woeid = 0;
    }
  };

  Temperature.prototype.getWoeid = function(callback){
    let that = this;
    axios.get("https://www.metaweather.com/api/location/search/?query="+that.city)
    .then(response => {
      that.woeid = response.data[0].woeid;
      callback(null, response);
    }).catch(error => {
      console.log(error);
      callback(error);
    });
  };

  Temperature.prototype.getTemp = function(date, callback){
    let that = this;
    axios.get("https://www.metaweather.com/api/location/" + that.woeid + "/" + date)
    .then(response => {
      let avgTemp = 0;
      let totalTemp = 0;
      let data = response.data;
      let len = data.length;
      for(let i = 0;i < len; i++){
        totalTemp += (data[i].min_temp + data[i].max_temp)/2;
      }
      avgTemp = totalTemp/len;
      that.avgTemp[date] = {"avg" : avgTemp};
      callback();
    }).catch(error => {
      console.log(error);
      callback(error);
    });
  };

  var cityObjects = [];

  cityObjects.push(new Temperature("bangalore"));
  cityObjects.push(new Temperature("mumbai"));
  cityObjects.push(new Temperature("delhi"));

  let dates = [];
  dates.push(moment(new Date("2018/6/01")).format("YYYY/MM/DD"));
  dates.push(moment(new Date("2018/6/01")).add(1, "days").format("YYYY/MM/DD"));
  dates.push(moment(new Date("2018/6/01")).add(2, "days").format("YYYY/MM/DD"));

  for(let i in cityObjects){
    cityObjects[i].getWoeid(function(err, resp){
      let tasks = [];
      for(let j in dates){
        tasks.push(cityObjects[i].getTemp.bind(cityObjects[i], dates[j]));
      }

      async.waterfall(tasks, function(error, resp){
        if(error){
          console.log("error");
        } else {
          console.log(cityObjects[i].city + " avg temp ==> ", cityObjects[i]);
        }
      });
    });
  }
})();