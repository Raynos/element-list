var ElementList = require("../../../index")
    , ItemWidget = require("../item/widget")
    , Widget = require("append-to")
    , Element = require("fragment").Element
    , listHtml = require("./list.html")
    , itemHtml = require("./item.html")
    , through = require("through")
    , indexOf = Array.prototype.indexOf

module.exports = List

function List() {
    // Root element for list control
    var elem = Element(listHtml)
        // Actual list element
        , listElem = elem.getElementsByClassName("list")[0]
        // Stream for populating the list
        , listStream = Widget(elem, ElementList({
            list: listElem
            , item: createLi
        }, ItemWidget))
        // button element
        , button = elem.getElementsByClassName("list-button")[0]
        // mutable list representation of stream
        , list = listStream.createList()

    // Add item to list
    button.addEventListener("click", addStream)

    // handle drag starts
    listElem.addEventListener("dragstart", handleDragStart)

    // handle drags
    listElem.addEventListener("dragover", handleDragOver)

    // handle drops
    listElem.addEventListener("drop", handleDrop)

    return listStream

    function addStream() {
        list.push(through())
    }

    function handleDragStart(evt) {
        var index = getListIndex(evt.target)

        evt.dataTransfer.effectAllowed = "copy"
        evt.dataTransfer.setData("Text", index)
    }

    function handleDragOver(evt) {
        evt.preventDefault()

        evt.dataTransfer.dropEffect = "copy"
    }

    function handleDrop(evt) {
        var startIndex = evt.dataTransfer.getData("Text")
            , endIndex = getListIndex(evt.target)

        var item = list.splice(+startIndex, 1)[0]
        list.splice(endIndex, 0, item)
    }
}

function getListIndex(elem) {
    while (elem && !elem.classList.contains("list-item")) {
        elem = elem.parentNode
    }

    return indexOf.call(elem.parentNode.children, elem)
}

function createLi() {
    return Element(itemHtml)
}