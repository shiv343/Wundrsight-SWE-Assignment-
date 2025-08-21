# Wundrsight Clinic Booking Application

A full-stack clinic booking application that allows patients to book appointments and view their bookings, while admins can manage all bookings.

## Tech Stack

### Frontend: React + Tailwind CSS
**Trade-offs:** Tailwind CSS enables rapid UI development with utility-first classes and excellent responsive design capabilities, but results in larger bundle sizes compared to traditional CSS and can lead to verbose HTML with many class names.

### Backend: Node.js + Express
**Trade-offs:** Node.js provides excellent performance for I/O-bound operations and seamless JavaScript integration across the stack, but its single-threaded nature can become a bottleneck for CPU-intensive tasks and may require additional tooling for complex applications.

### API Design: RESTful Architecture
**Trade-offs:** REST APIs are simple to implement, widely understood, and have excellent tooling support, but can be less efficient than GraphQL for complex data fetching scenarios and may require multiple requests for related data.

## Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/shiv343/Wundrsight-SWE-Assignment-.git
cd Wundrsight-SWE-Assignment-
```

### Run Backend Service
```bash
cd api && npm install && npm start
```

### Run Frontend Service
```bash
cd frontend && npm install && npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Environment Variables

### Backend Configuration (`api/.env`)
```env
PORT=5000                           # Optional, defaults to 5000
DB_URL=<your-database-url>          # Database connection string
SECRET_KEY=<jwt-secret-key>         # JWT token secret for authentication
NODE_ENV=development                # Environment mode
```

### Frontend Configuration (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000    # Backend API endpoint
REACT_APP_ENV=development                   # Application environment
```

## Deployment Steps

### Backend Deployment (Render)

1. **Create Render Account**: Navigate to [Render.com](https://render.com) and create an account
2. **New Web Service**: Click "New" → "Web Service"
3. **Connect Repository**: Connect your GitHub repository
4. **Configure Service**:
   ```
   Root Directory: api/
   Build Command: npm install
   Start Command: npm start
   ```
5. **Environment Variables**: Add all variables from your `.env` file
6. **Deploy**: Click "Create Web Service" and wait for deployment
7. **Copy URL**: Save the deployed backend URL for frontend configuration

### Frontend Deployment (Vercel)

1. **Connect Repository**: Link GitHub repo to Vercel
2. **Configure Build Settings**:
   ```
   Root Directory: frontend/
   Build Command: npm run build
   Output Directory: build
   ```
3. **Environment Variables**: Add `REACT_APP_API_URL` pointing to your deployed backend
4. **Deploy**: Application will be automatically deployed

### Alternative Frontend Deployment (Netlify)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd frontend
npm run build
netlify deploy --dir=build --prod
```

## Known Limitations

### Current Constraints
- **Limited Admin Features**: Slot management is restricted - admins cannot create, edit, or delete appointment slots
- **No Notifications**: Missing email/SMS notifications for booking confirmations and reminders
- **Database Management**: Lacks automated database migrations and backup systems
- **Accessibility**: Limited accessibility features for users with disabilities
- **Error Handling**: Basic error handling without comprehensive user feedback
- **Authentication**: Simple authentication without password reset functionality

### What I'd Implement with 2 More Hours

#### Priority 1: Admin Slot Management
- Complete CRUD operations for appointment slots
- Bulk slot creation and management interface
- Slot availability conflict detection

#### Priority 2: User Experience Enhancements
- Real-time email notifications using services like SendGrid or Nodemailer
- Enhanced error handling with user-friendly feedback messages
- Loading states and better UX interactions

#### Priority 3: Accessibility & Polish
- WCAG 2.1 compliance improvements (screen reader support, keyboard navigation)
- Mobile responsiveness optimization
- Form validation enhancements

## API Endpoints

### Patient Endpoints
- `GET /api/appointments` - View all appointments
- `POST /api/appointments` - Book new appointment
- `GET /api/appointments/:id` - Get specific appointment

### Admin Endpoints
- `GET /api/admin/appointments` - View all bookings
- `PUT /api/appointments/:id` - Update appointment status
- `DELETE /api/appointments/:id` - Cancel appointment

## Project Structure

```
Wundrsight-SWE-Assignment-/
├── api/                    # Backend Node.js application
│   ├── routes/            # API route handlers
│   ├── models/            # Data models
│   ├── middleware/        # Custom middleware
│   └── server.js          # Main server file
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── services/      # API service calls
│   └── public/            # Static assets
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Wundrsight SWE Assignment and is for educational purposes.
