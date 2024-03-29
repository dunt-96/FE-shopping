import axios from "axios";

const createOrder = async (data, access_token) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
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
    createOrder
}