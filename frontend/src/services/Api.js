import axios from "axios";

const baseDomain = "http://172.16.0.25:4000";
const baseURL = `${baseDomain}/api`;

export default axios.create({ baseURL });