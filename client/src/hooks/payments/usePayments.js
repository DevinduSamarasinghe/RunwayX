import useAxiosInstance from "../axios/useAxios"

const usePayments = ()=>{

    const instance = useAxiosInstance();

    const getPaymentsByEmail = async(email)=>{
        const response = await instance.get(`payment/${email}`)
        .catch((error)=>{
            console.error(error);
        })
        return response.data;
    }

    return {getPaymentsByEmail};
}

export default usePayments;