import axios from "axios";
export const axiosJWT = axios.create()

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
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-detail/${userId}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

const signUp = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const refreshToken = async (refreshToken) => {
    console.log('refreshToken', refreshToken)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {}, {
        headers: {
            token: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

export const logout = async () => {
    console.log('refreshToken', refreshToken)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`)
    return res.data
}


export default {
    loginUser,
    getDetailsUser,
    signUp,
    refreshToken,
    logout
};