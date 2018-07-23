exports.command = function (dragFromSelector, dragToSelector) {
  console.log(`Dragging ${dragFromSelector}`)
  console.log(`to ${dragToSelector}`)
  this
    .moveToElement(dragFromSelector, 5, 5)
    .mouseButtonDown(0)
    .moveToElement(dragToSelector, 5, 5)
    .mouseButtonUp(0)
    .pause(500)
}
