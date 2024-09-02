
import express from "express"
import { addToPlaylist, removeFromPlaylist } from "../Controller/playlistController.js"

const playlist_route = express()
playlist_route.use(express.json())



// Add movie to playlist 
playlist_route.post("/add-playlist", addToPlaylist);


// Remove movie to playlist 
playlist_route.delete("/remove-playlist/:id", removeFromPlaylist);

export { playlist_route }