## NoteBox Backend

This is the backend for the NoteBox application, a MERN stack project for managing notes.

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/HkgGupta/MERN-Notes-Website.git
   ```

2. **Install dependencies**

   ```sh
   cd backend
   npm install
   ```

3. **Create a .env file**

   In the root directory of the project, create a .env file and add the following environment variables:
   .env

   ```sh
   PORT=3000
   DB_LOCAL="your_mongodb_url"
   USER_SECRET_KEY='your_secret_key'
   NODEMAILER_USER='your_nodemailer_email'
   NODEMAILER_PASS='your_nodemailer_password'
   ```

4. **Running the Application**
   Start the server

   ```sh
   npm start
   ```

The server will start on the port specified in the .env file. By default, it will run on http://localhost:3000.

### Project Structure

`models/:` Contains the Mongoose models for the application.

`routes/:` Contains the Express routes for the API endpoints.

`controllers/:` Contains the logic for handling requests and interacting with the database.

`middleware/:` Contains custom middleware for authentication and other purposes.

`.env:` Contains configuration files, including database configuration.

### API Endpoints

1. **Authentication Routes**

- `POST /register`: Register a new user.
- `POST /validate-otp`: Validate the OTP sent to the user.
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

- `DB_LOCAL:` The local MongoDB connection string.

- `DB_URL:` The MongoDB Atlas connection string.

- `USER_SECRET_KEY:` The secret key for user authentication.

- `NODEMAILER_USER:` The email address for sending emails.

- `NODEMAILER_PASS:` The password for the email address.
