//Bubblechart.js
//Created by Tony Niven: 11/10/15

function BubbleVis(_parentPane,_defaultData,_eventHandler)
{
    var self = this;
    
    self.parentPane = _parentPane;
    self.currentData = _defaultData;
    self.defaultPark = "Arches_NP";
    self.currentPark = self.defaultPark;
    self.displayData = null;
    self.nodeGroup = "bubbleNodes";
    self.minCircleSize = 30;
    //self.minCircleSize = 5;
    self.maxCircleSize = 120;
    self.majorCircleSize = 80;
    self.circleRadius = 260;
    //self.circleRadius = 60;
    
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

    var diameter = 960,
        format = d3.format(",d"),
        color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    //console.log(self.currentData)
    
    var text = d3.select(".titleText")
        .text(NameSelectionByCode[self.currentPark]+ " : " + SelectedYear + " : " + MonthsByNumber[SelectedMonth]);
    
    var nodeSize = function (value)
    {
        //This value will be the largest circle, everything else will be a minimum of like 10 pixels
        var max = 0;

        for(i = 0; i < dataDraw.length; i++)
        {
            if(parseInt(dataDraw[i].count) > max)
            {
                max = parseInt(dataDraw[i].count);
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
        .attr("transform", function(d,i) { xy = [self.width/2, self.height/2];; return "translate(" + xy[0] + "," + xy[1] + ")"; })
        .attr("selected","false")
        .on("click", function(d,i) 
        {   
            var selectedNode = d3.selectAll(".node").attr("selected","true")
                .transition()
                .duration(500)
                .attr("transform", function(d,i) { xy = self.radialPosition(i,dataDraw.length); return "translate(" + xy[0] + "," + xy[1] + ")"; })
                .attr("selected","false");
                
            selectedNode.select("circle")
                .attr("r", function(d) { return nodeSize(d.count) })
                
        
            var newNode = d3.select(this)
                .transition()
                .duration(500)
                .attr("transform", function(d,i) { xy = [self.width/2, self.height/2];; return "translate(" + xy[0] + "," + xy[1] + ")"; })
                .attr("selected","true");
                
            newNode.select("circle")
                .attr("r", self.majorCircleSize)
                
            var text = d3.select(".titleText")
                .text(NameSelectionByCode[self.currentPark]+ " : " + SelectedYear + " : " + MonthsByNumber[SelectedMonth] + " : " + d.ActivityType);
        })
        .transition()
        .duration(500)
        .style("opacity", 1)
        .attr("transform", function(d,i) { xy = self.radialPosition(i,dataDraw.length); return "translate(" + xy[0] + "," + xy[1] + ")"; })
        
        
    nodesEnter.append("title")
        .text("Node");

    nodesEnter.append("circle")
        .attr("r", function(d) { return nodeSize(d.count) })
        .style("fill", function(d,i) { return self.colorScale(i)} )
        .style("stroke","grey")
        .style("stroke-width", "1px")
        

    nodesEnter.append("text")
        .attr("dy", "-.5em")
        .style("text-anchor", "middle")
        .text(function(d){return d.ActivityType});
        
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
    
    for(i = 0; i < self.currentData.length; i ++)
    {
        if(self.currentData[i]["ParkName"] == self.currentPark)
        {
            self.displayData = self.currentData[i];
        }
    }
    
    var sampleHeader = self.displayData["ActivityDataHeader"];
    var sampleData = self.displayData["ActivityData"][SelectedYear][SelectedMonth];

    var newDisplayData = [];
    var returnDisplayData = [];

    for( i = 0 ; i < self.displayData ["ActivityDataHeader"].length; i++) {
        if (self.displayData["ActivityDataHeader"][i] != "RecreationVisitors") {

            newDisplayData.push
            ({
                ActivityType: self.displayData["ActivityDataHeader"][i],
                count: self.displayData["ActivityData"][SelectedYear][SelectedMonth][i]
            });
        }
    }


    self.displayData = newDisplayData;
    self.drawVis(self.displayData);
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

