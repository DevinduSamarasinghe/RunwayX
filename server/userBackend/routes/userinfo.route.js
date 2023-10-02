import express from "express";
import userInfoController from "../controllers/userInfo.js";

const router = express.Router();

router.post("/", userInfoController().createUserInfoService);	
router.get('/:userid', userInfoController().getUserInfoService)
router.patch('/:userid', userInfoController().updateUserInfoService)

export default router;