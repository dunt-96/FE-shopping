import axios from "axios";

const createCart = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart/create`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export default {
    createCart
}