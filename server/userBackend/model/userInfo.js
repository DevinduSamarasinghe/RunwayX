import mongoose from "mongoose";
import User from "./user";

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
        
    },
    profession: {
        type: String
    }
})

const UserInfo = mongoose.model("UserInfo",userInfoSchema);
export default User;