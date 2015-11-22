/**
 * Created by Mila on 11/8/15.
 */
var years;


function barVis(_parentElement, allData) {


    var self = this;
    self.parentElement = _parentElement;
    //console.log(self.parentElement);
    //self.parent = parentObject;

    self.initVis();

}

// now we init the variables, scales, etc.

barVis.prototype.initVis = function () {


    var self = this; // read about the this
    self.graphH= 250;
    self.graphW= 300;

    //console.log(allData);
    self.parksnames = allData.map(function(d) { return d.ParkName; });

    self.svg = d3.select(self.parentElement).select("svg");

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

barVis.prototype.updateVis = function () {


    var self = this;

    ////////////////////////////////////////////////////////////
    ////////Analyze data to make sure it includes the selected month and or year
    ////////////////////////////////////////////////////////////


    var minMaxY = [0, d3.max(allData, function (d, i) {
        return parseInt(allData[i]["YearlyData"][SelectedYear]);
    })];

    self.yScale.domain(minMaxY);
    self.yAxis.scale(self.yScale);

    // draw the scales :
    self.visG.select(".yAxis").call(self.yAxis);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Park name</strong> <span style='color:red'>" + d.ParkName
                + "</span>";
        });

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
    bars.call(tip);
    bars.attr({
        "height": function (d,i) {
            //return self.graphH -self.yScale(self.years[i][self.yearselected]);
            height = self.graphH - self.yScale(allData[i]["YearlyData"][SelectedYear]);
            if(!isNaN((height)))
                return height;
            else
                return 0;
        },
        "y": function (d,i) {
            y = self.yScale(allData[i]["YearlyData"][SelectedYear]);
            if(!isNaN((y)))
                return y;
            else
                return 0;
        }

    });
    bars.on('mouseover', tip.show);
    bars.on('mouseout', tip.hide);
    //bars.style("fill", "grey");
    self.setup();
};

barVis.prototype.setup = function () {

    var self = this;

    d3.select('#slider').on('change', function () {
        self.initVis(this.value);
        self.updateVis();

        //console.log("this.value");

    });

}