Social Network Frontend
This is the frontend of the Social Network project, built using ReactJS. It provides the user interface for a social media platform, allowing users to interact with features such as posting, commenting, liking, and messaging.
Table of Contents

Technologies Used
Prerequisites
Installation
Running the Project
Project Structure
Available Scripts
Contributing
License

Technologies Used

ReactJS: JavaScript library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for styling (if applicable).
Axios: For making HTTP requests to the backend API.
React Router: For client-side routing.
Node.js: Runtime environment for running JavaScript outside the browser.
npm: Package manager for installing dependencies.

Prerequisites
Before running the project, ensure you have the following installed:

Node.js (version 16.x or higher): Download here
npm (usually comes with Node.js)
A code editor like VS Code (recommended)
The backend server (Spring Boot) running locally or deployed. Refer to the backend repository for setup instructions.

Installation

Clone the repository:
git clone https://github.com/Thanhcona40/socialnetwork-frontend.git
cd socialnetwork-frontend


Install dependencies:
npm install


Configure environment variables:

Create a .env file in the root directory.
Add the backend API URL (adjust based on your backend setup):REACT_APP_API_URL=http://localhost:8080/api


Note: Do not commit the .env file to GitHub. It is included in .gitignore for security.



Running the Project

Start the development server:
npm start


This will run the app in development mode.
Open http://localhost:3000 in your browser to view the app.
The page will reload automatically when you make changes to the code.


Ensure the backend is running:

The frontend communicates with the Spring Boot backend. Make sure the backend server is running (e.g., at http://localhost:8080).



Project Structure
socialnetwork-frontend/
├── public/                 # Static assets (favicon, index.html, etc.)
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components (e.g., Home, Profile)
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
├── .gitignore              # Files/folders to ignore in Git
├── package.json            # Project dependencies and scripts
├── README.md               # This file

Available Scripts
In the project directory, you can run:

npm start: Runs the app in development mode.
npm build: Builds the app for production to the build folder.
npm test: Launches the test runner (if tests are configured).
npm eject: Ejects the Create React App configuration (use with caution).

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request on GitHub.

License
This project is licensed under the MIT License. See the LICENSE file for details.
