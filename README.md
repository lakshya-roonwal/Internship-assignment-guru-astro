# Multi-Step Form with React

## Project Overview

This project is a multi-step form built with React.js that demonstrates skills in state management, form validation, responsive design, and local storage usage. The form includes three steps:

1. **Personal Information:** Collects Name, Email, and Phone.
2. **Address Information:** Collects Address Line 1, Address Line 2, City, State, and Zip Code.
3. **Confirmation:** Allows users to review all entered data and submit the form.

The form ensures:

- **Data Validation:** Fields are validated to ensure completeness and correctness.
- **Error Handling:** Displays appropriate error messages for invalid inputs.
- **Local Storage Management:** Persists data between steps and pre-fills fields on page refresh.
- **Responsive Design:** The form is designed to work well on desktop, tablet, and mobile screens.
- **Animations:** Includes animations for transitions between steps.
- **Simulated API Call:** Demonstrates handling of network requests with a simulated delay.

## Features

- **Tabbed Navigation:** Switch between steps with "Next" and "Previous" buttons.
- **Sequential Completion:** Enforces the completion of each step before moving to the next.
- **Submit Button:** Replaces the "Next" button on the last step and handles form submission.
- **Local Storage Integration:** Saves form data on navigation and retrieves it on page load.
- **Responsive Layout:** Adapts to different screen sizes using Tailwind CSS.

## Getting Started

### Prerequisites

**Node.js** and **npm** installed on your local machine.

### Installation

1. **Clone the Repository:**
    
    ```bash
    git clone https://github.com/lakshya-roonwal/Internship-assignment-guru-astro.git
    cd Internship-assignment-guru-astro
    
    ```
    
2. **Install Dependencies:**
    
    ```bash
    npm install
    ```
    

### Running the Application

To start the development server, run:

```bash
npm run dev

```

Open `http://localhost:3000` in your browser to view the application.

### Running Tests

Unit tests are not included in this project as per the assignment guidelines.

### Build for Production

To build the application for production, run:

```bash
npm run build
```

This will create a `build` directory with the production-ready assets.

## Code Structure

- **`src/`**: Contains the main application code.
    - **`components/`**: Reusable components and form steps.
    - **`lib/`**: Form schema and utility functions.
    - **`App.js`**: Main application file with form logic and state management.
    - **`main.js`**: Entry point for the React application.

## Code Implementation

### Key Components

- **`App.js`**: The main form component handling state, validation, and navigation.
- **`FormDataSchema.js`**: Defines the schema for form validation using Zod.
- **`localStorage` Management**: Data is saved to and retrieved from local storage.
- **`API Call Simulation`**: A fake API call is simulated using `setTimeout` to demonstrate network request handling.

## Additional Notes

- **Local Storage Handling:** Form data is saved on step changes and retrieved on page refresh.
- **Responsive Design:** The form uses Tailwind CSS for a responsive layout.
- **Animations:** Step transitions use the `framer-motion` library for smooth animations.

## Assumptions and Decisions

- **Form Steps:** Enforced sequential step navigation as specified.
- **Form Validation:** Basic validation rules implemented; more complex validations can be added as needed.
- **Simulated API Call:** Simple delay used to demonstrate handling of network requests.

## Future Enhancements

- **Unit Tests:** Adding tests for components and validation functions.
- **More Advanced Validations:** Implementing more advanced validation rules for form fields.
- **Backend Integration:** Replacing simulated API call with real backend integration.