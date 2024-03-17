import axios from 'axios';
export const axiosJWT = axios.create()

const getAllProduct = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const createProduct = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const getDetailProduct = async (id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-detail/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
const updateProduct = async (productId, data, access_token) => {
    console.log('id', productId, data)
    try {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${productId}`, data, {
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
    getAllProduct,
    createProduct,
    getDetailProduct,
    updateProduct
}