import noteModel from '../Models/noteModel.js';

// @GET ("/notes")
export const getAllNote = async (req, res) => {

    try {
        const userId = req.userInfo;
        const notes = await noteModel.find({ userId });
        res.status(201).json({
            count: notes.length,
            notes: notes
        });
    } catch (error) {
        res.status(400).json({
            error_message: 'Something went wrong ' + error
        });
    }
};

// @GET ("/note/:noteId")
export const getNoteById = async (req, res) => {

    try {
        const userId = req.userInfo;
        const noteId = req.params.noteId;
        const note = await noteModel.findOne({ _id: noteId, userId });
        res.status(201).json({
            note: note
        });
    } catch (error) {
        res.status(400).json({
            error_message: 'Something went wrong ' + error
        });
    }
};

// @POST ("/new-note")
export const newNote = async (req, res) => {

    try {
        const userId = req.userInfo;
        const title = req.body.title;
        const desc = req.body.desc;
        const dateTime = new Date();
        const date = dateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const pinned = req.body.pinned;
        const color = req.body.color;
        const tags = req.body.tags;

        const newNote = new noteModel({
            userId,
            title,
            desc,
            date,
            pinned,
            color,
            tags
        });

        await newNote.save();

        res.status(201).json({
            success_message: 'Note added successfully',
            newNote: newNote
        });
    } catch (error) {
        res.status(400).json({
            error_message: 'Something went wrong ' + error
        });
    }
};

// @PUT ("/update-note/:noteId")
export const updateNote = async (req, res) => {
    try {
        const userId = req.userInfo;
        const noteId = req.params.noteId;
        const { title, desc, color, tags, pinned } = req.body;
        const dateTime = new Date();
        const date = dateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const note = await noteModel.findOne({ _id: noteId });

        if (note && note.userId.equals(userId)) {
            note.title = title;
            note.desc = desc;
            note.date = date;
            note.color = color;
            note.pinned = pinned;
            note.tags = tags;
            const updatedNote = await note.save();
            return res.status(200).json({
                success_message: 'Note updated successfully'
            });
        } else {
            return res.status(404).json({
                error_message: 'Note not found or Unauthorized',
            });
        }
    } catch (error) {
        return res.status(400).json({
            error_message: 'Something went wrong: ' + error.message,
        });
    }
};

// @UpdatePinned ("toggle-pin/:noteId")
export const updatePinned = async (req, res) => {
    try {
        const userId = req.userInfo;
        const noteId = req.params.noteId;
        const note = await noteModel.findOne({ _id: noteId });

        if (note && note.userId.equals(userId)) {
            note.pinned = !note.pinned;
            const updatedNote = await note.save();
            if (note.pinned) {
                return res.status(200).json({
                    success_message: 'Note Pinned'
                });
            }
            else {
                return res.status(200).json({
                    success_message: 'Note Unpinned'
                });
            }
        } else {
            return res.status(404).json({
                error_message: 'Note not found or Unauthorized',
            });
        }
    } catch (error) {
        return res.status(400).json({
            error_message: 'Something went wrong: ' + error.message,
        });
    }
};

// @DELETE ("/delete-note/:noteId")
export const deleteNote = async (req, res) => {
    try {
        const userId = req.userInfo;
        const noteId = req.params.noteId;

        const note = await noteModel.findOne({ _id: noteId });

        if (note) {
            if (note.userId.equals(userId)) {

                const deletedNote = await noteModel.findByIdAndDelete(noteId);
                if (!deletedNote) {
                    return res.status(404).json({
                        error_message: 'Note not deleted'
                    });
                }
                return res.status(200).json({
                    success_message: 'Note deleted successfully',
                });
            }
        } else {
            return res.status(404).json({
                error_message: 'Note not found..'
            });
        }
    } catch (error) {
        res.status(400).json({
            error_message: 'Something went wrong ' + error
        });
    }
};

