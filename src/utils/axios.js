import axios from "axios";

const instance = axios.create({
    baseURL: 'https://finance-tracker-backend-git-main-nishthaa-jains-projects.vercel.app/',
    withCredentials: true
});


export default instance;