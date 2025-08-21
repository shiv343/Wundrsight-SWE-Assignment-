# Wundrsight SWE Assignment
A full-stack clinic booking application built with React, Tailwind CSS, and a backend API. This project allows patients to book appointments, view their bookings, and admins to manage all bookings.

**Features:**  
- Patient Dashboard: view and book available slots, see current bookings  
- Admin Dashboard: view all bookings, manage slots (future feature)  
- Authentication system  
- Clean, responsive UI with Tailwind CSS

**Prerequisites:**  
- Node.js >= 14.x  
- npm or yarn  
- Git

**Installation:**  
```bash
git clone https://github.com/shiv343/Wundrsight-SWE-Assignment-.git
cd Wundrsight-SWE-Assignment-
npm install    # or yarn install
Create a .env file in the root folder and add:

env
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
Running the Project:

bash
Copy
Edit
npm start    # or yarn start
Open http://localhost:3000 in your browser. You should see the login/register page and can start testing the application.

Build for Production:

bash
Copy
Edit
npm run build    # or yarn build
This creates an optimized production build in the build/ folder.

Notes:

Make sure your backend API is running before logging in.

Default roles: Patient, Admin

Admin dashboard currently displays all bookings.
