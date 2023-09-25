import useAxiosInstance from "../axios/useAxios"

const useOrders = ()=>{

    const instance = useAxiosInstance();

    const getOrders = async()=>{
        const response = await instance.get(`orders/`)
        .catch((error)=>{
            console.log(error);
        })
        return response.data;
    }

    const getOrdersByEmail = async(email)=>{
        const response = await instance.get(`orders/email/${email}`)
        .catch((error)=>{
            console.error(error);
        });
        console.log("response from getOrdersByEmail: ", response.data);
        return response.data;
    }

    return {getOrders, getOrdersByEmail};
}

export default useOrders;
