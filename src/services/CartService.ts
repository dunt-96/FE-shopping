import axios from "axios";

const createCart = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart/create`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const getAllItems = async (searchString = '', limit = 0) => {
    try {
        let res;
        if (searchString.length > 0) {
            res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/get-all?filter=name&filter=${searchString}&limit=${limit}`);
        } else {
            if (limit === 0) {
                res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/get-all`);
            }
            else {
                res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/get-all?limit=${limit}`);
            }
        }
        return res;
    } catch (error) {
        console.log(error);
    }
}

const deleteItemInCart = async (productId: string) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/delete/${productId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteManyItemsInCart = async (ids: string[]) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/delete-many`, {
            data: ids,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export default {
    createCart,
    getAllItems,
    deleteItemInCart,
    deleteManyItemsInCart
}