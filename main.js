/**
 * Created by Mila on 11/4/15.
 */

//test to try having layout for a map, note: this is a temprorary map, we might switch to another map





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
    var marks = d3.select("#parks");

    d3.csv("data/parks.csv", function (error, data) {
        marks.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function (d) {
                return projection([d.lon, d.lat])[1];
            })
            .attr("r", 5)
            .style("fill", "red");


    })
}


d3.json("data/states.json", function (error, usStateData) {
    if (error) throw error;

    draw(usStateData);

});


drawparks();