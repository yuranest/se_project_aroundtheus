# Project 8: Around The U.S.

OOP
Site is live at [https://yuranest.github.io/se_project_aroundtheus/](https://yuranest.github.io/se_project_aroundtheus/)

---

## Overview

This project, _Around The U.S._, is a responsive web application built with **HTML**, **CSS**, and **JavaScript**. It features dynamic modals, card rendering, and form validation. The design is optimized for seamless operation across desktop, tablet, and mobile devices, as specified in the [Figma designs](https://www.figma.com/design/N3zUeequnpvMX807FfYAZW/Sprint-6-Around-The-U.S.?node-id=0-1&node-type=canvas).

---

## Features Added in Project 7

### **1. Code Refactoring**

- The project structure was updated to improve maintainability:
  - Introduced ES6 classes: `Card` and `FormValidator`.
  - Refactored the codebase to use modular JavaScript, separating concerns for cards and form validation.
  - Updated the directory structure:
    - `components/` for JavaScript classes.
    - `pages/` for the main script and styles.

### **2. Card Class**

- Dynamically generates cards from the `initialCards` array and user input.
- Handles interactive features:
  - Like toggling.
  - Card deletion.
  - Full-image modal previews.
- Built with private methods for event listeners and markup preparation.

### **3. FormValidator Class**

- Provides reusable, modular form validation across the project.
- Features:
  - Real-time input validation with visual feedback.
  - Dynamic enabling and disabling of the Submit button.
  - Resets validation and button states after form submission.

### **4. Improved UX for Modals**

- Forms reset their input values and validation states when reopened.
- Modals close via:
  - Clicking the overlay.
  - Clicking the close button.
  - Pressing the `Escape` key.

---

## Technology

- **HTML & CSS**: For semantic structure and styling.
- **JavaScript**: For interactive features, dynamic card rendering, and modular ES6 classes.
- **Responsive Design**: Utilizes **CSS Grid** and **Flexbox** for adaptive layouts.
- **Media Queries**: Ensures compatibility with different screen sizes.

---

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:yuranest/se_project_aroundtheus.git
   ```
2. Open the project in a local editor.
3. Start a local server (e.g., Live Server) to run the project.
