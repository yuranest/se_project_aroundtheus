class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // Function to render each item
    this._container = document.querySelector(containerSelector); // Container for items
  }

  // ✅ Updated to prevent errors if items are not an array
  renderItems(items) {
    if (!Array.isArray(items)) {
      console.error(
        "Error: renderItems expected an array but received:",
        items
      );
      return;
    }

    items.forEach((item) => {
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
