import axios from 'axios';


const getAllProduct = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export default {
    getAllProduct
}