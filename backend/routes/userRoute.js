import express from 'express';
import { resendOTP, updateUserDetails, updateUserPassword, userDetails, userLogin, userRegister, validateOTP } from '../controller/user.js';
import { deleteNote, getAllNote, getNoteById, newNote, updateNote, updatePinned } from '../controller/note.js';
import { userCheckAuth } from '../middleware/userAuth.js';

const router = express.Router();


router.post("/register", userRegister);
router.post('/validate-otp', validateOTP);
router.post('/resend-otp', resendOTP);

router.post("/login", userLogin);

router.get("/details", userCheckAuth, userDetails);
router.put("/update", userCheckAuth, updateUserDetails);
router.put("/update-password", userCheckAuth, updateUserPassword);

router.get("/notes", userCheckAuth, getAllNote);
router.get("/note/:noteId", userCheckAuth, getNoteById);
router.post("/new-note", userCheckAuth, newNote);
router.put("/update-note/:noteId", userCheckAuth, updateNote);
router.put("/toggle-pin/:noteId", userCheckAuth, updatePinned);
router.delete("/delete-note/:noteId", userCheckAuth, deleteNote);

export default router;