var ElementList = require("../index")
    , Widget = require("./widget")
    , through = require("through")
    , body = document.body

var stream = ElementList({
        list: "ul"
        , item: "li"
    }, Widget)
    , list = stream.createList()

var button = document.createElement("button")
button.textContent = "add item"
button.addEventListener("click", onclick)

stream.appendTo(body)
body.appendChild(button)

function onclick() {
    var stream = through()
    list.push(stream)
}