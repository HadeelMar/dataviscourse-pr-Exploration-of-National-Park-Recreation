/**
 * Created by Mila on 11/4/15.
 */

//test to try having layout for a map, note: this is a temprorary map, we might switch to another map


function updateMap() {
 // here we should draw the nodes for the parks
// TODO

}



function draw(usStateData) {

    var projection = d3.geo.albersUsa();
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#draw")
        .datum(topojson.feature(usStateData, usStateData.objects.states))
        .attr("d", path);


}


d3.json("data/states.json", function (error, usStateData) {
    if (error) throw error;

    draw(usStateData);
});


//updateMap();