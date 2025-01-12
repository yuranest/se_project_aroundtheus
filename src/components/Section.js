class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      if (item.name && item.link) {
        this._renderer(item);
      } else {
        console.error("Invalid item:", item); // Debugging
      }
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
