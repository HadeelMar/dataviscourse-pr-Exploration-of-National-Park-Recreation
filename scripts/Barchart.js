/**
 * Created by Mila on 11/8/15.
 */
var years;


function barVis(_parentElement, allData, _eventHandler,mapSelectionChanged,reset) {


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
    self.graphH= 1000;
    self.graphW= 500;

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
        "transform": "translate(" + 300 + "," + 30 + ")"
    });

    // xScale and xAxis stays constant:
    // copied from http://bl.ocks.org/mbostock/4403522
    self.visG.append("g")
        .attr("class", "yAxis axis")
        .attr("transform", "translate(0," +80  + ")")
        .call(self.yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("x", -15) // magic number
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("parks")
        .selectAll("text")
        .attr("y", 10) // magic number
        .attr("x", -15) // magic number
        .attr("transform", "rotate(45)")
        .style("text-anchor", "end")
        .text(function (d,i) {
            return self.parksnames[i];
        });

    self.visG.append("g")
        .attr("class", "xAxis axis")
        .call(self.xAxis)
        .attr("transform", "translate(0," +25  + ")")
        .selectAll("text")
        //.attr("transform", "rotate(-45)")
        .style("text-anchor", "start")

    self.visG.append("g")
        .attr("class", "barBox")
        .attr("transform", "translate(0," +25  + ")");

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

    if(MonthMode == 0)
        self.m=10000000;
    else
        self.m=d3.max(self.displayData, function (d, i) {
            var vex = 0;
            try{
                vex = parseInt(self.displayData[i]["MonthlyData"][SelectedYear][SelectedMonth]);
            }catch (err)
            {
                console.log("error with park " + self.displayData[i]["ParkName"])
                //return 0;
            }
                if(isNaN(vex))
                    return 0;
                else
                    return vex;
            });


    var minMaxY = [0, self.m];
    console.log(minMaxY);


    self.parksnames = self.displayData.map(function(d) { return NameSelectionByCode[d.ParkName]; });

    //having the maximum value for monthly view


    //having the minimum value for monthly view
  //  self.minmonthlyvalue= d3.min(self.displayData, function (d, i) {

   //     return parseInt(self.displayData[i]["MonthlyData"][SelectedYear][SelectedMonth]);});


    /*
    //having the maximum value for yearly view
    self.maxyearlyvalue= d3.max(self.displayData, function (d, i) {
        return parseInt(self.displayData[i]["YearlyData"][SelectedYear]);});

    //having the minimumvalue for yearly view
    self.minyearlyvalue= d3.min(self.displayData, function (d, i) {
        return parseInt(self.displayData[i]["YearlyData"][SelectedYear]);});
        */



    if(MonthMode == 0)
        colorScale = d3.scale.linear().domain(minMaxY).range(["#DF7E7B","#C01D17"]);
    else
        colorScale = d3.scale.linear().domain(minMaxY).range(["#DF7E7B","#C01D17"]);


    self.yScale = d3.scale.ordinal().rangeRoundBands([0, self.graphH], 0.1).domain(self.parksnames);
    self.yAxis = d3.svg.axis().scale(self.yScale).ticks(1);
    self.yAxis.orient("left");

    self.xScale.domain(minMaxY);
    self.xAxis.scale(self.xScale).ticks(20)
        .tickFormat(d3.format("s"));

    // draw the scales :
    self.visG.select(".xAxis")
        .call(self.xAxis)
        .selectAll("text")
        .attr("x", 10)
        .attr("y", 0)
        .attr("transform", "rotate(-65)" )
        .style("text-anchor", "start")

    ///Remove the x axis cause its being unfriendly to the vis
    self.visG.select(".yAxis").remove();

    //Draw it again
    self.visG.append("g")
        .attr("class", "yAxis axis")
        .attr("transform", "translate(0," + 30 + ")")
        .call(self.yAxis)
        .selectAll("text")
        .attr("y", -5) // magic number
        .attr("x", -15) // magic number
        //.attr("transform", "rotate(45)")
        .style("text-anchor", "end")
        .text(function (d,i) {
            return self.parksnames[i];
        });


    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d)
        {
            if(MonthMode == 0)
            return "<strong>Park name</strong> <span style='color:red'>" + NameSelectionByCode[d.ParkName]
                + "</span>"+"<br>" + "<strong>" + SelectedYear + " Annual Visits:</strong> <span style='color:red'>" + d["YearlyData"][SelectedYear]+ "</span>";

            else
            {
                return "<strong>Park name</strong> <span style='color:red'>" + NameSelectionByCode[d.ParkName]
                    + "</span>"+"<br>" + "<strong>" + SelectedYear + " " + MonthsByNumber[SelectedMonth] + "  Visits:</strong> <span style='color:red'>" + d["MonthlyData"][SelectedYear][SelectedMonth]+ "</span>";
            }

        });

    // draw the bars :
    //self.visG.selectAll(".bar").remove();
    //var bars = self.visG.selectAll(".bar").data(self.displayData);
    var bars = self.visG.select(".barBox").selectAll(".bar").data(self.displayData);

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
            var width = 0;

            if (MonthMode == 0)
                width = parseInt(self.displayData[i]["YearlyData"][SelectedYear]);
            else {
                try {
                    width = parseInt(self.displayData[i]["MonthlyData"][SelectedYear][SelectedMonth]);
                } catch (err) {
                    console.log("error with park " + self.displayData[i]["ParkName"])
                    //return 0;
                }
            }

            if(!isNaN((width)))
                return self.xScale(width);
            else
                return self.xScale(0);
        },
        "x": function () {
            /*//x = self.xScale(self.displayData[i]["YearlyData"][SelectedYear]);
            x = self.xScale(0);
            if(!isNaN((x)))
                return x;
            else*/
                return 0;
        }

    });


    bars.style("fill", function (d,i){
        if(MonthMode == 0)

            return colorScale(self.displayData[i]["YearlyData"][SelectedYear]);

        else
        {
            var value = 0;

            if (MonthMode == 0)
                value = parseInt(self.displayData[i]["YearlyData"][SelectedYear]);
            else {
                try {
                    value = parseInt(self.displayData[i]["MonthlyData"][SelectedYear][SelectedMonth]);
                } catch (err) {
                    console.log("error with park " + self.displayData[i]["ParkName"])
                    //return 0;
                }
            }
            if(!isNaN((value)))
                return colorScale(value);
            else
                return colorScale(0);
        }
    });

    bars.on('mouseover', tip.show);
    bars.on('mouseout', tip.hide);
    //bars.style("fill", "grey");
    self.setup();


   /* // now add titles to the axes
    vis.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Value");

    vis.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
        .text("Date");*/








};


barVis.prototype.setup = function () {

    var self = this;

    d3.select('#slider').on('change', function () {
        self.initVis(this.value);
        self.updateVis();

        //console.log("this.value");

    });

}