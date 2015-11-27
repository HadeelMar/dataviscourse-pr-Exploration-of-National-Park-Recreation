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

    var info = d3.select(self.self.parentElement);
    console.log("lelo")

    rect = info.append('rect').transition().duration(500)
        .attr('width', 150)
        .attr('height', 100)
        .attr('x', 40)
        .attr('y', 100)
        .style('fill', 'none')
        .attr('stroke', 'black');
    text = info.append('foreignObject')
        .attr('x', 50)
        .attr('y', 130)
        .attr('width', 150)
        .attr('height', 100)
        .append("xhtml:body")
        .html('<div style="width: 150px;">This is some information about whatever</div>');

};