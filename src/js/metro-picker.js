/* global $:true */
/* jshint unused:false*/

+ function($) {
  "use strict";
  var defaults;
  
  $.fn.metroPicker = function(params) {
    params = $.extend({}, defaults, params);
    return this.each(function() {

      var format = function(data) {
        var result = [];
        for(var i=0;i<data.length;i++) {
          var d = data[i];
          if(d.name === "请选择") continue;
          result.push(d.name);
        }
        if(result.length) return result;
        return [""];
      };

      var sub = function(data) {
        if(!data.sub) return [""];
        return format(data.sub);
      };

      var getNames = function(obj){
        var names = [];
        for (var i = obj.length - 1; i >= 0; i--) {
          names.push(obj[i].name);
        }
        return names;
      }

      var getStations = function(d) {
        for(var i=0;i< raw.length;i++) {
          if(raw[i].name === d) return getNames(raw[i].child);
        }
        return [""];
      };

      var raw = params.lineData;
      if(!raw){//需要提供参数
        raw=[[]];
        console.error('Require lineData !!!');
      }
      var lines = raw.map(function(d) {
        return d.name;
      });
      var initStations = sub(raw[0]);

      var currentLine = lines[0];
      var currentStation = initStations[0];

      var cols = [
      {
        textAlign:'center',
        values: lines,
      },
      {
        textAlign:'center',
        values: initStations,
      }
      ];

      var config = {

        rotateEffect: false,  //为了性能

        onChange: function (picker, values, displayValues) {
          var newLine = picker.cols[0].value;
          var newStation;
          if(newLine !== currentLine) {
            var newStations = getStations(newLine);
            newStation = newStations[0];
            picker.cols[1].replaceValues(newStations);
            currentLine = newLine;
            currentStation = newStation;
            values.shift();
            return;
          }
          values.shift();
        },

        cols: cols
      };

      if(!this) return;
      var p = $.extend(config, params);
      //计算value
      var val = $(this).val();
      if(val) {
        p.value = val.split(" ");
        if(p.value[0]) {
          currentLine = p.value[0];
          p.cols[1].values = getStations(p.value[0]);
        }

        if(p.value[1]) {
          currentStation = p.value[1];
        } 
      }
      $(this).picker(p);
    });
  };

  defaults = $.fn.metroPicker.prototype.defaults = {
  };

}($);
