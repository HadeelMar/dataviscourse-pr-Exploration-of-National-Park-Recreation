//Bubblechart.js
//Created by Tony Niven: 11/22/15

function ActivitiesVis(_parentPane,_defaultData,_eventHandler)
{
    var self = this;

    self.parentPane = _parentPane;
    self.currentData = _defaultData;
    self.displayData = _defaultData;
    self.eventHandler = _eventHandler;

    self.updateVis();
}

ActivitiesVis.prototype.initVis = function ()
{


    var self = this;

    var deleteTips = d3.select(self.parentPane).selectAll(".axis").remove();
    var deleteTips = d3.select(self.parentPane).selectAll(".barBox").remove();
    var deleteTops = d3.select(self.parentPane).select(".noChartText").remove();


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

    self.drawVis();
};

ActivitiesVis.prototype.filterData = function () {

    var self = this;

    /////////////////////////////////////////////////////////////////
    ///Step 1 - filter out the parks we dont want to look at
    /////////////////////////////////////////////////////////////////

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


    var step1DisplayData = newDisplayData;
    //console.log(step1DisplayData);
    /////////////////////////////////////////////////////////////////////
    ///Step 2 - Aggregate for the parks we want to look at
    /////////////////////////////////////////////////////////////////////

    var sampleData;
    var parkActivityData = [];
    var step2DisplayData = [];
    var sampleHeader = null;

    //console.log(step1DisplayData)
    for(p = 0; p < step1DisplayData.length; p++)
    {
        parkActivityData = [];

        if(MonthMode == 0)
        {
            sampleData = step1DisplayData[p]["ActivityData"][SelectedYear];

            if(sampleHeader == null)
                sampleHeader = step1DisplayData[p]["ActivityDataHeader"];

            var activityCounts =[0,0,0,0,0,0,0,0,0];

            for( j = 1; j < 13; j++ )
            {
                //console.log(MonthsByNumber[j])
                for( i = 0 ; i < sampleHeader.length; i++)
                {
                    if (sampleHeader[i] != "RecreationVisitors") {
                        activityCounts[i] += parseInt(sampleData[j][i]);
                    }
                }
            }

            for( i = 0 ; i < sampleHeader.length; i++) {
                if (sampleHeader[i] != "RecreationVisitors") {

                    parkActivityData.push
                    ({
                        ActivityType: sampleHeader[i],
                        count: activityCounts[i],
                    });
                }
            }
        }
        else
        {
            sampleData = step1DisplayData[p]["ActivityData"][SelectedYear][SelectedMonth];

            if(sampleHeader == null)
                sampleHeader = step1DisplayData[p]["ActivityDataHeader"];

            for( i = 0 ; i < sampleHeader.length; i++) {
                if (sampleHeader[i] != "RecreationVisitors") {

                    parkActivityData.push
                    ({
                        ActivityType: sampleHeader[i],
                        count: parseInt(sampleData[i]),
                    });
                }
            }
        }

        step2DisplayData.push
        ({
            ParkName:step1DisplayData[p]["ParkName"],
            ActivityData:parkActivityData,
        });



    }

    //console.log(step2DisplayData);
    self.displayData = step2DisplayData;

}


//Example version of this code is from: http://bl.ocks.org/mbostock/4063269
ActivitiesVis.prototype.drawVis = function(dataDraw)
{
    var self = this;

    self.filterData();

    var deleteBars = d3.selectAll(".compareBar").remove();
    var deleteTips = d3.selectAll(".d3-tip3").remove();

    self.m=d3.max(self.displayData, function (d, i) {

            return self.displayData[i]["ActivityData"][IndexByActivity[SelectedActitiy]]["count"]

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
        .html(function(d,i)
        {

            var monthlyMode =" ";
            var count = " ";

            if(MonthMode != 0)
            {
                monthlyMode = " " + MonthsByNumber[SelectedMonth] + " ";
            }

            return "<strong>Park name</strong> <span style='color:red'>" + NameSelectionByCode[d.ParkName]
                + "</span>"+"<br>" + "<strong>" + SelectedYear + monthlyMode + FriendlyActivitiyNames[SelectedActitiy] + ":</strong> <span style='color:red'>" + self.displayData[i]["ActivityData"][IndexByActivity[SelectedActitiy]]["count"]+ "</span>";
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
            return self.xScale(self.displayData[i]["ActivityData"][IndexByActivity[SelectedActitiy]]["count"]);
        },
        "x": function () {
            return 0;
        }
    });



    bars.style("fill", function (d,i)
    {   if(d["ParkName"] != ActivitiesPark)
            return self.colorScale(self.displayData[i]["ActivityData"][IndexByActivity[SelectedActitiy]]["count"]);
        else
            return "steelblue"
    });

    bars.on('mouseover', tip.show);
    bars.on('mouseout', tip.hide);
    bars.on("click", function (d)
    {
        //console.log("clicked a bar for " + NameSelectionByCode[d["ParkName"]]);
        self.eventHandler(d["ParkName"]);
    });

}


ActivitiesVis.prototype.messageVis = function()
{
    var self = this;
    //console.log("wiggin");
    var wiggin = d3.select(self.parentPane).append("g").append("text")
        .attr("class","noChartText")
        .attr("transform","translate(" + 0 + "," + 100 + ")")
        .html("Please select an activity from the activty selector to begin")
        .attr("opacity",0);

    wiggin
        .transition()
        .duration(500)
        .attr("opacity",1);

}

ActivitiesVis.prototype.clearVis = function()
{
    var self = this;

    var doom = d3.select(self.parentPane).selectAll("g").remove();

}

ActivitiesVis.prototype.updateVis = function()
{
    var self = this;

    if(SelectedActitiy != "")
        self.initVis()
    else
    {
        //console.log("cleared vis")
        self.clearVis();
        self.messageVis();
    }
}

/**
 * Created by Tony on 11/22/2015.
 */
