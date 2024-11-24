import axios from "axios";

const instance = axios.create({
    baseURL: 'https://finance-tracker-backend-delta.vercel.app/',
    withCredentials: true
});


export default instance;