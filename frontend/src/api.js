import axios from "axios";

const API = axios.create({

    baseURL:
    "https://candidate-shortlisting-backend-nlh1.onrender.com/api"

});

export default API;