import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

// Automatically send JWT token with every request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getBooks = async (
    search = "",
    page = 1,
    limit = 5
) => {
    const response = await API.get(
        `/books?search=${search}&page=${page}&limit=${limit}`
    );

    return response.data;
};

export const getBookById = async (id) => {
    const response = await API.get(`/books/${id}`);

    return response.data;
};

export default API;