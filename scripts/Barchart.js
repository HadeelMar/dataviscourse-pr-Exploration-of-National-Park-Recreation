/**
 * Created by Mila on 11/8/15.
 */



function bARVis(_parentElement, parentObject) {


    var self = this;
    self.parentElement = _parentElement;
    console.log(self.parentElement);
    self.parent = parentObject;

    self.initVis();
}


// now we init the variables, scales, etc.

bARVis.prototype.initVis = function () {


    var self = this; // read about the this



    self.yearselected = document.getElementById("slider").value;

    self.svg = self.parentElement.select("svg");



    self.xScale = d3.scale.ordinal().rangeBands([0, self.graphW], 0.1).domain(d3.range(0, maxVisitors));
    // xScale and xAxis stays constant

    self.yScale = d3.scale.linear().range([self.graphH, 0]);


    self.xAxis = d3.svg.axis().scale(self.xScale);
    // xScale and xAxis stays constant

    self.yAxis = d3.svg.axis().scale(self.yScale).orient("left");

    // visual elements
    self.visG = self.svg.append("g").attr({
        "transform": "translate(" + 60 + "," + 10 + ")"
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

    self.visG.append("g").attr("class", "yAxis axis");




    // call the update method
   // self.updateVis();
};

