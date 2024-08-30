import axios from "axios"
const baseUrl = "http://localhost:3000/movies/"

const getAll = () => {
    const request = axios.get(`${baseUrl}/movies`)
    return request.then(response => (response.data))
}
const getMovieById = (id) => {
    const request = axios.get(`${baseUrl}${id}`);
    return request.then(response => response.data)
}

export default { getAll, getMovieById }