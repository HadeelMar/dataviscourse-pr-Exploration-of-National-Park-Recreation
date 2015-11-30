//test to try having layout for a map, note: this is a temprorary map, we might switch to another map

function MapVis(_parentPane, dataloaded,usStateData,allData,_eventHandler)
{
    var self = this;
    self.parentPane = _parentPane;
    self.changEvent = _eventHandler;
    self.displayData = allData;

}



MapVis.prototype.addInfo = function() {
    
    var self = this;

    var info = d3.select("#information");
    rect = info.append('rect').transition().duration(500)
        .attr('width', 150)
        .attr('height', 100)
        .attr('x', 40)
        .attr('y', 100)
        .style('fill', 'none')
        .attr('stroke', 'black');
    text = info.append('foreignObject')
        .data(self.displayData)
        .attr('x', 50)
        .attr('y', 130)
        .attr('width', 150)
        .attr('height', 100);
    text.exit().remove();

        text.enter().append("xhtml:body")
        if (SelectedYear >= 1980 && SelectedYear <= 1990) {
        text.html('<div style="width: 150px;">This is some information about whatever</div>')}

            else if (SelectedYear >= 1991 && SelectedYear <= 2010) {
            text.html('<div style="width: 150px;">hi</div>')}
        }

MapVis.prototype.drawParks = function () {


    var self = this;


    var projection = d3.geo.albersUsa()
        .scale(1100);

    var deleteTips = d3.selectAll(".d3-tip2").remove();

    self.minland= d3.min(dataloaded,function(d){ return d.land});
    self.maxland= d3.max(dataloaded,function(d){ return d.land});

    self.minface= d3.min(dataloaded,function(d){ return d.Facebook});
    self.maxface= d3.max(dataloaded,function(d){ return d.Facebook});

    self.minreview= d3.min(dataloaded,function(d){ return d.reviews});
    self.maxreview= d3.max(dataloaded,function(d){ return d.reviews});

    var marks = d3.select(self.parentPane).selectAll("circle").data(dataloaded);

    marks.exit().remove();

    var tipy = d3.tip()
        .attr('class', 'd3-tip2')
        .offset([-10, 0])
        .html(function (d) {
            if (parkSelectionMethod == 0) {
                return "<strong>Park Name:</strong> <span style='color:red'>" + d.name + "</span>" +
                    "<br>" + "<strong>Land Aera:</strong> <span style='color:red'>" + d.land + "</span>"
                    +"<br>" + "<strong>This park:</strong> <span style='color:red'>" + d.info+"<br>"  + "</span>";
            }
            else if (parkSelectionMethod == 1) {
                return "<strong>Park Name:</strong> <span style='color:red'>" + d.name + "</span>" + "<br>" + "<strong>Facebook likes:</strong> <span style='color:red'>" + d.Facebook + "</span>";
            }
            else if (parkSelectionMethod == 2) {
                return "<strong>Park Name:</strong> <span style='color:red'>" + d.name + "</span>" + "<br>" + "<strong>Google Reviews:</strong> <span style='color:red'>" + d.reviews + "</span>";
            }
            else if(parkSelectionMethod == 3) {
                return "<strong>Park Name:</strong> <span style='color:red'>" + d.name+ "</span>" +"<br>" + "<strong>Annual Visits:</strong> <span style='color:red'>" + allData[IndexSelectionByCode[ParkSelectionByName[d.name]]]["YearlyData"][SelectedYear]+ "</span>";
            }
            else if (parkSelectionMethod == 4)
                return "<strong>Park Name:</strong> <span style='color:red'>" + d.name+ "</span>"
        });

    marks.enter().append("circle")
        .attr("selected", function (d) {
            var selected = "false";

            for (j = 0; j < SelectedParks.length; j++) {
                if (d.name.valueOf() == SelectedParks[j].valueOf())
                    selected = "true";
            }
            return selected;
        })
        .on("click", function (d, i) {
            //var selectedNode = d3.selectAll(".node").attr("selected","true")

            var newNode = d3.select(this);

            if (newNode.attr("selected").valueOf() == "true") {
                if (SelectedParks.length > 1) {
                    //console.log("Unselected: " + " [ " + d.name + " ] ")
                    newNode.attr("selected", function(d)
                    { if(d.name in SelectedParks) {
                        return "true"}
                    else return "false" });


                    newNode
                        .transition()
                        .duration(250)
                        .style("fill", "white")


                    var index = SelectedParks.indexOf(d.name);
                    if (index > -1) {
                        SelectedParks.splice(index, 1);
                    }
                }
            }
            else {
                //console.log("Selected: " + " [ " + d.name +" ] ")
                newNode.attr("selected", "true");

                newNode
                    .transition()
                    .duration(250)
                    .style("fill", "#DF7E7B")


                SelectedParks.push(d.name);


            }

            var badbadtips = d3.selectAll(".d3-tip2").style({opacity: "1"});
            badbadtips.remove();

            self.changEvent();
            //console.log(SelectedParks);
        });

    marks.style("fill", function (d) {
        var selected = false;

        for (j = 0; j < SelectedParks.length; j++) {
            if (d.name.valueOf() == SelectedParks[j].valueOf())
                selected = "true";
        }

        var color = "";

        if (selected == "true") {

            color = "#DF7E7B";
        }

        else
            color = "white";


        if(ParkSelectionByName[d.name] == ActivitiesPark)
            color = "steelblue";

        return color;
    })
        .style("stroke", "black");
    marks.call(tipy);
    marks.transition()
        .duration(500)
        .style("opacity", function (d)
        {
            if(ParkSelectionByName[d.name] == ActivitiesPark)
                return 1.0;

            return 0.8;
        })
        .attr("cx", function (d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", function (d,i) {
            var selected = "false";

            for (j = 0; j < SelectedParks.length; j++) {
                if (d.name.valueOf() == SelectedParks[j].valueOf())
                    selected = "true";
            }
            size = 1;

            if (parkSelectionMethod == 0)
                size = Math.sqrt(parseInt(d.land) * 0.025);
            else if (parkSelectionMethod == 1)
                size = Math.sqrt(parseInt(d.Facebook) * 0.0002);
            else if (parkSelectionMethod == 2)
                size = Math.sqrt(parseInt(d.reviews * 1000) * 0.045);
            else if (parkSelectionMethod == 3)
            {
                var vex = ParkSelectionByName[d.name];
                var ret = 1;
                if(vex)
                {
                    ret = Math.sqrt(allData[IndexSelectionByCode[vex]]["YearlyData"][SelectedYear]  * 0.00045  );
                }
                if(isNaN(ret))
                {
                    //console.log( d.name + " : " + vex + " : " + SelectedYear + " : " + allData[IndexSelectionByCode[vex]]["YearlyData"][SelectedYear]);
                    return 0;
                }
                return ret;

            }
            else if (parkSelectionMethod == 4)
                size = 8;

                return size*(2);
        });

    marks.on('mouseover', tipy.show);
    marks.on('mouseout', tipy.hide);

/*
    var width = 500,
        height = 100;

    var svg = d3.select("#legend").append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g");

    var img = g.append("svg:image")
        .attr("xlink:href", "img/100.png")
        .attr("width", 500)
        .attr("height", 100) */
/*
    legend.append("text")
        .attr("cx",100)
        .attr("cy",100)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; }); */
}

MapVis.prototype.draw = function (usStateData) {

    //var self = this;

    var projection = d3.geo.albersUsa().scale(1100);
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#draw")
        .datum(topojson.feature(usStateData, usStateData.objects.states))
        .attr("d", path);
};

MapVis.prototype.updateVis = function()
{
    var self = this;
    
    self.drawParks();
    self.draw(usStateData);
    self.addInfo();
}

MapVis.prototype.updateParks = function()
{

}