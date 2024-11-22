# Project 4: Around The U.S.

Site is live at [https://yuranest.github.io/se_project_aroundtheus/](https://yuranest.github.io/se_project_aroundtheus/)

Video demonstration:

- [YouTube](https://youtu.be/lti4sc5kPlw)
- [Google Drive](https://drive.google.com/file/d/12kbI4ZF40Yytzjm1f8FTlnHSJYw-VMhu/view?usp=drive_link)

---

## Overview

This project, _Around The U.S._, is a responsive web layout created with **HTML**, **CSS**, and **JavaScript**. It is designed to adapt seamlessly across various screen sizes, including desktop, tablet, and mobile, as specified in the [Figma designs](https://www.figma.com/file/EO5AaNCuzzFL7X5gSY7HwQ/Sprint-4_-Around-The-U.S.-_-desktop-%2B-mobile?t=3hvVWRz9LUFsxyNn-6).

---

## Features Added

### **1. Edit Profile Modal**

- **Modal Pop-Up**:
  - Allows users to edit their profile details, such as the name and "About me" fields.
  - Pre-fills the form fields with the current profile details when opened.
- **Save Functionality**:
  - Updates the profile on the main page when the user clicks "Save."
  - Closes the modal after saving.

### **2. Card Rendering with JavaScript**

- Dynamically generates cards based on an array of data (`initialCards`).
- **Template Usage**:
  - Uses an HTML `<template>` element for a reusable card structure.
  - Populates the template with card titles and image data via JavaScript.
- **Dynamic Insertion**:
  - Renders all cards dynamically into the `.cards__list` container.

### **3. Responsive Design**

- Improved input fields for better usability on smaller screens.
- Adjusted placeholder positioning for `.modal__input`.

---

## Figma

- [Link to the project on Figma](https://www.figma.com/design/mUgu8OSHWE0M6p6vfwmdu9/Sprint-4%3A-Around-The-U.S.-%2F-desktop-%2B-mobile?node-id=6432-289&node-type=frame&t=B0ucVNldCqwjWnn1-0)
- Export images directly from Figma and optimize them for faster loading.

---

## Technology

- **HTML & CSS**: For semantic structure and styling.
- **JavaScript**: For interactive features and dynamic card rendering.
- **Responsive Design**: Utilizes **CSS Grid** and **Flexbox** for adaptive layouts.
- **Media Queries**: Ensures compatibility with different screen sizes.

---

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:yuranest/se_project_aroundtheus.git
   ```
