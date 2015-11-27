var colorScale,newNode;
resetmode = 0;
parkSelectionMethod = 0;
SelectedYear = 2011;
SelectedMonth = 1;
MonthMode = 0;
ActivitiesPark = "Arches_NP";
SelectedActitiy = "";


SelectedParks = ["Acadia National Park", "Arches National Park", "Badlands National Park",
    "Big Bend National Park", "Biscayne National Park", "Black Canyon of the Gunnison", "Bryce Canyon National Park Utah",
    "Canyonlands National Park Utah", "Capitol Reef National Park Utah", "Carlsbad Caverns", "Channel Islands",
    "Congaree", "Crater Lake", "Cuyahoga Valley",
    "Death Valley",
    "Denali",
    "Dry Tortugas",
    "Everglades",
    "Gates of the Arctic",
    "Glacier",
    "Glacier Bay",
    "Grand Canyon National Park Arizona",
    "Grand Teton",
    "Great Basin",
    "Great Sand Dunes",
    "Great Smoky Mountains",
    "Guadalupe Mountains",
    "Haleakala",
    "Hawaii Volcanoes",
    "Hot Springs",
    "Isle Royale",
    "Joshua Tree",
    "Katmai",
    "Kenai Fjords",
    "Kings Canyon",
    "Kobuk Valley",
    "Lake Clark",
    "Lassen Volcanic",
    "Mammoth Cave",
    "Mesa Verde",
    "Mount Rainier",
    "North Cascades",
    "Olympic",
    "Petrified Forest",
    "Pinnacles",
    "Redwood",
    "Rocky Mountain",
    "Saguaro",
    "Shenandoah",
    "Theodore Roosevelt",
    "Voyageurs",
    "Wind Cave",
    "WrangellSt. Elias",
    "Yellowstone",
    "Yosemite",
    "Zion National Park Utah"];


MonthsByNumber = {
    1:"January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
}

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
    "Denali":"Denali_NP_&_PRES",
    "Dry Tortugas":"Dry_Tortugas_NP",
    "Everglades":"Everglades_NP",
    "Gates of the Arctic":"Gates_of_the_Arctic_NP_&_PRES",
    "Glacier":"Glacier_Bay_NP_&_PRES",
    "Glacier Bay":"Glacier_NP",
    "Grand Canyon National Park Arizona":"Grand_Canyon_NP",
    "Grand Teton":"Grand_Teton_NP",
    "Great Basin":"Great_Basin_NP",
    "Great Sand Dunes":"Great_Sand_Dunes_NP_&_PRES",
    "Great Smoky Mountains":"Great_Smoky_Mountains_NP",
    "Guadalupe Mountains":"Guadalupe_Mountains_NP",
    "Haleakala":"Haleakala_NP",
    "Hawaii Volcanoes":"Hawaii_Volcanoes_NP",
    "Hot Springs":"Hot_Springs_NP",
    "Isle Royale":"Isle_Royale_NP",
    "Joshua Tree":"Joshua_Tree_NP",
    "Katmai":"Katmai_NP_&_PRES",
    "Kenai Fjords":"Kenai_Fjords_NP",
    "Kings Canyon":"Kings_Canyon_NP",
    "Kobuk Valley":"Kobuk_Valley_NP",
    "Lake Clark":"Lake_Clark_NP_&_PRES",
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
    "WrangellSt. Elias":"Wrangell-St._Elias_NP_&_PRES",
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
    "Denali_NP_&_PRES":"Denali",
    "Dry_Tortugas_NP":"Dry Tortugas",
    "Everglades_NP":"Everglades",
    "Gates_of_the_Arctic_NP_&_PRES":"Gates of the Arctic",
    "Glacier_Bay_NP_&_PRES":"Glacier",
    "Glacier_NP":"Glacier Bay",
    "Grand_Canyon_NP":"Grand Canyon National Park Arizona",
    "Grand_Teton_NP":"Grand Teton",
    "Great_Basin_NP":"Great Basin",
    "Great_Sand_Dunes_NP_&_PRES":"Great Sand Dunes",
    "Great_Smoky_Mountains_NP":"Great Smoky Mountains",
    "Guadalupe_Mountains_NP":"Guadalupe Mountains",
    "Haleakala_NP":"Haleakala",
    "Hawaii_Volcanoes_NP":"Hawaii Volcanoes",
    "Hot_Springs_NP":"Hot Springs",
    "Isle_Royale_NP":"Isle Royale",
    "Joshua_Tree_NP":"Joshua Tree",
    "Katmai_NP_&_PRES":"Katmai",
    "Kenai_Fjords_NP":"Kenai Fjords",
    "Kings_Canyon_NP":"Kings Canyon",
    "Kobuk_Valley_NP":"Kobuk Valley",
    "Lake_Clark_NP_&_PRES":"Lake Clark",
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
    "Wrangell-St._Elias_NP_&_PRES":"WrangellSt. Elias",
    "Yellowstone_NP":"Yellowstone",
    "Yosemite_NP":"Yosemite",
    "Zion_NP":"Zion National Park Utah",

};

IndexSelectionByCode =
{
    "Acadia_NP":0,
    "Arches_NP":1,
    "Badlands_NP":2,
    "Big_Bend_NP":3,
    "Biscayne_NP":4,
    "Black_Canyon_of_the_Gunnison_NP":5,
    "Bryce_Canyon_NP":6,
    "Canyonlands_NP":7,
    "Capitol_Reef_NP":8,
    "Carlsbad_Caverns_NP":9,
    "Channel_Islands_NP":10,
    "Congaree_NP":11,
    "Crater_Lake_NP":12,
    "Cuyahoga_Valley_NP":13,
    "Death_Valley_NP":14,
    "Denali_NP_&_PRES":15,
    "Dry_Tortugas_NP":16,
    "Everglades_NP":17,
    "Gates_of_the_Arctic_NP_&_PRES":18,
    "Glacier_Bay_NP_&_PRES":19,
    "Glacier_NP":20,
    "Grand_Canyon_NP":21,
    "Grand_Teton_NP":22,
    "Great_Basin_NP":23,
    "Great_Sand_Dunes_NP_&_PRES":24,
    "Great_Smoky_Mountains_NP":25,
    "Guadalupe_Mountains_NP":26,
    "Haleakala_NP":27,
    "Hawaii_Volcanoes_NP":28,
    "Hot_Springs_NP":29,
    "Isle_Royale_NP":30,
    "Joshua_Tree_NP":31,
    "Katmai_NP_&_PRES":32,
    "Kenai_Fjords_NP":33,
    "Kings_Canyon_NP":34,
    "Kobuk_Valley_NP":35,
    "Lake_Clark_NP_&_PRES":36,
    "Lassen_Volcanic_NP":37,
    "Mammoth_Cave_NP":38,
    "Mesa_Verde_NP":39,
    "Mount_Rainier_NP":40,
    "North_Cascades_NP":41,
    "Olympic_NP":42,
    "Petrified_Forest_NP":43,
    "Pinnacles_NP":44,
    "Redwood_NP":45,
    "Rocky_Mountain_NP":46,
    "Saguaro_NP":47,
    "Shenandoah_NP":48,
    "Theodore_Roosevelt_NP":49,
    "Voyageurs_NP":50,
    "Wind_Cave_NP":51,
    "Wrangell-St._Elias_NP_&_PRES":52,
    "Yellowstone_NP":53,
    "Yosemite_NP":54,
    "Zion_NP":55,
};

FriendlyActivitiyNames =
{
    "NonRecreationVisitors":"Non-Recreation Visitors",
    "ConcessionLodging":"Concession Lodging",
    "TentCampers":"Tent Campers",
    "RVCampers":"RV Campers",
    "ConcessionCamping":"Concession Camping",
    "BackcountryCampers":"Backcountry Campers",
    "MiscCampers":"Misc. Campers",
    "OvernightStays":"Total Overnight Stays",
}

FriendlyActivitiyBlurbs =
{
    "NonRecreationVisitors":"Visitors who came for non recreational purposes such as official visits etc.",
    "ConcessionLodging":"Some venues feature on site lodging services for visitors to use. This is the count of such visitors",
    "TentCampers":"Some parks support camping in a tent at designated tent camping grounds. <p> This is the number of people who camped at the park's tent campground in the given month",
    "RVCampers":"Some national parks allow visitors to bring a mobile home or trailer to the park and stay at an RV campground. <p> This is a count of such visitors.",
    "ConcessionCamping":"The National Park Service classifies some camping as concession camping. <p> This is the count of such camping that occurs in a park",
    "BackcountryCampers":"Some campers want to get out of tent camp grounds and into the real wilderness, though not all parks allow this. <p> For those that do, this will be a count of such people.",
    "MiscCampers":"Camping that does not fit into the other categories is counted here by the National Park Service.",
    "OvernightStays":"The other activity types count toward the 'Total Overnight Stay' count. <p> However, if one is interested in simply knowing how many people are staying overnight at a given park, this is the activity to consult.",
}


ActivityByIndex =
{
    0:"NonRecreationVisitors",
    1:"ConcessionLodging",
    2:"TentCampers",
    3:"RVCampers",
    4:"ConcessionCamping",
    5:"BackcountryCampers",
    6:"MiscCampers",
    7:"OvernightStays",
}

IndexByActivity =
{
    "NonRecreationVisitors":0,
    "ConcessionLodging":1,
    "TentCampers":2,
    "RVCampers":3,
    "ConcessionCamping":4,
    "BackcountryCampers":5,
    "MiscCampers":6,
    "OvernightStays":7,
}
//globalColorScale;

var mapVis,
    barVis,
    listVis,
    infoVis,
    BubbleVis,
    ActivitiesVis,
    allData,
    usStateData,
    dataloaded ;


function reset(selection)
{
    resetmode = selection;

    if (resetmode == 0) {
        SelectedParks = ["Acadia National Park", "Arches National Park", "Badlands National Park",
            "Big Bend National Park", "Biscayne National Park", "Black Canyon of the Gunnison", "Bryce Canyon National Park Utah",
            "Canyonlands National Park Utah", "Capitol Reef National Park Utah", "Carlsbad Caverns", "Channel Islands",
            "Congaree", "Crater Lake", "Cuyahoga Valley",
            "Death Valley",
            "Denali",
            "Dry Tortugas",
            "Everglades",
            "Gates of the Arctic",
            "Glacier",
            "Glacier Bay",
            "Grand Canyon National Park Arizona",
            "Grand Teton",
            "Great Basin",
            "Great Sand Dunes",
            "Great Smoky Mountains",
            "Guadalupe Mountains",
            "Haleakala",
            "Hawaii Volcanoes",
            "Hot Springs",
            "Isle Royale",
            "Joshua Tree",
            "Katmai",
            "Kenai Fjords",
            "Kings Canyon",
            "Kobuk Valley",
            "Lake Clark",
            "Lassen Volcanic",
            "Mammoth Cave",
            "Mesa Verde",
            "Mount Rainier",
            "North Cascades",
            "Olympic",
            "Petrified Forest",
            "Pinnacles",
            "Redwood",
            "Rocky Mountain",
            "Saguaro",
            "Shenandoah",
            "Theodore Roosevelt",
            "Voyageurs",
            "Wind Cave",
            "WrangellSt. Elias",
            "Yellowstone",
            "Yosemite",
            "Zion National Park Utah"]
    }

    else if (resetmode == 1) {
        SelectedParks = ["Arches National Park"];
        ActivitiesPark = "Arches_NP";


    }
    resetSelectedAttribute();
    updateChildViews();
}

function resetSelectedAttribute()
{
    //console.log(SelectedParks);
    var nodes = d3.select("#parks").selectAll("circle");

    nodes.attr("selected",function(d,i){ if(SelectedParks.indexOf(d.name) > -1 ) return "true"; else return "false";})
}


function changeSelectionMethod(selectionMethod)
{
    parkSelectionMethod = selectionMethod;
    d3.select("#selectionModeText").html(function(){
        if (parkSelectionMethod == 0)
            return "<b>Currently Mode:</b> Land Area";
        else if (parkSelectionMethod == 1)
            return "<b>Currently Mode:</b> Facebook Likes";
        else if (parkSelectionMethod == 2)
            return "<b>Currently Mode:</b> Google Reviews";
        else if (parkSelectionMethod == 3)
            return "<b>Currently Mode:</b> Annual Visits";
        else if (parkSelectionMethod == 4)
            return "<b>Currently Mode:</b> Equal Size";
    })
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
    changeSelectionMode(1,true);
}

function changeSelectionMode(_selectionMode,_called)
{
    MonthMode = _selectionMode;
    if(MonthMode == 1)
    {
        d3.select('#monthSelectedText').html("<b>Selected Month:</b>");
        d3.select('#monthSelectedNum').text(MonthsByNumber[SelectedMonth]);
    }
    else
    {
        d3.select('#monthSelectedText').html("");
        d3.select('#monthSelectedNum').text("");
    }
    updateChildViews();


}

function updateChildViews()
{
    mapVis.updateVis();
    BubbleVis.updateVis();
    barVis.updateVis();
    ActivitiesVis.updateVis();
}

function selectedParkChanged()
{
    BubbleVis.updateVis();
    barVis.updateVis();
    mapVis.updateVis();
    updateActivitiesVis();
}

function updateActivitiesVis()
{
    ActivitiesVis.updateVis();
    updateInfoText();
}

function resetActivities()
{
    SelectedActitiy = "";
    BubbleVis.updateVis();
    updateActivitiesVis();
}

function updateInfoText()
{
    var infobox = d3.select("#info1");


    infobox.html(function ()
        {
            var head = "<h2>Activities Information</h2>";
            var body = "Select an activity from the bubble chart to learn more about it and discover which parks are popular for the given activity. <p> You can see which activity is selected by looking at the chart and by examining the titel of the char. If you want to see bubbles for a different park, click the corresponding bar from the list of parks selected in the park visits graph. <p> For now all data is presented by month</p>";

            if(SelectedActitiy != "")
            {
                head = "<h2>" + FriendlyActivitiyNames[SelectedActitiy] + "</h2>";
                body = FriendlyActivitiyBlurbs[SelectedActitiy];
            }

            return head + "<br>" + body;
        })


    var activitiesCompareTitle1 = d3.select("#activitiesCompareTitle1");
    activitiesCompareTitle1.html(function ()
    {
        var head = "<h2>Activities Comparison</h2>";
        if(SelectedActitiy != "")
        {
            head = "<h2>" + FriendlyActivitiyNames[SelectedActitiy] + " Comparison</h2>";
        }

        return head;
    })

}

(function () {
    allData = [];

    // this function can convert Date objects to a string
    // it can also convert strings to Date objects
    // see: https://github.com/mbostock/d3/wiki/Time-Formatting
    //var dateFormatter = d3.time.format("%Y-%m-%d");

    // call this function after Data is loaded, reformatted and bound to the variables
    function initVis() {
        var eventHandlers = {};

        var mapSelectionChanged = function () {
            queue().defer(updateChildViews);
        };

        var activitySelectionChanged = function () {
            queue().defer(updateActivitiesVis);
        };

        var activitiesParkSelectionChanged = function (_newSelection)
        {
            ActivitiesPark = _newSelection;
            queue().defer(selectedParkChanged)
        }

        mapVis = new MapVis("#parks", usStateData, dataloaded, allData, mapSelectionChanged);
        mapVis.updateVis();

        barVis = new barVis("#barVis", allData, activitiesParkSelectionChanged, mapSelectionChanged,reset);
        BubbleVis = new BubbleVis("#bubble", allData, activitySelectionChanged);
        listVis = new listVis("#title", allData, dataloaded, eventHandlers);
        infoVis = new InfoVis("#information", dataloaded, mapSelectionChanged, eventHandlers);
        ActivitiesVis = new ActivitiesVis("#activityChart",allData,activitiesParkSelectionChanged);

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


                usStateData = states;
                dataloaded = parks;

                initVis();
                updateInfoText();

            }
        }

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

        d3.select('#yearsliderText').text(SelectedYear);

        //d3.select('#yearslider').call(d3.slider().scale(d3.time.scale().domain([1979, 2012])).axis(d3.svg.axis()).snap(true).value(new Date(2000,1,1)));
        d3.select('#yearslider').call(
            d3.slider()
                .axis(true)
                .min(1979)
                .value(SelectedYear)
                .max(2012).step(1)
                .on("slide", function (evt, value) {
                    var yearSelected = value;
                    changeSelectedYear(value)
                    d3.select('#yearsliderText').text(value);

                }));

    loadedfiles();

})();