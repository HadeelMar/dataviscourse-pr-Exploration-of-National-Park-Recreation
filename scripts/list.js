/**
 * Created by Mila on 11/23/15.
 */



function initList() {

    var list = d3.select("nav#list-nav").append("ol")
        .attr("id", "selectable");

    var li = list.selectAll("li")
        .data(films)
        .enter()
        .append("li")
        .attr("class", "ui-widget-content")
        .text( function(d) { return d.rank.toString() + ". " + d.title} );


function SelectSelectableElement (selectableContainer, elementsToSelect)

{
    // add unselecting class to all elements in the styleboard canvas except the ones to select
    $(".ui-selected", selectableContainer).not(elementsToSelect).removeClass("ui-selected").addClass("ui-unselecting");

    // add ui-selecting class to the elements to select
    $(elementsToSelect).not(".ui-selected").addClass("ui-selecting");

    // trigger the mouse stop event (this will select all .ui-selecting elements, and deselect all .ui-unselecting elements)
    selectableContainer.data("ui-selectable")._mouseStop(null);
}

$("#selectable").selectable();

$("#b1").click(function(){
    SelectSelectableElement($("#selectable"), $("li:first, li:last", "#selectable"));
});

$("#b2").click(function(){
    SelectSelectableElement($("#selectable"), $("#selectable li:lt(3)"));
});
