/**
 * Created by Mila on 11/8/15.
 */
var years;


function barVis(_parentElement, allData, _eventHandler) {


    var self = this;
    self.parentElement = _parentElement;
    self.displayData = allData;
    self.filterData();
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


    self.svg = d3.select(self.parentElement).select("svg");

    self.parksnames = self.displayData.map(function(d) { return d.ParkName; });

    //self.yScale = d3.scale.ordinal().rangeRoundBands([0, self.graphH], 0.1).domain(self.parksnames);


    self.xScale = d3.scale.linear().range([ 0,self.graphW]);

    self.yScale = d3.scale.ordinal().rangeBands([0, self.graphH], 0.1).domain(self.parksnames);

    // self.yScale = d3.scale.linear().range([self.graphH, 0]);

    //self.xAxis = d3.svg.axis().scale(self.xScale);

    self.xAxis = d3.svg.axis().scale(self.xScale).orient("top").ticks(20)
        .tickFormat(d3.format("s"));

    //self.yAxis = d3.svg.axis().scale(self.yScale).orient("left");
    self.yAxis = d3.svg.axis().scale(self.yScale).orient("left").ticks(1);


    // visual elements
    self.visG = self.svg.append("g").attr({
        "transform": "translate(" + 180 + "," + 10 + ")"
    });

    // xScale and xAxis stays constant:
    // copied from http://bl.ocks.org/mbostock/4403522
    self.visG.append("g")
        .attr("class", "yAxis axis")
        .attr("transform", "translate(0," +100  + ")")
        .call(self.yAxis)
        .selectAll("text")
        .attr("y", 10) // magic number
        .attr("x", 10) // magic number
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start")
        .text(function (d,i) {
            return self.parksnames[i];
        });
    self.visG.append("g").attr("class", "xAxis axis").call(self.xAxis)
        .attr("transform", "translate(0," +50  + ")").selectAll("text").
        attr("transform", "rotate(-45)").style("text-anchor", "start")


    self.updateVis();
    //self.setup();
};

barVis.prototype.filterData = function () {

    var self = this;

    var newDisplayData = [];
    var selectedParkCodes = [];
    for(i = 0; i < SelectedParks.length; i++)
    {
        selectedParkCodes.push(ParkSelectionByName[SelectedParks[i]])
    }
    //console.log(SelectedParks)
    //console.log(selectedParkCodes);


    for(i = 0; i < allData.length; i ++)
    {
        var pname = allData[i]["ParkName"];
        //console.log(pname)
        for(j = 0; j < selectedParkCodes.length; j++)
        {
            if(pname.valueOf() == selectedParkCodes[j].valueOf())
                newDisplayData.push(allData[i]);
        }
    }

    //console.log(allData)
    //console.log(newDisplayData);

    self.displayData = newDisplayData;

}

barVis.prototype.updateVis = function () {


    var self = this;

    ////////////////////////////////////////////////////////////
    ////////Analyze data to make sure it includes the selected month and or year
    ////////////////////////////////////////////////////////////

    self.filterData();

    var deleteBars = d3.selectAll(".bar").remove();
    var deleteTips = d3.selectAll(".d3-tip").remove();

    var minMaxY = [0, d3.max(self.displayData, function (d, i) {
        return parseInt(self.displayData[i]["YearlyData"][SelectedYear]);
    })];

    self.parksnames = self.displayData.map(function(d) { return NameSelectionByCode[d.ParkName]; });


    self.yScale = d3.scale.ordinal().rangeRoundBands([0, self.graphW], 0.1).domain(self.parksnames);
    self.yAxis = d3.svg.axis().scale(self.yScale).ticks(1);

    self.xScale.domain(minMaxY);
    self.xAxis.scale(self.xScale).ticks(20)
        .tickFormat(d3.format("s"));

    // draw the scales :
    self.visG.select(".xAxis").call(self.xAxis);

    ///Remove the x axis cause its being unfriendly to the vis
    self.visG.select(".yAxis").remove();

    //Draw it again
    self.visG.append("g")
        .attr("class", "yAxis axis")
        .attr("transform", "translate(0," + self.graphH + ")")
        .call(self.yAxis)
        .selectAll("text")
        .attr("y", 3) // magic number
        .attr("x", 10) // magic number
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start")
        .text(function (d,i) {
            return self.parksnames[i];
        });

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Park name</strong> <span style='color:red'>" + d.ParkName
                + "</span>";
        });

    // draw the bars :
    //self.visG.selectAll(".bar").remove();
    var bars = self.visG.selectAll(".bar").data(self.displayData);
    bars.exit().remove();

    bars.enter().append("rect")
        .attr({
            "class": "bar",
            "height": self.yScale.rangeBand(),
            "y": function (d, i) {
                return self.yScale(self.parksnames[i])

            }
        });
    bars.call(tip);
    bars.attr({
        "width": function (d,i) {
            //return self.graphH -self.yScale(self.years[i][self.yearselected]);
            width = self.xScale(self.displayData[i]["YearlyData"][SelectedYear]);
            if(!isNaN((width)))
                return width;
            else
                return 0;
        },
        "x": function (d,i) {
            x = self.xScale(self.displayData[i]["YearlyData"][SelectedYear]);
            if(!isNaN((x)))
                return x;
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