import User from "../model/user.js";
import UserInfo from "../model/userInfo.js";


const userInfoController = ()=>{
    const createUserInfoService = async(req,res)=>{
        try{
            const {userid, age, gender, address, profession,bio,phone} = req.body;
            
            //check if the userid exists in the body
            if(!userid) return res.status(400).json("UserId is required");
            
            //check if the user exists in DB
            const user = User.findById(userid);
            if(!user) return res.status(404).json({error: "User not found"});

            //check if the user matches the userInfo database
            let isMatch = await UserInfo.findOne({user: userid}).populate("user").select("+password");
            if(isMatch) return res.status(200).send({error: "User's info already created", data: isMatch});
            
            //creating a new userinfo
            let newUserInfo = new UserInfo({user: userid, age, gender, address, profession,bio,phone});
            await newUserInfo.save();

            newUserInfo = await UserInfo.findOne({user: userid}).populate("user").select("+password");
            return res.status(201).json(newUserInfo);
            
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    const getUserInfoService = async(req,res)=>{
        try{
            const {userid} = req.params;
            console.log(userid);
            const userInfo = await UserInfo.findOne({user: userid}).populate("user").select("-password");

           // if(!userInfo) return res.status(200).json(null);

            console.log(userInfo);
            return res.status(200).json(userInfo);

        }catch(error){
            return res.status(400).send(error.message);
        }
    }

    const updateUserInfoService = async(req,res)=>{
        try{
            const {userid} = req.params;
            const {age, gender, address, profession} = req.body;
            const userInfo = await UserInfo.findOneAndUpdate({user: userid},{age,gender,address,profession});
            
            //validation to see if the userinfo gets updated or not 
            if(!userInfo) return res.status(404).send("User's info not created or found!");
            
            return res.status(201).json(userInfo);

        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    const updateAllUserInfo = async(req,res)=>{
        try{
            const {userid} = req.params;
            const {firstName, lastName, email, age, gender, address, profession,bio,phone} = req.body;
            
            //Now from populate we change information of the User as well
            await User.findOneAndUpdate({_id: userid},{firstName, lastName,email});
            const updatedUserInfo = await UserInfo.findOneAndUpdate({user: userid},{age,gender,address,profession,bio,phone}).populate('user').select('-password');

            return res.status(201).json(updatedUserInfo);
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    return {createUserInfoService, getUserInfoService, updateUserInfoService, updateAllUserInfo}
}

export default userInfoController;
