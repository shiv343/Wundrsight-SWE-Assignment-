# Wundrsight SWE Assignment

A full-stack clinic booking application that allows patients to book appointments and view their bookings, while admins can manage all bookings.

---

## **Tech Stack**

- **Frontend:** React + Tailwind CSS  
  - Trade-off: Tailwind allows rapid UI development and responsive design with minimal CSS, but adds a larger bundle size compared to plain CSS.  
- **Backend:** Node.js + Express  
  - Trade-off: Node.js is highly performant for I/O-bound tasks and easy to integrate with JavaScript frontend, but single-threaded nature may limit CPU-heavy tasks.  
- **API Communication:** RESTful API endpoints  
  - Trade-off: Simple to implement and widely compatible, but less efficient than GraphQL for fetching nested data.  

---

## **Running Locally**

1. **Clone the repository:**

```bash
git clone https://github.com/shiv343/Wundrsight-SWE-Assignment-.git
cd Wundrsight-SWE-Assignment-

Run Backend:

cd api
npm install       # or yarn
npm start         # starts the Node.js backend

Run Frontend:

cd frontend
npm install       # or yarn
npm start         # starts the React frontend

Environment Variables

Create a .env file in the backend (api/) folder:

PORT=5000                       # optional, defaults to 5000
DB_URL=<your-database-url>      # if using database
SECRET_KEY=<jwt-secret-key>     # for authentication

In the frontend (frontend/.env), add:

REACT_APP_API_URL=http://localhost:5000


Deployment Steps
Backend Deployment (Render)

Go to Render
, click New → Web Service.

Connect your GitHub repo.

Set Root Directory to api/ (backend folder).

Set Build Command: npm install or yarn

Set Start Command: npm start or yarn start

Add Environment Variables from .env file.

Click Create Web Service → wait for deployment.

Copy the public backend URL for frontend config.

Frontend Deployment (Vercel / Netlify)

Connect GitHub repo to Vercel or Netlify.

Set Root Directory to frontend/ (React app).

Set build command: npm run build or yarn build

Set publish directory: build

Add REACT_APP_API_URL as environment variable pointing to deployed backend.

Deploy → React app will be live.

Known Limitations

Slot management is limited for admin (cannot create/edit/delete slots yet).

No email notifications on booking.

No database migrations or automated backups.

UI has limited accessibility features.

If I had 2 more hours:

Implement full admin slot management (CRUD operations).

Add email notifications on bookings.

Improve frontend accessibility and responsiveness.

Add user feedback messages for API errors and validations.
