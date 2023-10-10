import useUserAxiosInstance from "../axios/userHook/useUserAxios";

const useUserInfo = ()=>{
    const instance = useUserAxiosInstance();

    const getUserInfoByUserId = async(userid)=>{
        const response = await instance.get(`info/${userid}`)
        .catch((error)=>{
            console.error(error);
        })

        console.log("axios userinfo", response.data);
        return response.data;
    }
    
    const createUserInfo = async(userInfo)=>{

        console.log("UserInfo at axios Create userInfo " + userInfo);

        const response = await instance.post(`info/`, userInfo)
        .catch((error)=>{
            console.error(error);
        })
        console.log(response.data);
        return response.data;
    }

    const updateUserInfo = async(userid)=>{
        const response = await instance.patch(`info/${userid}`)
        .catch((error)=>{
            console.error(error);
        })
        return response.data;
    }

    return {getUserInfoByUserId,createUserInfo, updateUserInfo};
}

export default useUserInfo;