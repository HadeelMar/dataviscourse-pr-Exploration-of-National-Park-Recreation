//test to try having layout for a map, note: this is a temprorary map, we might switch to another map

function MapVis(_parentPane, _parentObject,dataloaded,usStateData)
{


    var self = this;
    self.parentPane = _parentPane;
    //console.log(self.parentPane);
    self.parent = _parentObject;

    //self.loadedData=dataloaded;
    //console.log(dataloaded);
   // console.log(self.loadedData);
    //self.usStateData= usStateData;
   // self.initVis();
}



MapVis.prototype.addInfo = function() {
    
    var self = this;

    var info = d3.select("#information").selectAll("text")
        .data(dataloaded);
         info.enter()
        .append("text")
        .text(function(d) { return d.info;})



};

MapVis.prototype.drawParks = function () {

    
    var self = this;




    var projection = d3.geo.albersUsa();
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);

    if(parkSelectionMethod == 0)
        tip.html(function(d) {
            return "<strong>Park Name:</strong> <span style='color:red'>" + d.name+ "</span>" +"<br>" +
                "<strong>Land Aera:</strong> <span style='color:red'>" + d.land+ "</span>"
                ;
        });

    else if(parkSelectionMethod == 1)

        tip.html(function(d) {
            return "<strong>Park Name:</strong> <span style='color:red'>" + d.name+ "</span>" +"<br>" +
                "<strong>Facebook likes:</strong> <span style='color:red'>" + d.Facebook+ "</span>"
                ;
        });

    else if(parkSelectionMethod == 2)

        tip.html(function(d) {
            return "<strong>Park Name:</strong> <span style='color:red'>" + d.name+ "</span>" +"<br>" +
                "<strong>Google Reviews:</strong> <span style='color:red'>" + d.reviews+ "</span>"
                ;
        });

    var marks= d3.select(self.parentPane).selectAll("circle").data(dataloaded);

    marks.exit().remove();
    
    //var marks = d3.select(self.parentPane).selectAll("circle")
     //   .data(self.loadedData);
    marks.enter().append("circle");
    marks.style("fill", "red");
    marks.call(tip);
    marks.transition()
        .duration(500)
        .style("opacity", 1)
        .attr("cx", function (d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", function (d) {

            if(parkSelectionMethod == 0)
                return Math.sqrt(parseInt(d.land) * 0.025);
            else if(parkSelectionMethod == 1)
                return Math.sqrt(parseInt(d.Facebook) * 0.0002);
            else if(parkSelectionMethod == 2)
                return Math.sqrt(parseInt(d.reviews*1000) * 0.045)
        });


        marks.on('mouseover', tip.show);
        marks.on('mouseout', tip.hide);
    /*    marks.on("mouseover", function(d) {

            label= d.name;
            d3.select(this).text(label);
            console.log(label);
                //.style("fill", "red");

        });
        marks.on("mouseout", function(d) {
            d3.select(this);
                //.style("fill", "steelblue");

        })*/
};


MapVis.prototype.draw = function (usStateData) {
    
    //var self = this;

    var projection = d3.geo.albersUsa();
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#draw")
        .datum(topojson.feature(usStateData, usStateData.objects.states))
        .attr("d", path);


}

MapVis.prototype.updateVis = function()
{
    var self = this;
    
    self.drawParks();
    self.draw(usStateData);
    self.addInfo();
}




/*
MapVis.prototype.initVis = function () 
{
    var self = this;
    
    d3.json("data/states.json", function (error, usStateData) {
        if (error) throw error;

        self.draw(usStateData);

    });

    d3.csv("data/parks.csv", function (dataloaded) {

        self.loadedData=dataloaded;
        self.drawParks();
        self.addInfo();
    });
};

*/