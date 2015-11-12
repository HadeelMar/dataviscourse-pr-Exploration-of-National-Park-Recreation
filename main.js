parkSelectionMethod = 0;
//globalColorScale;

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
    //console.log(selectionMethod)
    //console.log(mapVis)
    mapVis.updateVis();

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
     //  BubbleVis = new bubbleVis("#bubble");


    }

  /*  function data(error, dataArches, dataBryce, dataCanyon) {

        d3.json("data/Arches_NP.json", function (dataArches) {

            Datapark1 = dataArches;
           console.log(Datapark1);
            console.log(Datapark1.ParkName);
        });

        d3.json("data/Bryce_Canyon_NP.json", function (dataBryce) {

            Datapark2 = dataBryce;

        });

        d3.json("data/Canyonlands_NP.json", function (dataCanyon) {

            Datapark3 = dataCanyon;

        });
        }
        */

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

    loadedfiles();

   // initVis();
    //changeSelectionMethod(parkSelectionMethod);

})();