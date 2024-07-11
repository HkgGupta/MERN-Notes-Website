import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    pinned: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: null
    },
    tags: {
        type: Array,
        default: null
    }
},
    {
        timestamps: true
    }
);

const noteModel = mongoose.model("note", noteSchema);
export default noteModel;
