parkSelectionMethod = 0;
//globalColorScale;

var mapVis,
    Datapark1,
    Datapark2,
    Datapark3;


function changeSelectionMethod(selectionMethod)
{
    parkSelectionMethod = selectionMethod;
    //console.log(selectionMethod)
    //console.log(mapVis)
    mapVis.updateVis();
}

(function () {

    // this function can convert Date objects to a string
    // it can also convert strings to Date objects
    // see: https://github.com/mbostock/d3/wiki/Time-Formatting
    var dateFormatter = d3.time.format("%Y-%m-%d");

    // call this function after Data is loaded, reformatted and bound to the variables
    function initVis()
    {
        var  eventHandlers = {};
        
        mapVis = new MapVis("#parks",this);

    }

    function data(error, dataArches, dataBryce, dataCanyon) {

        d3.json("data/Arches_NP.json", function (dataArches) {

            Datapark1 = dataArches;
           console.log(Datapark1);
        });

        d3.json("data/Bryce_Canyon_NP.json", function (dataBryce) {

            Datapark2 = dataBryce;

        });

        d3.json("data/Canyonlands_NP.json", function (dataCanyon) {

            Datapark3 = dataCanyon;

        });





    }
    initVis();
    data();
})();