//test to try having layout for a map, note: this is a temprorary map, we might switch to another map

function MapVis(_parentPane, dataloaded,usStateData,allData,_eventHandler)
{


    var self = this;
    self.parentPane = _parentPane;
    //console.log(self.parentPane);
    //self.parent = _parentObject;
    self.changEvent = _eventHandler;
    self.displayData = allData;
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


    var projection = d3.geo.albersUsa()
        .scale(900);

    var deleteTips = d3.selectAll(".d3-tip2").remove();

    /*
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
     */



    // defining the colorscale


    self.minland= d3.min(dataloaded,function(d){ return d.land});
    self.maxland= d3.max(dataloaded,function(d){ return d.land});


    self.minface= d3.min(dataloaded,function(d){ return d.Facebook});
    self.maxface= d3.max(dataloaded,function(d){ return d.Facebook});


    self.minreview= d3.min(dataloaded,function(d){ return d.reviews});
    self.maxreview= d3.max(dataloaded,function(d){ return d.reviews});

    /*
    if (parkSelectionMethod == 0)
    //"#DF7E7B","#C01D17"
    //  colorScale = d3.scale.linear().domain([self.minland, self.maxland]).range(["#fee8c8","#e34a33"]);
        colorScale = d3.scale.linear().domain([self.minland, self.maxland]).range(["#fee8c8","#e34a33"]);
    else if (parkSelectionMethod == 1)
    //  colorScale = d3.scale.linear().domain([self.minface,self.maxface]).range(["#fee8c8","#e34a33"]);
    else if (parkSelectionMethod == 2)
        colorScale = d3.scale.linear().domain([self.minreview, self.maxreview]).range(["#fee8c8","#e34a33"]);*/

    var marks = d3.select(self.parentPane).selectAll("circle").data(dataloaded);

    marks.exit().remove();

    var tipy = d3.tip()
        .attr('class', 'd3-tip2')
        .offset([-10, 0])
        .html(function (d) {
            if (parkSelectionMethod == 0) {
                return "<strong>Park Name:</strong> <span style='color:red'>" + d.name + "</span>" + "<br>" + "<strong>Land Aera:</strong> <span style='color:red'>" + d.land + "</span>";
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
        });

    //var marks = d3.select(self.parentPane).selectAll("circle")
    //   .data(self.loadedData);
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

            newNode = d3.select(this);

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
                        .style("fill", "red")
                        /*
                        .attr("r", function (d) {
                            //       if (parkSelectionMethod == 3)
                            //          return Math.sqrt(parseInt(function(d,i) {
                            //              return parseInt(self.displayData[i]["YearlyData"][SelectedYear]);})  * 0.025);

                            if (parkSelectionMethod == 0)
                                return Math.sqrt(parseInt(d.land) * 0.025);
                            else if (parkSelectionMethod == 1)
                                return Math.sqrt(parseInt(d.Facebook) * 0.0002);
                            else if (parkSelectionMethod == 2)
                                return Math.sqrt(parseInt(d.reviews * 1000) * 0.045)
                            else if (parkSelectionMethod == 3)
                            {
                                //console.log(d.name);
                                //var vex = ;
                                //var vexing = vex;
                                //console.log()
                                //console.log(vexing);
                                return Math.sqrt(allData[IndexSelectionByCode[ParkSelectionByName[d.name]]]["YearlyData"][SelectedYear]);
                            }
                        });
                    */


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
                    .style("fill", "blue")

                    /*
                    .attr("r", function (d) {
                        if (parkSelectionMethod == 0)
                            return 2 * Math.sqrt(parseInt(d.land) * 0.025);
                        else if (parkSelectionMethod == 1)
                            return 2 * Math.sqrt(parseInt(d.Facebook) * 0.0002);
                        else if (parkSelectionMethod == 2)
                            return 2 * Math.sqrt(parseInt(d.reviews * 1000) * 0.045)
                        else if (parkSelectionMethod == 3)
                        {
                            return Math.sqrt(allData[IndexSelectionByCode[ParkSelectionByName[d.name]]]["YearlyData"][SelectedYear]);
                        }
                    });*/


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
        if (selected == "true") {

            /*
            if (parkSelectionMethod == 0)
                return colorScale(d.land)
            else if (parkSelectionMethod == 1)
                return colorScale(d.Facebook)
            else if (parkSelectionMethod == 2)
                return colorScale(d.reviews)*/
            return "red";
        }


        else
            return "blue";
    })
        .style("stroke", "black");
    marks.call(tipy);
    marks.transition()
        .duration(500)
        .style("opacity", 0.5)
        .attr("cx", function (d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
            return projection([d.lon, d.lat])[1];
        })
        /*
         .attr("r", function(d)
         {
         if(parkSelectionMethod == 0)
         return Math.sqrt(parseInt(d.land) * 0.025);
         else if(parkSelectionMethod == 1)
         return Math.sqrt(parseInt(d.Facebook) * 0.0002);
         else if(parkSelectionMethod == 2)
         return Math.sqrt(parseInt(d.reviews*1000) * 0.045)
         });
         */
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

            if (selected.valueOf() == "true") {
                return size * 2;
            }
            else
                return size;
        });


    marks.on('mouseover', tipy.show);
    marks.on('mouseout', tipy.hide);
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

    ////// new circles
/*
    if (parkSelectionMethod == 3) {
        var marks1 = d3.select(self.parentPane).selectAll("circle").data(self.displayData);

        marks.exit().remove();


//var marks = d3.select(self.parentPane).selectAll("circle")
//   .data(self.loadedData);
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
                        newNode.attr("selected", "false");
                        newNode
                            .transition()
                            .duration(250)
                            .style("fill", "red")
                            .attr("r", function (d, i) {
                                //           if (parkSelectionMethod == 3)
                                //               return Math.sqrt(parseInt(function(d,i) {
                                //                     return parseInt(self.displayData[i]["YearlyData"][SelectedYear]);})  * 0.025);

                                if (parkSelectionMethod == 3)
                                    return Math.sqrt(parseInt(function (d, i) {
                                            return parseInt(self.displayData[i]["YearlyData"][SelectedYear]);
                                        }) * 0.025);

                            });


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
                        .style("fill", "blue")

                        .attr("r", function (d) {
                            if (parkSelectionMethod == 3)
                                return Math.sqrt(parseInt(function (d, i) {
                                        return 2 * parseInt(self.displayData[i]["YearlyData"][SelectedYear]);
                                    }) * 0.025);
                        });


                    SelectedParks.push(d.name);


                }


                self.changEvent();
                console.log(SelectedParks);
            });

        marks.style("fill", function (d) {
            var selected = false;

            for (j = 0; j < SelectedParks.length; j++) {
                if (d.name.valueOf() == SelectedParks[j].valueOf())
                    selected = "true";
            }
            if (selected == "true")
                return "red";
            else
                return "steelblue";
        })
            .style("stroke", "black");
        marks.call(tipy);
        marks.transition()
            .duration(500)
            .style("opacity", 0.8)
            .attr("cx", function (d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function (d) {
                return projection([d.lon, d.lat])[1];
            })
        /*
         .attr("r", function(d)
         {
         if(parkSelectionMethod == 0)
         return Math.sqrt(parseInt(d.land) * 0.025);
         else if(parkSelectionMethod == 1)
         return Math.sqrt(parseInt(d.Facebook) * 0.0002);
         else if(parkSelectionMethod == 2)
         return Math.sqrt(parseInt(d.reviews*1000) * 0.045)
         });



        marks.on('mouseover', tipy.show);
        marks.on('mouseout', tipy.hide);
        /*    marks.on("mouseover", function(d) {

         label= d.name;
         d3.select(this).text(label);
         console.log(label);
         //.style("fill", "red");

         });
         marks.on("mouseout", function(d) {
         d3.select(this);
         //.style("fill", "steelblue");

         })
    }*/
}

MapVis.prototype.draw = function (usStateData) {

    //var self = this;

    var projection = d3.geo.albersUsa().scale(900);
    var path = d3.geo.path()
        .projection(projection);

 // bRush - we don't need it anymore!
 /*
    var long1 = projection.invert([0, 0])[0];
    // Get the longitude of the top right corner of our map area.
    var long2 = projection.invert([200, 0])[0];
    // Get the latitude of the top left corner of our map area.
    var lat1 = projection.invert([0, 0])[1];
    // Get the latitude of the bottom left corner of our map area.
    var lat2 = projection.invert([0, 300])[1];

*/
    var svg = d3.select("#draw")
        .datum(topojson.feature(usStateData, usStateData.objects.states))
        .attr("d", path);

 /*   var brushX = d3.scale.linear()
        .range([0, size[0]])
        .domain([long1, long2]);

    //Create a linear scale generator for the y of our brush.
    brushY = d3.scale.linear()
        .range([0, size[1]])
        .domain([lat1, lat2]);

    //Create our brush using our brushX and brushY scales.
    brush = d3.svg.brush()
        .x(brushX)
        .y(brushY)
        .on('brush', function () {
            dispatch.brushing(brush);
        });
    svg.append('g')
        .attr('class', 'brush')
        //.call(brush)
        .selectAll('rect')
        .attr('width', 50);

        */
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