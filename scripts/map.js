//test to try having layout for a map, note: this is a temprorary map, we might switch to another map
var datalocation,
    colorScale;  // to do later




function draw(usStateData) {

    var projection = d3.geo.albersUsa();
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#draw")
        .datum(topojson.feature(usStateData, usStateData.objects.states))
        .attr("d", path);


}

function drawparks() {
    // here we should draw the nodes for the parks
// TODO- Done


    var projection = d3.geo.albersUsa();
    var marks = d3.select("#parks").selectAll("circle")
        .data(datalocation);
    marks.enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", function (d) {


            return Math.sqrt(parseInt(d.land) * 0.02)
        })

        .style("fill", "red");
    // .on('mouseover', Hover)
    //    .on('mouseout', clear)
    //    .on("click", select);


    var choice1 = d3.select("#choice2").on("click", function (d, i) {
        var circles = d3.selectAll("circle")[0];
        circles.forEach(function (d) {
            var r = d3.select(d).datalocation()[0].Facebook;
            var calcul_r = Math.sqrt(parseInt(choice1) * 0.5);

            d3.select(d).attr("r", calcul_r);

        });

    })

}


function addinfo()  {

    var info = d3.select("#text").selectAll("text")
        .data(datalocation);
         info.enter()
        .append("text")
        .text(function(d) { return d.info;})

}


d3.json("data/states.json", function (error, usStateData) {
    if (error) throw error;

    draw(usStateData);

});

d3.csv("data/parks.csv", function (dataloaded) {

    datalocation=dataloaded;
    drawparks();
    addinfo();
});