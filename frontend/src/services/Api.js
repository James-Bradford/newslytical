import axios from "axios";
export default axios.create({ 
    baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'https://api.newslytical.uk/api' 
    });