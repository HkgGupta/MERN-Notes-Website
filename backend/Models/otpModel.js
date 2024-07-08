import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 5 minutes
    }
});

const otpModel = mongoose.model('OTP', otpSchema);

export default otpModel;
