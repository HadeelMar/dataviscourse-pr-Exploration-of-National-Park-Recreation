/**
 * Created by Mila on 11/8/15.
 * edited by Tony Niveen 11/13/15 : Fixed domain calculation to rely on int parse of the numbers not string values, more info on commit
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


    var self = this;

    self.svg = d3.selectAll(self.parentElement).select("svg");

    self.graphH= 250;
    self.graphW= 300;

    //console.log(allData);
    self.parksnames = allData.map(function(d) { return d.ParkName; });
    years = allData.map(function(d) { return d.YearlyData; });

    // console.log(self.parksnames);
    //console.log(self.years);


    self.yearselected = document.getElementById("slider").value;

    //console.log(years[0][self.yearselected]);


    //console.log(self.yearselected);

    self.svg = d3.select(self.parentElement).select("svg");
    //console.log(self.svg);



    //console.log(self.svg);

    self.xScale = d3.scale.ordinal()
        .rangeBands([0, self.graphW], 0.1)
        .domain(self.parksnames);


    self.xScale = d3.scale.ordinal().rangeBands([0, self.graphW], 0.1).domain(self.parksnames);

    self.yScale = d3.scale.linear()
        .range([self.graphH, 0]);



    self.xAxis = d3.svg.axis()
        .scale(self.xScale);
    // xScale and xAxis stays constant

    self.yAxis = d3.svg.axis()
        .scale(self.yScale)
        .orient("left");

    // visual elements
    self.visG = self.svg.append("g").attr({
        "transform": "translate(" + 100 + "," + 10 + ")"
    });

    self.visG.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0," + self.graphH + ") scale(" + 1 +","+ -1 +")")

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
    self.visG.append("g").attr("class", "yAxis axis");


    self.updateVis();
   // self.setup();
};

bARVis.prototype.updateVis = function () {


    var self = this;

    var minMaxY = [0, d3.max(allData, function (d, i) {
        return parseInt(years[i][self.yearselected]);
    })];


    self.yScale.domain(minMaxY);
    self.yAxis.scale(self.yScale);

    // draw the scales :
    self.visG.select(".yAxis").call(self.yAxis);

    // draw the bars :
    var bars = self.visG.select(".barGroup").selectAll(".bar").data(allData);
    bars.exit().remove();
    bars.enter().append("rect")
        .attr({
            "class": "bar",
            "width": self.xScale.rangeBand(),
            "x": function (d, i) {
                return self.xScale(self.parksnames[i]);
            }

        });

    //console.log(years);

    bars.attr({
        "height": function (d,i) {


            //return self.graphH -self.yScale(self.years[i][self.yearselected]);
            //console.log(self.yScale(years[i][self.yearselected]))
            return self.graphH - self.yScale(years[i][self.yearselected]);

                //return self.graphH -self.yScale(self.years[i][self.yearselected]);
            //console.log(self.yScale(years[i][self.yearselected]))
           return self.graphH - self.yScale(years[i][self.yearselected]);

        },
        "y": function (d,i) {
            return self.graphH-self.yScale(i);
        }

    });
  bars.text(function(d,i) {

        //return self.graphH -self.yScale(self.years[i][self.yearselected]);
        //console.log(self.yScale(years[i][self.yearselected]))
     return years[i][self.yearselected];


   })
    .attr("fill", "white")
    .attr("font-size", "11px")
    bars.style("fill", "grey");

    self.setup();
};

bARVis.prototype.setup = function () {

    var self = this;

    d3.select('#slider').on('change', function () {
        self.initVis(this.value);

        console.log("this.value");

    });

}