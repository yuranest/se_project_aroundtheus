# Project 6: Around The U.S.

Site is live at [https://yuranest.github.io/se_project_aroundtheus/](https://yuranest.github.io/se_project_aroundtheus/)

Video demonstration:

- [YouTube](https://youtu.be/lti4sc5kPlw) Project 3 assignment.

---

## Overview

This project, _Around The U.S._, is a responsive web application built with **HTML**, **CSS**, and **JavaScript**. It features dynamic modals, card rendering, and form validation. The design is optimized for seamless operation across desktop, tablet, and mobile devices, as specified in the [Figma designs]

- Project 3 (https://www.figma.com/design/Es8zZP3ARGH9JGcw60i3OD/Sprint-3_-Around-the-US?node-id=0-1&node-type=canvas&t=WuqeKHeCxYZBeVIG-0)
- Project 4 (https://www.figma.com/design/EO5AaNCuzzFL7X5gSY7HwQ/Sprint-4_-Around-The-U.S.-_-desktop-%2B-mobile?node-id=0-1&node-type=canvas&t=5rr06LQzLEsbxLQs-0)
- Project 5 (https://www.figma.com/design/JFPhASqvZ5pBjQV2ouUlim/Sprint-5_-Around-The-U.S.-_-desktop-%2B-mobile-(Copy)?node-id=0-1&node-type=canvas&t=L3LqTHnHcod3cQpB-0)
- Project 6 (https://www.figma.com/design/N3zUeequnpvMX807FfYAZW/Sprint-6-Around-The-U.S.?node-id=0-1&node-type=canvas&t=kS9NHWCKLJsgMiFN-0).

---

## Features Added

### **1. Edit Profile Modal**

- **Dynamic Modal**:
  - Allows users to edit their profile details, such as the name and "About me" fields.
  - Pre-fills the form fields with the current profile details when opened.
- **Save Functionality**:
  - Updates the profile on the main page when the user clicks "Save."
  - Closes the modal after saving.
- **Overlay & Button Close**:
  - Modals can now be closed via overlay click or a generic close button.

### **2. Add New Place Modal**

- **Form-Driven Card Creation**:
  - Users can add new cards dynamically by filling out the "Title" and "Image URL" fields.
- **Validation**:
  - Form fields validate user input and prevent submission if fields are incomplete or incorrect.

### **3. Card Rendering with JavaScript**

- **Dynamic Card Population**:
  - Cards are dynamically generated from the `initialCards` array and user input.
- **Interactive Features**:
  - Includes like toggling, delete functionality, and full-image modal previews.

### **4. Form Validation**

- **Custom Validation**:
  - All forms validate user input and provide real-time feedback.
- **Reusable Functions**:
  - Validation logic is modular and reusable across multiple forms.
- **Error Styling**:
  - Errors are styled dynamically with CSS classes.

### **5. Responsive Design**

- Improved design for input fields and buttons across all screen sizes.
- Modal layouts adapt seamlessly for mobile and desktop users.
- Placeholder text and error messages are styled for optimal readability.

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
