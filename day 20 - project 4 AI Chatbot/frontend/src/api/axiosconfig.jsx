import axios from "axios";

const instance = axios.create({
    baseURL : "http://localhost:3000/",
    // withCredentials : true
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
    }, function (error) {
        return Promise.reject(error);
    });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


export default instance;