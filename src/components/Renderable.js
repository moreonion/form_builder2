export default class Renderable {
  // Abstract: override in subclasses
  renderFn() {
    return <div></div>
  }

  // Abstract
  destory() {}
}
