// Generated by CoffeeScript 1.10.0
(function() {
  var MyD3, obj;

  MyD3 = (function() {
    function MyD3() {}

    MyD3.prototype.size = {
      width: 500,
      height: 400
    };

    MyD3.prototype.lots = 10;

    MyD3.prototype.radius = 180;

    MyD3.prototype.innerRadius = 50;

    MyD3.prototype.getGraphWidth = function() {
      return this.size.width / this.lots;
    };

    MyD3.prototype.getRandomColor = function(value) {
      var b, g, r, temp;
      temp = Math.round((value / this.size.height) * 255);
      r = (temp - 255) * -1;
      g = temp;
      b = 50;
      return "rgb(" + r + "," + g + "," + b + ")";
    };

    MyD3.prototype.generateData = function() {
      var i, j, list, maxValue, ref;
      maxValue = this.size.height;
      list = [];
      for (i = j = 1, ref = this.lots; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
        list.push(Math.round(Math.random() * maxValue));
      }
      return list;
    };

    MyD3.prototype.bowGraph = function() {
      var data, svg;
      data = this.generateData();
      svg = d3.select("#bowGraph").append("svg");
      svg.attr({
        width: this.size.width,
        height: this.size.height
      });
      svg.selectAll("rect").data(data).enter().append('rect').attr({
        x: (function(_this) {
          return function(d, i) {
            return i * _this.getGraphWidth();
          };
        })(this),
        y: (function(_this) {
          return function(d) {
            return _this.size.height - d;
          };
        })(this),
        width: (function(_this) {
          return function(d) {
            return _this.getGraphWidth();
          };
        })(this),
        height: function(d) {
          return d;
        },
        fill: (function(_this) {
          return function(d) {
            return _this.getRandomColor(d);
          };
        })(this),
        stroke: "rgb(0,0,0)"
      });
      svg.selectAll("text").data(data).enter().append("text").attr({
        x: (function(_this) {
          return function(d, i) {
            return (i * _this.getGraphWidth()) + (_this.getGraphWidth() / 2);
          };
        })(this),
        y: (function(_this) {
          return function(d, i) {
            return _this.size.height - d + 20;
          };
        })(this)
      }).text(function(d) {
        return d;
      });
    };

    MyD3.prototype.circleGraph = function() {
      var arc, data, g, pie, svg;
      data = this.generateData();
      svg = d3.select("#circleGraph").append("svg").attr({
        width: this.size.width,
        height: this.size.height
      }).append("g").attr("transform", "translate(" + this.size.width / 2 + "," + this.size.height / 2 + ")");
      arc = d3.svg.arc().outerRadius(this.radius).innerRadius(this.innerRadius);
      pie = d3.layout.pie().sort(null).value(function(d) {
        return d;
      });
      g = svg.selectAll(".fan").data(pie(data)).enter().append("g").attr("class", "fan");
      g.append("path").attr({
        d: arc,
        fill: (function(_this) {
          return function(d, i) {
            return _this.getRandomColor(d.value);
          };
        })(this),
        stroke: "black",
        "stroke-width": "2"
      });
      return g.append("text").attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      }).style("text-anchor", "middle").text(function(d) {
        return d.value;
      });
    };

    MyD3.prototype.test = function() {
      return console.log(this.generateData());
    };

    return MyD3;

  })();

  obj = new MyD3();

  obj.bowGraph();

  obj.circleGraph();

}).call(this);
