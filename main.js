parkSelectionMethod = 0;
SelectedYear = 1979;
SelectedMonth = 1;
//globalColorScale;

GetMonthName = function (monthnumber)
{
    return "January";
}

var mapVis,
    barVis,
    infoVis,
    BubbleVis,
    allData,
    usStateData,
    dataloaded ;

function changeSelectionMethod(selectionMethod)
{
    parkSelectionMethod = selectionMethod;
    updateChildViews();
}

function changeSelectedYear(_selectedYear)
{
    SelectedYear = _selectedYear;
    updateChildViews();
}

function changeSelectedMonth(_selectedMonth)
{
    SelectedMonth = _selectedMonth;
    updateChildViews();
}

function updateChildViews()
{
    mapVis.updateVis();
    BubbleVis.updateVis();
}

(function () {
    allData = [];

    // this function can convert Date objects to a string
    // it can also convert strings to Date objects
    // see: https://github.com/mbostock/d3/wiki/Time-Formatting
    //var dateFormatter = d3.time.format("%Y-%m-%d");

    // call this function after Data is loaded, reformatted and bound to the variables
    function initVis()
    {
        var  eventHandlers = {};
        

        mapVis = new MapVis("#parks", usStateData,dataloaded);
       // console.log(dataloaded);
        mapVis.updateVis();

// initiate the other charts
       barVis = new bARVis("#barVis",allData);



      // infoVis = new InfoVis("#information");
        BubbleVis = new BubbleVis("#bubble",allData);


    }


        function analyze(error, Arches_NP,Bryce_Canyon_NP,Canyonlands_NP,Capitol_Reef_NP,Cedar_Breaks_NM,
                         Glen_Canyon_NRA,Golden_Spike_NHS,Hovenweep_NM ,Natural_Bridges_NM,Rainbow_Bridge_NM
        ,Timpanogos_Cave_NM,Zion_NP,states,parks) {

            if (!error) {
                // make our data look nicer and more useful:
                //console.log(Arches_NP);
                allData.push(Arches_NP,Bryce_Canyon_NP,Canyonlands_NP,Capitol_Reef_NP,Cedar_Breaks_NM,
                    Glen_Canyon_NRA,Golden_Spike_NHS,Hovenweep_NM ,Natural_Bridges_NM,Rainbow_Bridge_NM
                    ,Timpanogos_Cave_NM,Zion_NP);
                
                usStateData = states;
               // console.log(usStateData);
                dataloaded = parks;
                //console.log(dataloaded);
               // console.log(allData);
                initVis();
            }
        }

        function loadedfiles() {

            queue()
                .defer(d3.json, 'data/Arches_NP.json')
                .defer(d3.json, 'data/Bryce_Canyon_NP.json')
                .defer(d3.json, 'data/Canyonlands_NP.json')
                .defer(d3.json, 'data/Capitol_Reef_NP.json')
                .defer(d3.json, 'data/Cedar_Breaks_NM.json')
                .defer(d3.json, 'data/Glen_Canyon_NRA.json')
                .defer(d3.json, 'data/Golden_Spike_NHS.json')
                .defer(d3.json, 'data/Hovenweep_NM.json')
                .defer(d3.json, 'data/Natural_Bridges_NM.json')
                .defer(d3.json, 'data/Rainbow_Bridge_NM.json')
                .defer(d3.json, 'data/Timpanogos_Cave_NM.json')
                .defer(d3.json, 'data/Zion_NP.json')
                .defer(d3.json, 'data/states.json')
                .defer(d3.csv,  'data/parks.csv')
                .await(analyze);

        }


    //d3.select('#yearslider').call(d3.slider().scale(d3.time.scale().domain([1979, 2012])).axis(d3.svg.axis()).snap(true).value(new Date(2000,1,1)));
    d3.select('#yearslider').call(d3.slider().axis(true).min(2000).max(2100).step(5));

    /*
    d3.select('#redSlider').call(d3.slider().on("slide", function(evt, value)
    {
        var redPeak = value;
        d3.select('#redSliderText').text(redPeak);
        //updateTransferFunction();
        //drawRedColorPeak(redChannel());
    }));
    */

    /*
    d3.slider()
    d3.select('#yearslider').call(
        d3.slider()
            .axis(true)
            .min(2000)
            .max(2012).step(1)
            .on("slide", function(evt, value)
            {
                var yearSelected = value;
                d3.select('#yearsliderText').text(yearSelected);

            }));*/



    loadedfiles();

   // initVis();
    //changeSelectionMethod(parkSelectionMethod);

})();