import { mongoose } from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, "User Email is required"],
        unique: true,
        trim: true,
        lowerCase: true,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "User Password is needed"],
        minLength: 6
    }
}, { timestamps: true })

const User = mongoose.model('User', userModel);

export default User;