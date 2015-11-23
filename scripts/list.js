/*  


 author: Hadeel
 inspired from:
 http://jqueryui.com/selectable/#serialize
 http://stackoverflow.com/questions/3140017/how-to-programmatically-select-selectables-with-jquery-ui
 http://stackoverflow.com/questions/9278227/jquery-array-into-eq-function
 http://stackoverflow.com/questions/7031226/jquery-checkbox-change-and-click-event
 */
function listVis(_parentElement, allData,dataloaded, _eventHandler) {


    var self = this;
    self.parentElement = _parentElement;
    self.displayData = dataloaded;

    //console.log(self.parentElement);
    //self.parent = parentObject;

    self.initVis();

}


listVis.prototype.initVis = function () {
    var self = this;

    var list= d3.select(self.parentPane).append("ol")
        .attr("id", "selectable");



    var li = list.selectAll("li")
        .data(self.displayData)
        .enter()
        .append("li")
        .attr("class", "ui-widget-content")
        .text( function(d) { return d.name} );



        $("#selectable").selectable({
        stop: function() {
            $("#title-selection-input").show(30);
            $("#select-all").prop("checked", false);

            var filteredList = [];
            $( ".ui-selected", this ).each(function() {
                var index = $( "#selectable li" ).index( this );
                filteredList.push(self.displayData[index]);
            });

            if (shouldParse == true) {
                parse(filteredList);
            }
            shouldParse = true;
        }
    });
    self.highlightList(["all"]);

    // set initial checkbox to checked
    $("#select-all").prop("checked", true);
}

/* Accepts an array of indices, "all" or "none" */
listVis.prototype.highlightList= function (indices) {

    var self = this;

    if(indices == "all") {
        self.performHighlightList($("#selectable"), $("li"));
    }
    else {
        var elements = $("#selectable li").filter(function() {
            return indices.indexOf($(this).index()) > -1;
        });

        self.performHighlightList($("#selectable"), elements);
    }
};
listVis.prototype.performHighlightList= function (container, elements) {
    var self = this;


    // add unselecting class to all elements, except the ones to select
    $(".ui-selected", container).not(elements).removeClass("ui-selected").addClass("ui-unselecting");

    // add ui-selecting class to the elements to select
    $(elements).not(".ui-selected").addClass("ui-selecting");

    // trigger the mouse stop event (this will select all .ui-selecting elements, and deselect all .ui-unselecting elements)
    container.data("ui-selectable")._mouseStop(null);
}

$("#select-all").change(function() {
    var self = this;
    self.performHighlightList("all", true);
});

// don't allow uncheck - interact with the list instead
$("#select-all").click(function() {
    var self = this;

    if (!$(this).prop("checked")) {
        $(this).prop("checked", true);
    }
});











