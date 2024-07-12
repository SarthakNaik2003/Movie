import axios from "axios"
const baseUrl = "https://dummyapi.online/api/movies/"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => (response.data))
}
const getMovieById = (id) => {
    const request = axios.get(`${baseUrl}${id}`);
    return request.then(response => response.data)
}

export default { getAll, getMovieById }