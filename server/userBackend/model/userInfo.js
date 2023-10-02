import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    user: {
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
export default UserInfo;