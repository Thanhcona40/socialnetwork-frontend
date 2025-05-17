import axios from "axios"

export const API_BASE_URL = "http://localhost:5454"

export const api = axios.create({
        baseURL: API_BASE_URL,
        headers:{
            "Content-Type":"application/json"
        }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        console.log("accesstoken:", token) // Lấy JWT mới nhất từ localStorage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // Cập nhật header Authorization
            config.headers["Content-Type"] = 'application/json'
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
                    withCredentials: true, // Tự động gửi refreshToken từ cookie
                });

                localStorage.setItem("accessToken", data.accessToken)
                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`
                originalRequest.headers["Content-Type"] = 'application/json'
                return axios(originalRequest)
            } catch(err) {
                console.error("Refresh Token failed: " ,err.response.data)
                localStorage.removeItem("accessToken");
            }
        }
        return Promise.reject(error)
    }
)