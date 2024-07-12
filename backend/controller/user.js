import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../Models/userModel.js";
import otpModel from '../Models/otpModel.js';

import { generateOTP, sendOTP } from '../utils/otpUtils.js';

// @GET ("/user")
export const userDetails = async (req, res) => {
    try {
        const userId = req.userInfo;
        const user = await userModel.findById({ _id: userId }).select('_id name email phone photo createdAt updatedAt');

        if (!user) {
            return res.status(404).json({
                error_message: 'User not found'
            });
        }
        return res.status(200).json({
            user,
            success_message: "User Found"
        });
    } catch (error) {
        return res.status(400).json({
            error_message: "Something went wrong"
        });
    }

};

// @POST ("/register")
export const userRegister = async (req, res) => {

    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const photo = req.files.photo;
        const password = req.body.password;

        const user = await userModel.findOne({ email: email });

        let savedUser;

        if (user) {

            if (user.verify) {
                return res.status(409).json({
                    error_message: 'User already exists',
                });
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);

                savedUser = await userModel.findByIdAndUpdate(user._id, { name, email, phone, photo, password: hashedPassword }, { new: true });

            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            savedUser = new userModel({
                name,
                email,
                phone,
                photo,
                password: hashedPassword,
            });
            await savedUser.save();
        }

        // const imageData = Buffer.from(photo.data).toString('base64');

        // let userImg;
        // if ((photo.mimetype === "image/jpg") || (photo.mimetype === "image/png") || (photo.mimetype === "image/jpeg")) {

        //     userImg = Date.now() + "-" + photo.name;
        //     const newPath = path.join(process.cwd(), "images/userImage", userImg);
        //     await photo.mv(newPath);
        // }
        // else {
        //     return res.status(400).json({
        //         error_message: "File Type Error - Only Image Formats are allowed"
        //     });
        // }


        // Generate OTP
        const otp = generateOTP();

        // Save OTP record with temporary userId
        const otpRecord = new otpModel({
            userId: savedUser._id,
            otp,
        });
        await otpRecord.save();

        // Send OTP via email
        await sendOTP(email, otp);

        // Return response with OTP record _id and success message
        return res.status(201).json({
            success_message: 'OTP sent to your email.',
            otpId: otpRecord._id,
            userId: savedUser._id,
        });
    } catch (error) {
        return res.status(500).json({
            error_message: 'Something Went Wrong ' + error,
        });
    }
};

// @POST ("/validate-otp")
export const validateOTP = async (req, res) => {

    try {
        const { otp, otpId, userId } = req.body;
        console.log(req.body);

        const otpRecord = await otpModel.findById(otpId);

        if (!otpRecord) {
            return res.status(401).json({
                error_message: 'Invalid OTP Record, Try Resend OTP',
            });
        }

        // Validate OTP
        if (otpRecord.otp !== otp) {
            return res.status(401).json({
                error_message: 'Invalid OTP',
            });
        }

        // OTP validation succeeded, update user verified
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                error_message: 'User not found',
            });
        }
        user.verify = true;
        await user.save();

        // Optionally, delete the OTP record after successful validation
        await otpModel.deleteOne({ _id: otpId });

        return res.status(200).json({
            success_message: 'OTP Verified, Login Now',
            userId: user._id,
        });
    } catch (error) {
        return res.status(500).json({
            error_message: 'Something Went Wrong ' + error,
        });
    }
};


// @POST ("/resend-otp")
export const resendOTP = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                error_message: 'User not found',
            });
        }

        // Generate and save new OTP
        const otp = generateOTP();
        const updatedOtpRecord = await otpModel.findOneAndUpdate(
            { userId },
            { otp },
            { new: true, upsert: true }
        );

        // Send OTP via email
        await sendOTP(user.email, otp);

        return res.status(200).json({
            success_message: 'OTP Resent',
            otpId: updatedOtpRecord._id,
        });
    } catch (error) {
        return res.status(500).json({
            error_message: 'Something Went Wrong ' + error,
        });
    }
};

// @POST ("/login")
export const userLogin = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userModel.findOne({ email: email });

        if (user) {
            const isVerify = user.verify;

            if (!isVerify) {
                return res.status(401).json({
                    error_message: 'Invalid email or password',
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    error_message: 'Invalid email or Password'
                });
            }

            const token = jwt.sign({ credential: user._id }, process.env.USER_SECRET_KEY, { expiresIn: '7d' });
            // Send token in Authorization header
            res.set('Authorization', `Bearer ${token}`);
            return res.status(200).json({
                success_message: "User Logged In",
                token: token
            });
        } else {
            return res.status(401).json({
                error_message: 'Invalid Email or password'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error_message: "Something Went Wrong " + error
        });
    }
};

// @PUT ("/update")
export const updateUserDetails = async (req, res) => {
    try {
        const userId = req.userInfo;
        const name = req.body.name;
        const phone = req.body.phone;

        let photo;
        if (req.files && req.files.photo) {
            photo = req.files.photo;
        }

        const user = await userModel.findById({ _id: userId });

        if (!user) {
            return res.status(404).json({
                error_message: 'User not found'
            });
        } else {

            if (name) {
                user.name = name;
            }
            if (phone) {
                user.phone = phone;
            }
            if (photo) {
                user.photo = photo;
            }
            await user.save();

            return res.status(200).json({
                success_message: "User Details Updated Successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error_message: "Something Went Wrong " + error
        });
    }
};

// @PUT ("/update-password")
export const updateUserPassword = async (req, res) => {

    try {
        const userId = req.userInfo;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                error_message: 'All fields are required'
            });
        }

        const user = await userModel.findById({ _id: userId });

        if (!user) {
            return res.status(404).json({
                error_message: 'User not found'
            });
        } else {
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    error_message: 'Invalid old password'
                });
            } else {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;
                await user.save();

                return res.status(200).json({
                    success_message: 'Password updated successfully'
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            error_message: "Something Went Wrong " + error
        });
    }
};
