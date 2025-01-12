class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Items to render
    this._renderer = renderer; // Function to render each item
    this._container = document.querySelector(containerSelector); // Container for items
  }

  renderItems() {
    // Render all items by calling the renderer function
    this._items.forEach((item) => {
      if (item.name && item.link) {
        this._renderer(item);
      } else {
        console.error("Invalid item:", item); // Log invalid items
      }
    });
  }

  addItem(element) {
    // Add a new element to the container
    this._container.prepend(element);
  }
}

export default Section;
