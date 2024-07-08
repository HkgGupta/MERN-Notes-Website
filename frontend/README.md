## NoteBox Frontend

This is the frontend for the NoteBox application, a MERN stack project for managing notes.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/HkgGupta/MERN-Notes-Website.git
   ```

2. **Install dependencies for both frontend and backend**

   ```
   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. **Start the backend server**

   ```
   # From the frontend directory
   npm run dev
   ```

   The frontend development server will start at http://localhost:5173.

### Frontend Routes

**Authentication Routes**

- `/login`: Log in to the application.
- `/register`: Register a new account.

**User Routes**

- `/profile`: View and edit user profile details.
- `/update-password`: Update user password.

**Note Routes**

- `/dashboard`: View all notes.
- `/create-note`: Create a new note.
- `/update-note/:noteId`: Update an existing note.
- `/view-note/:noteId`: View a single note's details.
