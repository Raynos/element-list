# element-list

A splice stream that renders a list of elements

## Example

``` js
var stream = ElementList({
    list: "ul"
    , item: "li"
}, function (item, element, remove) {
    /*
        Item is the item you added to the list.
        Element is a wrapper element generated from the item option. A li
            in this case
        remove is a utility function to remove this item from the list
    */

    /* do your rendering logic */
    var span = document.createElement("span")
    span.textContent = item
    element.appendChild(span)
})

// Since stream is a splice-stream you can call the createList function
var list = stream.createList()

// list is just a List object from splice-stream so do stuff
list.push("some value. Anything you want")

// Make sure to append the elementList somewhere. 
// Yes it's a stream and has custom
stream.appendTo(document.body)
```

## Installation

`npm install element-list`

## Contributors

 - Raynos

## MIT Licenced