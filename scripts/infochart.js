/**
 * Created by Mila on 11/8/15.
 */





function InfoVis(_parentElement, dataloaded, _eventHandler) {


        var self = this;
        self.parentElement = _parentElement;
        self.displayData = dataloaded;

        //console.log(self.parentElement);
        //self.parent = parentObject;

        self.initVis();


}

InfoVis.prototype.initVis = function () {

    var self = this;

    var info = d3.select(self.parentElement).selectAll("text").data(self.displayData);
    info.enter()
        .append("text")
        .text(function (d) {
            return d.info;
        })

};