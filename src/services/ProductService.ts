import axios from 'axios';
export const axiosJWT = axios.create()

const getAllProduct = async (searchString, limit = 0) => {
    try {
        let res;
        if (searchString.length > 0) {
            res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${searchString}&limit=${limit}`);
        } else {
            if (limit === 0) {
                res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
            }
            else {
                res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`);
            }
        }
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

const deleteProduct = async (productId, access_token) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${productId}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteManyProducts = async (ids: [], access_token: string) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete-many`, {
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
    getAllProduct,
    createProduct,
    getDetailProduct,
    deleteManyProducts,
    updateProduct,
    deleteProduct
}