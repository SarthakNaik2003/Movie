// this file is action creator 
import { addIn, addMovie } from "./MovieType"

const add = () => {
    return {
        type: addIn
    }
}
const addToPlaylist = () => {
    return {
        type: addMovie
    }
}

export { add, addToPlaylist } 
