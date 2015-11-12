//test to try having layout for a map, note: this is a temprorary map, we might switch to another map

function BubbleVis(_parentPane,_defaultData)
{


    var self = this;
    self.parentPane = _parentPane;
    self.currentData = _defaultData;
    self.displayData = null;
    self.nodeGroup = "bubbleNodes";
    self.leftMargin = 20;
    self.rightMargin = 20;
    self.topMargin = 20;
    self.bottomMargin = 20;


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

    //console.log(bubble.nodes(classes(dataDraw)))
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

        var size = 10;

        var extraScale = (value/max) * 90;
        //console.log(max)
        return size + extraScale;
    }

    var nodesGroup = d3.select("."+self.nodeGroup)

    var nodesEnter = nodesGroup.selectAll(".node")
        .data(dataDraw);


    nodesEnter.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d,i) { return "translate(" + self.leftMargin*i + "," + self.rightMargin*i + ")"; });

    nodesEnter.append("title")
        .text("Node");

    nodesEnter.append("circle")
        .attr("r", function(d) { return nodeSize(d.count) })
        .style("fill", function(d) { return self.bubbleColorScale(d.ActivityType) } ) ;

    nodesEnter.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d){return d.ActivityType});

    nodesEnter.exit()



    d3.select(self.frameElement).style("height", diameter + "px");
}

BubbleVis.prototype.loadParkData = function(incomingData)
{
    var self = this;
    self.currentData = incomingData;
    //self.drawVis(incomingData);
}

//Incoming data is the data you want to show in the vis
BubbleVis.prototype.updateVis = function()
{
    var self = this;
    var sampleHeader = self.currentData ["ActivityDataHeader"];
    var sampleData = self.currentData ["ActivityData"][SelectedYear][SelectedMonth];

    var newDisplayData = [];
    var returnDisplayData = [];

    self.BubbleColorScale = d3.scale.category20c();
    self.BubbleColorScale.domain(self.currentData ["ActivityDataHeader"]);

   // console.log(sampleHeader);
    //console.log(sampleData);

    for( i = 0 ; i < self.currentData ["ActivityDataHeader"].length; i++)
    {
        newDisplayData.push({
            ActivityType:   self.currentData ["ActivityDataHeader"][i],
            count: self.currentData ["ActivityData"][SelectedYear][SelectedMonth][i]
        });
    }

    //console.log(newDisplayData);
    self.displayData = newDisplayData;
    self.drawVis(self.displayData);
}

BubbleVis.prototype.initVis = function ()
{
    var self = this;

    var svg = d3.select(self.parentPane)
        .append("g")
        .attr("class",self.nodeGroup)
        .attr("transform", function(d) { return "translate(" + self.leftMargin + "," + self.topMargin + ")"; });




};

