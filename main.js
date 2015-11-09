parkSelectionMethod = 0;
//globalColorScale;

var mapVis


function changeSelectionMethod(selectionMethod)
{
    parkSelectionMethod = selectionMethod;
    //console.log(selectionMethod)
    
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
    
    initVis();
})();