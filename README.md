## NoteBox - A MERN Stack Note-Taking Application

NoteBox is a MERN (MongoDB, Express.js, React.js, Node.js) stack application for managing notes. It allows users to create, view, update, and delete notes securely.
### Live link 1 : [https://notebox-ui.vercel.app/](https://notebox-ui.vercel.app/)
### Live link 2 : [https://notebox-ui.onrender.app/](https://notebox-ui.onrender.com/)
### Live link 3 : [https://notebox-ui.netlify.app/](https://notebox-ui.netlify.app/)

### Features

- User Authentication (Register, Login, Logout)
- OTP based authentication using Nodemailer
- CRUD Operations for Notes
- User Profile Management
- Responsive UI Design
- Error Handling and Validation
- Integration with MongoDB for Database Storage
- Integration with Node.js backend using Express.js

### Getting Started

**Prerequisites**

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)
- [IDE or Code editor](https://code.visualstudio.com/download) (e.g., Visual Studio Code)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/HkgGupta/MERN-Notes-Website.git
    cd MERN-Notes-Website
    ```

2.  **Install dependencies for both frontend and backend**

    ```
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies

    cd ../frontend
    npm install
    ```

3.  **Set up environment variables**

    - Create `.env` files in `backend/` directory.

    - In `backend/.env`, add:

    ```
    PORT=3000
    DB_URL="your_mongodb_url"
    USER_SECRET_KEY='your_secret_key'
    NODEMAILER_USER='your_nodemailer_email'
    NODEMAILER_PASS='your_nodemailer_password'
    ```

    Replace `your_mongodb_url`, `your_secret_key`, `your_nodemailer_email`, and `your_nodemailer_password` with your actual MongoDB connection string, secret key for authentication, email address for NodeMailer, and password for the email address.

4.  **Start the backend server**

    ```
    # From the backend directory
    npm run dev
    or
    npm start
    ```

    The backend server will start at http://localhost:3000.

    ```
    # From the frontend directory
    npm run dev
    ```

    The frontend development server will start at http://localhost:5173.

5.  **Access the application**
    Open your browser and go to http://localhost:5173 to access the NoteBox application.

### Project Structure

The project structure is organized into frontend and backend directories:

    `backend/:` Contains the Node.js server using Express.js, MongoDB models, routes, controllers, and middleware.

    `frontend/:` Contains the React.js frontend application, components, pages, styles, and API integration.

### Backend API Endpoints

1. **Authentication Routes**

- `POST /register`: Register a new user.
- `POST /validate-otp`: Validate the OTP sent to the user email.
- `POST /resend-otp`: Resend the OTP to the user.
- `POST /login`: Log in an existing user.

2. **User Routes**

- `GET /details`: Get user details (requires authentication).
- `PUT /update`: Update user details (requires authentication).
- `PUT /update-password`: Update user password (requires authentication).

3. **Note Routes**

- `GET /notes`: Retrieve all notes (requires authentication).
- `POST /new-note`: Create a new note (requires authentication).
- `PUT /update-note/:noteId`: Update a note by ID (requires authentication).
- `DELETE /delete-note/:noteId`: Delete a note by ID (requires authentication).

### Environment Variables

- `PORT:` The port on which the server runs.

- `DB_URL:` The MongoDB Atlas connection string or Local DB url.

- `USER_SECRET_KEY:` The secret key for user authentication.

- `NODEMAILER_USER:` The email address for sending emails.

- `NODEMAILER_PASS:` The password for the email address.
