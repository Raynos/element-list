var SpliceStream = require("splice-stream")
    , Widget = require("append-to")

module.exports = ListStream

function ListStream(options, callback) {
    if (typeof options === "function") {
        callback = options
        options = {}
    }

    var listElem = document.createElement(options.list || "ul")
        , itemName = options.item || "li"
        , stream = Widget(listElem, SpliceStream())
        , list = stream.createList()

    list.on("add", function (item, index) {
        var elem = document.createElement(itemName)
            , ref = listElem.children[index] || null

        listElem.insertBefore(elem, ref)

        callback(item, elem, remove)

        function remove() {
            var index = list.indexOf(item)
            list.splice(index, 1)
        }
    })

    list.on("remove", function (item, index) {
        listElem.removeChild(listElem.children[index])
    })

    return stream
}