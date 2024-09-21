import axios from "axios"
const baseUrl = "http://localhost:3000"


// authentication login register 

const register = (data) => {
    const request = axios.post(`${baseUrl}/auth/register-user`, data)
    return request.then(res => res.data)
}

const loginUser = (data) => {
    const request = axios.post(`${baseUrl}/auth/login-user`, data)
    return request.then(res => res.data)
}

// Movie URL 

const getAll = (page, take) => {
    const request = axios.get(`${baseUrl}/movies?page=${page}&take=${take}`);
    return request.then(response => response.data);
}

const getSearchAll = (page, take, search) => {
    const request = axios.get(`${baseUrl}/movies?page=${page}&take=${take}&search=${search}`);
    return request.then(response => response.data);
}
const getMovieById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data)
}


// PlayList url 

const addToPlaylist = (movie) => {
    const request = axios.post(`${baseUrl}/playlist/add-playlist`, movie)
    return request.then(response => response.data)
}

const checkAllPlaylist = (movieIds) => {
    const request = axios.post(`${baseUrl}/playlist/check-playlist`, movieIds)
    return request.then(response => response.data)
}

const removePlaylist = (movieId) => {
    const request = axios.delete(`${baseUrl}/playlist/remove-playlist/${movieId}`)
    return request.then(response => response.data)
}

export default { register, loginUser, getAll, getSearchAll, getMovieById, addToPlaylist, checkAllPlaylist, removePlaylist }