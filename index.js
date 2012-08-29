var SpliceStream = require("splice-stream")
    , MovableList = SpliceStream.MovableList
    , Widget = require("append-to")

module.exports = ElementList

function ElementList(options, callback) {
    if (typeof options === "function") {
        callback = options
        options = {}
    }

    var listElem = options.list.nodeType ?
            options.list : document.createElement(options.list || "ul")
        , createElement = typeof options.item === "function" ?
            options.item : element(options.item)
        , stream = Widget(listElem, SpliceStream())
        , list = MovableList(stream)

    list.on("add", function (item, index) {
        var elem = createElement(item, index)
            , ref = listElem.children[index] || null

        listElem.insertBefore(elem, ref)

        console.log("add triggered")
        callback(item, elem, index)
    })

    list.on("move", function (item, newIndex, oldIndex) {
        console.log("move", listElem, newIndex, oldIndex)
        console.log("list", [].slice.call(listElem.children))
        console.log("elem", listElem.children[oldIndex])
        console.log("ref", listElem.children[newIndex])
        listElem.insertBefore(
            listElem.children[oldIndex]
            , listElem.children[newIndex] || null)
    })

    list.on("remove", function (item, index) {
        console.log("remove triggered")
        listElem.removeChild(listElem.children[index])
    })

    return stream
}

function element(name) {
    name = name || "li"

    return create

    function create() {
        return document.createElement(name)
    }
}