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

const getAllUser = async (access_token) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-all`, {
            headers: {
                token: `Bearer ${access_token}`,
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
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {}, {
        headers: {
            token: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

export const logout = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`)
    return res.data
}

export const updateUser = async (userId, user, access_token) => {
    console.log('user id', userId, user);
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${userId}`, user, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

const deleteUser = async (userId, access_token) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${userId}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteManyUsers = async (ids: [], access_token: string) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-many`, {
            data: ids,
            headers: {
                token: `Bearer ${access_token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export default {
    loginUser,
    getDetailsUser,
    signUp,
    refreshToken,
    logout,
    updateUser,
    deleteUser,
    getAllUser,
    deleteManyUsers
};