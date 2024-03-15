import axios from "axios";

const loginUser = async (data: {}) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const getDetailsUser = async (userId, access_token) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-detail/${userId}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

export default {
    loginUser,
    getDetailsUser
};