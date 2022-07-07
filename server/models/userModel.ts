import mongoose from "mongoose";
import {IUser} from '../config/interface'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add your name"],
        trim: true,
        maxLength: [20, "Name must be of 20 characters long"]
    },
    account:{
        type: String,
        required: [true, "Please add your email or phone"],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please add your password"]
    },
    avatar:{
        type: String,
        default: 'https://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-alt/128/Users-icon.png'
    },
    role:{
        type: String,
        default: 'user' // Admin or User
    },
    type:{
        type: String,
        default: 'register' // social or phone number
    }
},{
    timestamps: true
})

export default mongoose.model<IUser>('User', userSchema)