parkSelectionMethod = 0;
SelectedYear = 1979;
SelectedMonth = 1;
SelectedParks = ["Arches National Park"];
ParkSelectionByName = {

    "Acadia National Park":"Acadia_NP",
    "Arches National Park":"Arches_NP",
    "Badlands National Park":"Badlands_NP",
    "Big Bend National Park":"Big_Bend_NP",
    "Biscayne National Park":"Biscayne_NP",
    "Black Canyon of the Gunnison":"Black_Canyon_of_the_Gunnison_NP",
    "Bryce Canyon National Park Utah":"Bryce_Canyon_NP",
    "Canyonlands National Park Utah":"Canyonlands_NP",
    "Capitol Reef National Park Utah":"Capitol_Reef_NP",
    "Carlsbad Caverns":"Carlsbad_Caverns_NP",
    "Channel Islands":"Channel_Islands_NP",
    "Congaree":"Congaree_NP",
    "Crater Lake":"Crater_Lake_NP",
    "Cuyahoga Valley":"Cuyahoga_Valley_NP",
    "Death Valley":"Death_Valley_NP",
    "Denali":"Denali_NP_AND_PRES",
    "Dry Tortugas":"Dry_Tortugas_NP",
    "Everglades":"Everglades_NP",
    "Gates of the Arctic":"Gates_of_the_Arctic_NP_AND_PREP",
    "Glacier":"Glacier_Bay_NP_AND_PREP",
    "Glacier Bay":"Glacier_NP",
    "Grand Canyon National Park Arizona":"Grand_Canyon_NP",
    "Grand Teton":"Grand_Teton_NP",
    "Great Basin":"Great_Basin_NP",
    "Great Sand Dunes":"Great_Sand_Dunes_NP_AND_PREP",
    "Great Smoky Mountains":"Great_Smoky_Mountains_NP",
    "Guadalupe Mountains":"Guadalupe_Mountains_NP",
    "Haleakal?":"Haleakala_NP",
    "Hawaii Volcanoes":"Hawaii_Volcanoes_NP",
    "Hot Springs":"Hot_Springs_NP",
    "Isle Royale":"Isle_Royale_NP",
    "Joshua Tree":"Joshua_Tree_NP",
    "Katmai":"Katmai_NP_AND_PREP",
    "Kenai Fjords":"Kenai_Fjords_NP",
    "Kings Canyon":"Kings_Canyon_NP",
    "Kobuk Valley":"Kobuk_Valley_NP",
    "Lake Clark":"Lake_Clark_NP_AND_PREP",
    "Lassen Volcanic":"Lassen_Volcanic_NP",
    "Mammoth Cave":"Mammoth_Cave_NP",
    "Mesa Verde":"Mesa_Verde_NP",
    "Mount Rainier":"Mount_Rainier_NP",
    "North Cascades":"North_Cascades_NP",
    "Olympic":"Olympic_NP",
    "Petrified Forest":"Petrified_Forest_NP",
    "Pinnacles":"Pinnacles_NP",
    "Redwood":"Redwood_NP",
    "Rocky Mountain":"Rocky_Mountain_NP",
    "Saguaro":"Saguaro_NP",
    "Shenandoah":"Shenandoah_NP",
    "Theodore Roosevelt":"Theodore_Roosevelt_NP",
    "Voyageurs":"Voyageurs_NP",
    "Wind Cave":"Wind_Cave_NP",
    "WrangellSt. Elias":"Wrangell_St_Elias_NP_AND_PREP",
    "Yellowstone":"Yellowstone_NP",
    "Yosemite":"Yosemite_NP",
    "Zion National Park Utah":"Zion_NP",
};

NameSelectionByCode =
{
    "Acadia_NP":"Acadia National Park",
    "Arches_NP":"Arches National Park",
    "Badlands_NP":"Badlands National Park",
    "Big_Bend_NP":"Big Bend National Park",
    "Biscayne_NP":"Biscayne National Park",
    "Black_Canyon_of_the_Gunnison_NP":"Black Canyon of the Gunnison",
    "Bryce_Canyon_NP":"Bryce Canyon National Park Utah",
    "Canyonlands_NP":"Canyonlands National Park Utah",
    "Capitol_Reef_NP":"Capitol Reef National Park Utah",
    "Carlsbad_Caverns_NP":"Carlsbad Caverns",
    "Channel_Islands_NP":"Channel Islands",
    "Congaree_NP":"Congaree",
    "Crater_Lake_NP":"Crater Lake",
    "Cuyahoga_Valley_NP":"Cuyahoga Valley",
    "Death_Valley_NP":"Death Valley",
    "Denali_NP_AND_PRES":"Denali",
    "Dry_Tortugas_NP":"Dry Tortugas",
    "Everglades_NP":"Everglades",
    "Gates_of_the_Arctic_NP_AND_PREP":"Gates of the Arctic",
    "Glacier_Bay_NP_AND_PREP":"Glacier",
    "Glacier_NP":"Glacier Bay",
    "Grand_Canyon_NP":"Grand Canyon National Park Arizona",
    "Grand_Teton_NP":"Grand Teton",
    "Great_Basin_NP":"Great Basin",
    "Great_Sand_Dunes_NP_AND_PREP":"Great Sand Dunes",
    "Great_Smoky_Mountains_NP":"Great Smoky Mountains",
    "Guadalupe_Mountains_NP":"Guadalupe Mountains",
    "Haleakala_NP":"Haleakal?",
    "Hawaii_Volcanoes_NP":"Hawaii Volcanoes",
    "Hot_Springs_NP":"Hot Springs",
    "Isle_Royale_NP":"Isle Royale",
    "Joshua_Tree_NP":"Joshua Tree",
    "Katmai_NP_AND_PREP":"Katmai",
    "Kenai_Fjords_NP":"Kenai Fjords",
    "Kings_Canyon_NP":"Kings Canyon",
    "Kobuk_Valley_NP":"Kobuk Valley",
    "Lake_Clark_NP_AND_PREP":"Lake Clark",
    "Lassen_Volcanic_NP":"Lassen Volcanic",
    "Mammoth_Cave_NP":"Mammoth Cave",
    "Mesa_Verde_NP":"Mesa Verde",
    "Mount_Rainier_NP":"Mount Rainier",
    "North_Cascades_NP":"North Cascades",
    "Olympic_NP":"Olympic",
    "Petrified_Forest_NP":"Petrified Forest",
    "Pinnacles_NP":"Pinnacles",
    "Redwood_NP":"Redwood",
    "Rocky_Mountain_NP":"Rocky Mountain",
    "Saguaro_NP":"Saguaro",
    "Shenandoah_NP":"Shenandoah",
    "Theodore_Roosevelt_NP":"Theodore Roosevelt",
    "Voyageurs_NP":"Voyageurs",
    "Wind_Cave_NP":"Wind Cave",
    "Wrangell_St_Elias_NP_AND_PREP":"WrangellSt. Elias",
    "Yellowstone_NP":"Yellowstone",
    "Yosemite_NP":"Yosemite",
    "Zion_NP":"Zion National Park Utah",

};
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
    barVis.updateVis();
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

        var mapSelectionChanged = function () { updateChildViews(); };

        mapVis = new MapVis("#parks", usStateData,dataloaded,mapSelectionChanged);
       // console.log(dataloaded);
        mapVis.updateVis();

// initiate the other charts
        barVis = new barVis("#barVis",allData,eventHandlers);

      // infoVis = new InfoVis("#information");
        BubbleVis = new BubbleVis("#bubble",allData,eventHandlers);




    }


        function analyze(error,states,parks,
                        Acadia_NP,
                        Arches_NP,
                        Badlands_NP,
                        Big_Bend_NP,
                        Biscayne_NP,
                        Black_Canyon_of_the_Gunnison_NP,
                        Bryce_Canyon_NP,
                        Canyonlands_NP,
                        Capitol_Reef_NP,
                        Carlsbad_Caverns_NP,
                        Channel_Islands_NP,
                        Congaree_NP,
                        Crater_Lake_NP,
                        Cuyahoga_Valley_NP,
                        Death_Valley_NP,
                        Denali_NP_AND_PRES,
                        Dry_Tortugas_NP,
                        Everglades_NP,
                        Gates_of_the_Arctic_NP_AND_PREP,
                        Glacier_Bay_NP_AND_PREP,
                        Glacier_NP,
                        Grand_Canyon_NP,
                        Grand_Teton_NP,
                        Great_Basin_NP,
                        Great_Sand_Dunes_NP_AND_PREP,
                        Great_Smoky_Mountains_NP,
                        Guadalupe_Mountains_NP,
                        Haleakala_NP,
                        Hawaii_Volcanoes_NP,
                        Hot_Springs_NP,
                        Isle_Royale_NP,
                        Joshua_Tree_NP,
                        Katmai_NP_AND_PREP,
                        Kenai_Fjords_NP,
                        Kings_Canyon_NP,
                        Kobuk_Valley_NP,
                        Lake_Clark_NP_AND_PREP,
                        Lassen_Volcanic_NP,
                        Mammoth_Cave_NP,
                        Mesa_Verde_NP,
                        Mount_Rainier_NP,
                        North_Cascades_NP,
                        Olympic_NP,
                        Petrified_Forest_NP,
                        Pinnacles_NP,
                        Redwood_NP,
                        Rocky_Mountain_NP,
                        Saguaro_NP,
                        Shenandoah_NP,
                        Theodore_Roosevelt_NP,
                        Voyageurs_NP,
                        Wind_Cave_NP,
                        Wrangell_St_Elias_NP_AND_PREP,
                        Yellowstone_NP,
                        Yosemite_NP,
                        Zion_NP
    ) {

            if (!error) {
                // make our data look nicer and more useful:
                //console.log(Arches_NP);
                allData.push(
                    Acadia_NP,
                    Arches_NP,
                    Badlands_NP,
                    Big_Bend_NP,
                    Biscayne_NP,
                    Black_Canyon_of_the_Gunnison_NP,
                    Bryce_Canyon_NP,
                    Canyonlands_NP,
                    Capitol_Reef_NP,
                    Carlsbad_Caverns_NP,
                    Channel_Islands_NP,
                    Congaree_NP,
                    Crater_Lake_NP,
                    Cuyahoga_Valley_NP,
                    Death_Valley_NP,
                    Denali_NP_AND_PRES,
                    Dry_Tortugas_NP,
                    Everglades_NP,
                    Gates_of_the_Arctic_NP_AND_PREP,
                    Glacier_Bay_NP_AND_PREP,
                    Glacier_NP,
                    Grand_Canyon_NP,
                    Grand_Teton_NP,
                    Great_Basin_NP,
                    Great_Sand_Dunes_NP_AND_PREP,
                    Great_Smoky_Mountains_NP,
                    Guadalupe_Mountains_NP,
                    Haleakala_NP,
                    Hawaii_Volcanoes_NP,
                    Hot_Springs_NP,
                    Isle_Royale_NP,
                    Joshua_Tree_NP,
                    Katmai_NP_AND_PREP,
                    Kenai_Fjords_NP,
                    Kings_Canyon_NP,
                    Kobuk_Valley_NP,
                    Lake_Clark_NP_AND_PREP,
                    Lassen_Volcanic_NP,
                    Mammoth_Cave_NP,
                    Mesa_Verde_NP,
                    Mount_Rainier_NP,
                    North_Cascades_NP,
                    Olympic_NP,
                    Petrified_Forest_NP,
                    Pinnacles_NP,
                    Redwood_NP,
                    Rocky_Mountain_NP,
                    Saguaro_NP,
                    Shenandoah_NP,
                    Theodore_Roosevelt_NP,
                    Voyageurs_NP,
                    Wind_Cave_NP,
                    Wrangell_St_Elias_NP_AND_PREP,
                    Yellowstone_NP,
                    Yosemite_NP,
                    Zion_NP
                );

                //console.log(allData);

                /*
                /////////////////////////////////////////////
                //////Check for yearly data presence
                for (i = 0 ; i < allData.length; i++)
                {
                        if(!("YearlyData" in allData[i]))
                        {
                            console.log("Missing Yearly for: " + " ["+ i +"] " + allData[i]["ParkName"]);
                        }
                }

                defectCount = 0;
                for (i = 0 ; i < allData.length; i++)
                {
                    defect = false;
                    for (year = 1919; year < 2015; year++)
                    {
                        try
                        {
                            if(!(year.toString() in allData[i]["YearlyData"])) {
                                allData[i]["YearlyData"] = "0";
                            }
                        }
                        catch(err)
                        {

                            defect = true
                        }
                    }
                    if(defect) {
                        console.log("Parse Error for year on " + " ["+ i +"] " + allData[i]["ParkName"]);
                        defectCount++;
                    }
                    else
                        console.log("No error in park" + " ["+ i +"] " + allData[i]["ParkName"]);
                }
                console.log("Total Defects: "+defectCount );

                 */
                usStateData = states;
                dataloaded = parks;

                /*
                for(i = 0; i < dataloaded.length; i++)
                {
                    console.log(dataloaded[i]["name"])
                }*/

                initVis();

            }
        }

    /*
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
                for(i = 0; i < dataloaded.length; i++)
                {
                    console.log(dataloaded[i]["name"])
                }
               // console.log(allData);
                initVis();
            }
        }*/

        function loadedfiles() {

            queue()
                .defer(d3.json, 'data/states.json')
                .defer(d3.csv, 'data/parks.csv')

                .defer(d3.json, 'data/Acadia_NP.json')
                .defer(d3.json, 'data/Arches_NP.json')
                .defer(d3.json, 'data/Badlands_NP.json')
                .defer(d3.json, 'data/Big_Bend_NP.json')
                .defer(d3.json, 'data/Biscayne_NP.json')
                .defer(d3.json, 'data/Black_Canyon_of_the_Gunnison_NP.json')
                .defer(d3.json, 'data/Bryce_Canyon_NP.json')
                .defer(d3.json, 'data/Canyonlands_NP.json')
                .defer(d3.json, 'data/Capitol_Reef_NP.json')
                .defer(d3.json, 'data/Carlsbad_Caverns_NP.json')
                .defer(d3.json, 'data/Channel_Islands_NP.json')
                .defer(d3.json, 'data/Congaree_NP.json')
                .defer(d3.json, 'data/Crater_Lake_NP.json')
                .defer(d3.json, 'data/Cuyahoga_Valley_NP.json')
                .defer(d3.json, 'data/Death_Valley_NP.json')
                .defer(d3.json, 'data/Denali_NP_&_PRES.json')
                .defer(d3.json, 'data/Dry_Tortugas_NP.json')
                .defer(d3.json, 'data/Everglades_NP.json')
                .defer(d3.json, 'data/Gates_of_the_Arctic_NP_&_PRES.json')
                .defer(d3.json, 'data/Glacier_Bay_NP_&_PRES.json')
                .defer(d3.json, 'data/Glacier_NP.json')
                .defer(d3.json, 'data/Grand_Canyon_NP.json')
                .defer(d3.json, 'data/Grand_Teton_NP.json')
                .defer(d3.json, 'data/Great_Basin_NP.json')
                .defer(d3.json, 'data/Great_Sand_Dunes_NP_&_PRES.json')
                .defer(d3.json, 'data/Great_Smoky_Mountains_NP.json')
                .defer(d3.json, 'data/Guadalupe_Mountains_NP.json')
                .defer(d3.json, 'data/Haleakala_NP.json')
                .defer(d3.json, 'data/Hawaii_Volcanoes_NP.json')
                .defer(d3.json, 'data/Hot_Springs_NP.json')
                .defer(d3.json, 'data/Isle_Royale_NP.json')
                .defer(d3.json, 'data/Joshua_Tree_NP.json')
                .defer(d3.json, 'data/Katmai_NP_&_PRES.json')
                .defer(d3.json, 'data/Kenai_Fjords_NP.json')
                .defer(d3.json, 'data/Kings_Canyon_NP.json')
                .defer(d3.json, 'data/Kobuk_Valley_NP.json')
                .defer(d3.json, 'data/Lake_Clark_NP_&_PRES.json')
                .defer(d3.json, 'data/Lassen_Volcanic_NP.json')
                .defer(d3.json, 'data/Mammoth_Cave_NP.json')
                .defer(d3.json, 'data/Mesa_Verde_NP.json')
                .defer(d3.json, 'data/Mount_Rainier_NP.json')
                .defer(d3.json, 'data/North_Cascades_NP.json')
                .defer(d3.json, 'data/Olympic_NP.json')
                .defer(d3.json, 'data/Petrified_Forest_NP.json')
                .defer(d3.json, 'data/Pinnacles_NP.json')
                .defer(d3.json, 'data/Redwood_NP.json')
                .defer(d3.json, 'data/Rocky_Mountain_NP.json')
                .defer(d3.json, 'data/Saguaro_NP.json')
                .defer(d3.json, 'data/Shenandoah_NP.json')
                .defer(d3.json, 'data/Theodore_Roosevelt_NP.json')
                .defer(d3.json, 'data/Voyageurs_NP.json')
                .defer(d3.json, 'data/Wind_Cave_NP.json')
                .defer(d3.json, 'data/Wrangell-St._Elias_NP_&_PRES.json')
                .defer(d3.json, 'data/Yellowstone_NP.json')
                .defer(d3.json, 'data/Yosemite_NP.json')
                .defer(d3.json, 'data/Zion_NP.json')


                .await(analyze);

        }


    //d3.select('#yearslider').call(d3.slider().scale(d3.time.scale().domain([1979, 2012])).axis(d3.svg.axis()).snap(true).value(new Date(2000,1,1)));
    d3.select('#yearslider').call(
        d3.slider()
            .axis(true)
            .min(1979)
            .max(2012).step(1)
            .on("slide", function(evt, value)
            {
                var yearSelected = value;
                changeSelectedYear(value)
                d3.select('#yearsliderText').text(value);

            }));

    loadedfiles();

})();