# Blinds Web Application

## Overview
This project is a web application for managing and browsing blinds, built using **React.js**. It provides user-facing features like browsing products and placing orders, as well as an admin panel for managing inventory, orders, and more.

## Features

### User Features:
- Browse blinds by category (e.g., Roller, Wooden, Vertical).
- View product details and images.
- Add items to the shopping cart and place orders.
- Account management (login, registration, and profile settings).
- Contact form and FAQs for user assistance.

### Admin Features:
- Manage products, fabrics, and accessories.
- View and update orders, including canceled and completed orders.
- Edit user details and manage pricing.

### Responsive Design:
- Designed for a seamless experience across devices.

## File Structure

### Root Directory:
- **package.json**: Project dependencies and scripts.
- **.gitignore**: Excluded files for version control.

### Public Directory:
- Contains static assets like images, CSS files, and HTML templates.
- Subdirectories for images and CSS files for specific pages and features.

### Src Directory:
- **components**: Reusable UI elements (e.g., Navbar, Footer, Hero Section).
- **pages**: Contains views for user-facing and admin functionalities.
- **admin**: Components and pages specific to admin tasks.
- **redux**: State management using Redux for cart, user, and API calls.

## Setup Instructions

### Prerequisites:
- Node.js and npm installed on your machine.

### Steps:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd blinds
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   The application will run locally at `http://localhost:3000`.

5. To build the application for production:
   ```bash
   npm run build
   ```

## Technologies Used
- **Frontend**: React.js, CSS
- **State Management**: Redux
- **Assets**: Images and CSS files for styling and content.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature/bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

