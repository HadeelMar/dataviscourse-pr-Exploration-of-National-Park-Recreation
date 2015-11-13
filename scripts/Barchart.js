/**
 * Created by Mila on 11/8/15.
 */
var years;


function bARVis(_parentElement, allData) {


    var self = this;
    self.parentElement = _parentElement;
    //console.log(self.parentElement);
    //self.parent = parentObject;

    self.initVis();

}


// now we init the variables, scales, etc.

bARVis.prototype.initVis = function () {


    var self = this; // read about the this
    self.graphH= 250;
    self.graphW= 300;

    //console.log(allData);
    self.parksnames = allData.map(function(d) { return d.ParkName; });
    years = allData.map(function(d) { return d.YearlyData; });

    // console.log(self.parksnames);
    console.log(years);


    self.yearselected = document.getElementById("slider").value;

    console.log(years[0][self.yearselected]);


    console.log(self.yearselected);
    self.svg = d3.select(self.parentElement).select("svg");
    //console.log(self.svg);




    //self.xScale = d3.scale.ordinal().rangeBands([0, self.graphW], 0.1).domain(d3.range(0, self.maxVisitors));
    // xScale and xAxis stays constant

    self.xScale = d3.scale.ordinal().rangeRoundBands([0, self.graphW], 0.1).domain(self.parksnames);

    self.yScale = d3.scale.linear().range([self.graphH, 0]);


    self.xAxis = d3.svg.axis().scale(self.xScale);
    // xScale and xAxis stays constant

    self.yAxis = d3.svg.axis().scale(self.yScale).orient("left");

    // visual elements
    self.visG = self.svg.append("g").attr({
        "transform": "translate(" + 100 + "," + 10 + ")"
    });

    // xScale and xAxis stays constant:
    // copied from http://bl.ocks.org/mbostock/4403522
    self.visG.append("g")
        .attr("class", "xAxis axis")
        .attr("transform", "translate(0," + self.graphH + ")")
        .call(self.xAxis)
        .selectAll("text")
        .attr("y", 3) // magic number
        .attr("x", 10) // magic number
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start")
        .text(function (d,i) {
            return self.parksnames[i];
        });
    self.visG.append("g").attr("class", "yAxis axis").call(self.yAxis)


    self.updateVis();
    //self.setup();
};

bARVis.prototype.updateVis = function () {


    var self = this;

    // update the scales :
     var minMaxY = [0, d3.max(allData, function (d, i) {
         return parseInt(years[i][self.yearselected]);
     })];



    self.yScale.domain(minMaxY);
    self.yAxis.scale(self.yScale);

    // draw the scales :
    self.visG.select(".yAxis").call(self.yAxis);

    // draw the bars :
    var bars = self.visG.selectAll(".bar").data(allData);
    bars.exit().remove();
    bars.enter().append("rect")
        .attr({
            "class": "bar",
            "width": self.xScale.rangeBand(),
            "x": function (d, i) {
                return self.xScale(self.parksnames[i])

            }
        });

    bars.attr({
        "height": function (d,i) {
            //return self.graphH -self.yScale(self.years[i][self.yearselected]);
            return self.graphH - self.yScale(years[i][self.yearselected]);
        },
        "y": function (d,i) {
            return self.yScale(years[i][self.yearselected]);
        }

    });
    bars.style("fill", "grey");
    self.setup();
};

bARVis.prototype.setup = function () {

    var self = this;

    d3.select('#slider').on('change', function () {
        self.initVis(this.value);
        self.updateVis();

        //console.log("this.value");

    });

}