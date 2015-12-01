//Bubblechart.js
//Created by Tony Niven: 11/10/15

function BubbleVis(_parentPane,_defaultData,_eventHandler)
{
    var self = this;
    
    self.parentPane = _parentPane;
    self.currentData = _defaultData;
    self.changEvent = _eventHandler;
    self.displayData = null;
    self.nodeGroup = "bubbleNodes";
    self.minCircleSize = 20;
    self.maxCircleSize = 80;
    self.majorCircleSize = 80;
    self.circleRadius = 250;
    self.previouslySelectedActivity = "";
    self.enabled = true;
    
    var selection = d3.selectAll(_parentPane);
    
    self.width = selection.attr("width");
    self.height = selection.attr("height");
    
    self.leftMargin = 20;
    self.rightMargin = 20;
    self.topMargin = 20;
    self.bottomMargin = 20;
    
    self.colorScale = function(i) 
    {
        colors = ["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"];
        return colors[i];
    }
    
    self.radialPosition = function (i,numel)
    {
        var wedgeSize = 360 / numel;

        
        XY = [self.width/2, self.height/2];
        
        var wedgeFromTop = (i * wedgeSize * (Math.PI / 180));
            
        XY[0] = XY[0] + self.circleRadius * Math.cos(wedgeFromTop)
        XY[1] = XY[1] + self.circleRadius * Math.sin(wedgeFromTop)
        
        return XY;
    }

    self.initVis();
}

//Example version of this code is from: http://bl.ocks.org/mbostock/4063269
BubbleVis.prototype.drawVis = function(dataDraw)
{

    var self = this;

    if(self.previouslySelectedActivity != "" && SelectedActitiy == "")
    {
        self.previouslySelectedActivity = "";
    }

    var diameter = 960,
        format = d3.format(",d"),
        color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    //console.log(self.currentData)
    
    var text = d3.select(".titleText")
        .text(function (d) {

            var monthlyMode ="";

            if(MonthMode != 0)
            {
                monthlyMode = " : " + MonthsByNumber[SelectedMonth];;
            }

            if(SelectedActitiy == "")
                return NameSelectionByCode[ActivitiesPark]+ " : " + SelectedYear  + monthlyMode
            else
                return NameSelectionByCode[ActivitiesPark]+ " : " + SelectedYear  + monthlyMode + " : " + FriendlyActivitiyNames[SelectedActitiy];
        });
    
    var nodeSize = function (value)
    {
        //This value will be the largest circle, everything else will be a minimum of like 10 pixels
        var max = 0;

        for(i = 0; i < dataDraw.length; i++)
        {
            if(dataDraw[i].count > max)
            {
                max = dataDraw[i].count;
            }
        }

        var size = self.minCircleSize;

        var extraScale = (value/max) * self.maxCircleSize;
        //console.log(max)
        return size + extraScale;
    }

    var nodesGroup = d3.select("."+self.nodeGroup)

    var deleteNodes = d3.selectAll(".node").remove();

    var nodesEnter = nodesGroup.selectAll(".node")
        .data(dataDraw);

    nodesEnter.enter().append("g")
        .attr("class", "node")
        .style("opacity", 0)
        .attr("transform", function(d,i)
        {
            if(d.ActivityType == SelectedActitiy) {
                var xy = [self.width / 2, self.height / 2];
                return "translate(" + xy[0] + "," + xy[1] + ")";
            }
            else {
                var xy = self.radialPosition(i,dataDraw.length);
                return "translate(" + xy[0] + "," + xy[1] + ")";
            }
        })
        .attr("selected",function(d,i)
        {
            if(d.ActivityType == SelectedActitiy)
                return "true";
            else
                return "false";
        })
        .on("click", function(d,i) 
        {   
            var selectedNode = d3.selectAll(".node").attr("selected","true")
                .transition()
                .duration(500)
                .attr("transform", function(d,i) { var xy = self.radialPosition(i,dataDraw.length); return "translate(" + xy[0] + "," + xy[1] + ")"; })
                .attr("selected","false");
                
            selectedNode.select("circle")
                .attr("r", function(d) { return nodeSize(d.count) })
                
        
            var newNode = d3.select(this)
                .transition()
                .duration(500)
                .attr("transform", function(d,i) { var xy = [self.width/2, self.height/2]; return "translate(" + xy[0] + "," + xy[1] + ")"; })
                .attr("selected","true");
                
            newNode.select("circle")
                .attr("r", self.majorCircleSize);

            SelectedActitiy = d.ActivityType;

            var text = d3.select(".titleText")
                .text(function (d) {

                    var monthlyMode ="";

                    if(MonthMode != 0)
                    {
                        monthlyMode = " : " + MonthsByNumber[SelectedMonth];;
                    }

                    if(SelectedActitiy == "")
                        return NameSelectionByCode[ActivitiesPark]+ " : " + SelectedYear  + monthlyMode
                    else
                        return NameSelectionByCode[ActivitiesPark]+ " : " + SelectedYear  + monthlyMode + " : " + FriendlyActivitiyNames[SelectedActitiy];
                });

            if(SelectedActitiy != self.previouslySelectedActivity)
            {
                self.previouslySelectedActivity = d.ActivityType;
                self.changEvent();
            }

        })
        .transition()
        .duration(500)
        .style("opacity", 1)
        .attr("transform", function(d,i)
        {
            if(d.ActivityType == SelectedActitiy) {
                var xy = [self.width / 2, self.height / 2];
                return "translate(" + xy[0] + "," + xy[1] + ")";
            }
            else {
                var xy = self.radialPosition(i,dataDraw.length);
                return "translate(" + xy[0] + "," + xy[1] + ")";
            }
        })
        
    nodesEnter.append("title")
        .text("Node");

    nodesEnter.append("circle")
        .attr("r", function(d,i)
        {
            if(d.ActivityType == SelectedActitiy)
                return self.majorCircleSize;
            else
                return nodeSize(d.count);
             })
        .style("fill", function(d,i) { return self.colorScale(i)} )
        .style("stroke","grey")
        .style("stroke-width", "1px")
        

    nodesEnter.append("text")
        .attr("dy", "-.5em")
        .style("text-anchor", "middle")
        .text(function(d){return FriendlyActivitiyNames[d.ActivityType]});
        
    nodesEnter.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d){return d.count});

        
    nodesEnter.exit()
        .transition()
            .duration(500)
            .style("opacity", 1).remove()

    d3.select(self.frameElement).style("height", diameter + "px");
}

BubbleVis.prototype.loadParkData = function(incomingData)
{
    var self = this;
    self.currentData = incomingData;
}

//Incoming data is the data you want to show in the vis
BubbleVis.prototype.updateVis = function()
{
    var self = this;
    if(SelectedYear > 1978)
    {
        self.enabled = true;
    }
    else
        self.enabled = false;

    if(self.enabled)
    {
        for(i = 0; i < self.currentData.length; i ++)
        {
            if(self.currentData[i]["ParkName"] == ActivitiesPark)
            {
                self.displayData = self.currentData[i];
            }
        }

        var newDisplayData = [];
        var sampleHeader = self.displayData["ActivityDataHeader"];
        var sampleData;


        if(MonthMode == 0)
        {
            sampleData = self.displayData["ActivityData"][SelectedYear];

            var activityCounts =[0,0,0,0,0,0,0,0,0];

            for( j = 1; j < 13; j++ )
            {
                //console.log(MonthsByNumber[j])
                for( i = 0 ; i < self.displayData ["ActivityDataHeader"].length; i++)
                {
                    if (self.displayData["ActivityDataHeader"][i] != "RecreationVisitors") {
                        activityCounts[i] += parseInt(sampleData[j][i]);
                    }
                }
            }

            for( i = 0 ; i < self.displayData ["ActivityDataHeader"].length; i++) {
                if (self.displayData["ActivityDataHeader"][i] != "RecreationVisitors") {

                    newDisplayData.push
                    ({
                        ActivityType: self.displayData["ActivityDataHeader"][i],
                        count: activityCounts[i],
                    });
                }
            }
        }
        else
        {
            sampleData = self.displayData["ActivityData"][SelectedYear][SelectedMonth];

            for(i = 0 ; i < self.displayData ["ActivityDataHeader"].length; i++) {
                if (self.displayData["ActivityDataHeader"][i] != "RecreationVisitors") {

                    newDisplayData.push
                    ({
                        ActivityType: self.displayData["ActivityDataHeader"][i],
                        count: parseInt(self.displayData["ActivityData"][SelectedYear][SelectedMonth][i])
                    });
                }
            }
        }

        ///Add aggregation for year

        self.displayData = newDisplayData;
        self.drawVis(self.displayData);
    }
}

BubbleVis.prototype.initVis = function ()
{
    var self = this;
            
    XY = [self.width/2, self.height/2];
    
    var svg = d3.select(self.parentPane)
        .append("g")
        .attr("transform", function(d) { return "translate(" + (self.leftMargin ) + "," + self.topMargin + ")"; })
        .append("text")
        .attr("class","titleText")
        .attr("dy", "1.3em")
        .style("text-anchor", "left")
        
    
    var svg = d3.select(self.parentPane)
        .append("g")
        .attr("class","ringCircle")
        
    svg.append("circle")
        .attr("r",self.circleRadius)
        .style("fill", "none")
       // .style("stroke","lightgrey")
        .style("stroke","none")
        .style("stroke-width", "1px")
        .attr("cx", self.leftMargin + XY[0])
        .attr("cy", self.topMargin + XY[1])

    var svg = d3.select(self.parentPane)
    
    svg.append("g")
        .attr("class",self.nodeGroup)
        .attr("transform", function(d) { return "translate(" + self.leftMargin + "," + self.topMargin + ")"; });

    self.updateVis();
};

