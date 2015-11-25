//Bubblechart.js
//Created by Tony Niven: 11/22/15

function ActivitiesVis(_parentPane,_defaultData,_eventHandler)
{
    var self = this;

    self.parentPane = _parentPane;
    self.currentData = _defaultData;
    self.defaultPark = "Arches_NP";
    self.currentPark = self.defaultPark;
    self.displayData = null;
    self.nodeGroup = "bubbleNodes";

    self.initVis();
}

//Example version of this code is from: http://bl.ocks.org/mbostock/4063269
ActivitiesVis.prototype.drawVis = function(dataDraw)
{
    var self = this;


}

//Incoming data is the data you want to show in the vis
ActivitiesVis.prototype.updateVis = function()
{
    var self = this;

    self.displayData = newDisplayData;
    self.drawVis(self.displayData);
}

ActivitiesVis.prototype.initVis = function ()
{
    var self = this;

};

/**
 * Created by Tony on 11/22/2015.
 */
