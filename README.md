# Task Management System - MERN Stack

A full-stack task management application built with MongoDB, Express.js, React, and Node.js.

## Features

- User authentication with JWT
- Password hashing with bcrypt
- Protected routes (frontend & backend)
- User profile management
- Project CRUD operations
- Task CRUD operations with status and priority
- Dashboard with statistics
- Responsive UI with Tailwind CSS

## Project Structure

```
task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   |
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── Projects/
│   │   │   │   ├── ProjectList.jsx
│   │   │   │   └── ProjectForm.jsx
│   │   │   ├── Tasks/
│   │   │   │   ├── TaskBoard.jsx
│   │   │   │   └── TaskForm.jsx
│   │   │   ├── Layout/
│   │   │   │   └── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Initialize npm (if package.json doesn't exist)
```bash
npm npm init -y
```

3. Install Production Dependencies
```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
```
4. Install Development Dependencies
```bash
npm install --save-dev nodemon
```

5. Verify Installation
```bash
npm list --depth=0
```
Expected output:
```
backend@1.0.0
├── bcryptjs@2.4.3
├── cors@2.8.5
├── dotenv@16.3.1
├── express@4.18.2
├── jsonwebtoken@9.0.2
├── mongoose@8.0.3
└── nodemon@3.0.2
```

6. Create `.env` file:
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

7. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Create Vite React App (if starting fresh)
```bash
npm create vite@latest . -- --template react
Note: If the directory already has package.json, skip this step.
```
3. Install Base Dependencies
```bash
npm install
```

4. Install Additional Dependencies
```bash
npm install react-router-dom axios lucide-react
```

5. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
```

6. Initialize Tailwind
```bash
npx tailwindcss init -p
```

7. Verify Installation
```bash
npm list --depth=0
```
Expected output:
```
task-management-frontend@1.0.0
├── axios@1.6.2
├── lucide-react@0.294.0
├── react@18.2.0
├── react-dom@18.2.0
├── react-router-dom@6.20.1
├── autoprefixer@10.4.16
├── postcss@8.4.32
├── tailwindcss@3.3.6
└── vite@5.0.8tailwindcss init -p
```

8. Create `.env` file in frontend:
```bash
VITE_API_URL=http://localhost:5000/api
```

9. Start the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
Response: { user, token }
```

#### Login User
```
POST /api/auth/login
Body: { email, password }
Response: { user, token }
```

#### Get Current User
```
GET /api/auth/me
Headers: { Authorization: Bearer <token> }
Response: { user }
```

### Project Endpoints

#### Get All Projects
```
GET /api/projects
Headers: { Authorization: Bearer <token> }
Response: [{ _id, title, description, owner, createdAt }]
```

#### Create Project
```
POST /api/projects
Headers: { Authorization: Bearer <token> }
Body: { title, description }
Response: { project }
```

#### Update Project
```
PUT /api/projects/:id
Headers: { Authorization: Bearer <token> }
Body: { title, description }
Response: { project }
```

#### Delete Project
```
DELETE /api/projects/:id
Headers: { Authorization: Bearer <token> }
Response: { message }
```

### Task Endpoints

#### Get All Tasks
```
GET /api/tasks
Headers: { Authorization: Bearer <token> }
Query: ?project=<projectId>
Response: [{ _id, title, description, status, priority, dueDate, project, assignedTo }]
```

#### Create Task
```
POST /api/tasks
Headers: { Authorization: Bearer <token> }
Body: { title, description, status, priority, dueDate, project }
Response: { task }
```

#### Update Task
```
PUT /api/tasks/:id
Headers: { Authorization: Bearer <token> }
Body: { title, description, status, priority, dueDate }
Response: { task }
```

#### Delete Task
```
DELETE /api/tasks/:id
Headers: { Authorization: Bearer <token> }
Response: { message }
```

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'user'),
  createdAt: Date
}
```

### Project Model
```javascript
{
  title: String (required),
  description: String (required),
  owner: ObjectId (ref: User, required),
  createdAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String (required),
  status: String (enum: ['Todo', 'In Progress', 'Done']),
  priority: String (enum: ['Low', 'Medium', 'High']),
  dueDate: Date (required),
  project: ObjectId (ref: Project, required),
  assignedTo: ObjectId (ref: User, required),
  createdAt: Date
}
```

## Features Implementation

### Authentication
- JWT-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Protected routes using middleware
- Token stored in localStorage

### Authorization
- Users can only access their own projects and tasks
- Middleware validates JWT tokens
- Role-based access control ready

### Task Management
- Kanban-style board (Todo, In Progress, Done)
- Priority levels (Low, Medium, High)
- Due date tracking
- Project association

### Dashboard
- Task statistics by status
- Recent projects overview
- Visual cards with counts

## Testing the Application

1. Register a new user
2. Login with credentials
3. Create a project
4. Add tasks to the project
5. Update task status by dragging or editing
6. View dashboard statistics

## Security Best Practices Implemented

- Password hashing with bcrypt
- JWT token expiration (24 hours)
- HTTP-only cookies option available
- CORS configuration
- Input validation
- Protected routes
- Environment variables for secrets

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons
- Context API for state management

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

---

**Author**: Nikhil Bhasarkar
**GitHub**: https://github.com/yourusername/task-management-system
