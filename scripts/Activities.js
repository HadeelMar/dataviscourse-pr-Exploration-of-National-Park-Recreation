//Bubblechart.js
//Created by Tony Niven: 11/22/15

function ActivitiesVis(_parentPane,_defaultData,_eventHandler)
{
    var self = this;

    self.parentPane = _parentPane;
    self.currentData = _defaultData;
    self.displayData = _defaultData;
    self.changEvent = _eventHandler;

    self.initVis();
}

ActivitiesVis.prototype.initVis = function ()
{
    var self = this;

    self.topMargin = 40;
    self.translate = 250;
    self.yTrans = -20;

    self.graphW = d3.select(self.parentPane).attr("width");
    self.graphH = d3.select(self.parentPane).attr("height") - self.topMargin;

    self.svg = d3.select(self.parentPane);

    self.xScale = d3.scale.linear()
        .range([ 0,self.graphW - self.translate]);
    self.xAxis = d3.svg.axis()
        .scale(self.xScale)
        .orient("top")
        .ticks(20)
        .tickFormat("")

    self.parksnames = self.displayData.map(function(d) { return NameSelectionByCode[d.ParkName]; });

    self.yScale = d3.scale.ordinal()
        .rangeBands([0, self.graphH], 0.1)
        .domain(self.parksnames);

    self.yAxis = d3.svg.axis()
        .scale(self.yScale)
        .orient("left")
        .ticks(1)

    // visual elements
    self.visG = self.svg.append("g").attr({
        "transform": "translate(" + 250 + "," + self.topMargin + ")"
    });

    // xScale and xAxis stays constant:
    // copied from http://bl.ocks.org/mbostock/4403522
    self.visG.append("g")
        .attr("class", "yAxis axis")
        .attr("transform", "translate(0," +  self.yTrans + ")")
        .call(self.yAxis)
        .selectAll("text")
        .style("fontSize","3px")
        .attr("y", 0) // magic number
        .attr("x", -15) // magic number
        .style("text-anchor", "end")
        .text(function (d,i) {
            return self.parksnames[i];
        });

    self.visG.append("g")
        .attr("class", "xAxis axis")
        .call(self.xAxis)
        .attr("transform", "translate(0," +self.yTrans + ")")
        //.attr("transform", "rotate(-45)")

    self.visG.append("g")
        .attr("class", "barBox")
        .attr("transform", "translate(0," +( self.yTrans - 5) + ")");

    self.updateVis();
};

ActivitiesVis.prototype.filterData = function () {

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


    if(SelectedActitiy != "")
    {
        console.log("the selected activity is " + FriendlyActivitiyNames[SelectedActitiy])
    }

    self.displayData = newDisplayData;

}


//Example version of this code is from: http://bl.ocks.org/mbostock/4063269
ActivitiesVis.prototype.drawVis = function(dataDraw)
{
    var self = this;

    var self = this;

    self.filterData();

    var deleteBars = d3.selectAll(".compareBar").remove();
    var deleteTips = d3.selectAll(".d3-tip3").remove();

    self.m=d3.max(self.displayData, function (d, i) {
        var vex = 0;
        try{
            vex = parseInt(self.displayData[i]["MonthlyData"][SelectedYear][SelectedMonth]);
        }catch (err) {}

        if(isNaN(vex))
            return 0;
        else
            return vex;
    });


    var minMaxY = [0, self.m];

    self.parksnames = self.displayData.map(function(d) { return NameSelectionByCode[d.ParkName]; });

    self.colorScale = d3.scale.linear().domain(minMaxY).range(["#DF7E7B","#C01D17"]);

    self.yScale = d3.scale.ordinal().rangeRoundBands([0, self.graphH], 0.1).domain(self.parksnames);
    self.yAxis = d3.svg.axis().scale(self.yScale).ticks(1);
    self.yAxis.orient("left");

    self.xScale
        .domain(minMaxY);
    self.xAxis
        .scale(self.xScale)
        .ticks(20)
        .tickFormat("")

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
        .attr("transform", "translate(0," + self.yTrans + ")")
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
        .attr('class', 'd3-tip3')
        .offset([-10, 0])
        .html(function(d)
        {
            if(SelectedActitiy !=  "")
            {
                return "<strong>Park name</strong> <span style='color:red'>" + NameSelectionByCode[d.ParkName]
                    + "</span>"+"<br>" + "<strong>" + SelectedYear + " " + MonthsByNumber[SelectedMonth] + " " + SelectedActitiy + "  Visits:</strong> <span style='color:red'>" + d["MonthlyData"][SelectedYear][SelectedMonth]+ "</span>";
            }
            else
            {
                return "<strong>Park name</strong> <span style='color:red'>" + NameSelectionByCode[d.ParkName]
                    + "</span>"+"<br>" + "<strong>" + SelectedYear + " " + MonthsByNumber[SelectedMonth] + "  Visits:</strong> <span style='color:red'>" + d["MonthlyData"][SelectedYear][SelectedMonth]+ "</span>";
            }

        });

    var bars = self.visG.select(".barBox").selectAll(".bar").data(self.displayData);

    bars.exit().remove();

    bars.enter().append("rect")
        .attr({
            "class": "compareBar",
            "height": self.yScale.rangeBand(),
            "y": function (d, i) {
                return self.yScale(self.parksnames[i])

            }
        });
    bars.call(tip);
    bars.attr({
        "width": function (d,i) {
            var width = 0;

            try {
                width = parseInt(self.displayData[i]["MonthlyData"][SelectedYear][SelectedMonth]);
            } catch (err) {}

            if(!isNaN((width)))
                return self.xScale(width);
            else
                return self.xScale(0);
        },
        "x": function () {
            return 0;
        }

    });


    bars.style("fill", function (d,i){
        var value = 0;

        if (MonthMode == 0)
            value = parseInt(self.displayData[i]["YearlyData"][SelectedYear]);
        else {
            try {
                value = parseInt(self.displayData[i]["MonthlyData"][SelectedYear][SelectedMonth]);
            } catch (err) {}
        }
        if(!isNaN((value)))
            return colorScale(value);
        else
            return colorScale(0);
    });

    bars.on('mouseover', tip.show);
    bars.on('mouseout', tip.hide);

}

//Incoming data is the data you want to show in the vis
ActivitiesVis.prototype.updateVis = function()
{
    var self = this;
    self.drawVis(self.displayData);
}


/**
 * Created by Tony on 11/22/2015.
 */
