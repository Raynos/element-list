var Fragment = require("fragment")
    , widgetHtml = require("./widget.html")
    , formHtml = require("./form.html")
    , FormStream = require("form-stream")
    , TextNode = require("text-node")

module.exports = Widget

function Widget(stream, wrapper) {
    var widget = Fragment(widgetHtml)
        , form = Fragment(formHtml)
        , textStream = TextNode(widget)
        , inputStream = FormStream(form)

    console.log("creating widget", inputStream, stream, textStream)

    inputStream.pipe(stream).pipe(textStream)

    wrapper.appendChild(widget)
    wrapper.appendChild(form)
}