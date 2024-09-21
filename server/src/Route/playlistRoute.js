
import express from "express"
import { allPlaylist, addToPlaylist, removeFromPlaylist } from "../Controller/playlistController.js"

const playlist_route = express()
playlist_route.use(express.json())

// playlist movie page 
playlist_route.post("/check-playlist", allPlaylist);



// Add movie to playlist 
playlist_route.post("/add-playlist",authMiddleware,addToPlaylist);


// Remove movie to playlist 
playlist_route.delete("/remove-playlist/:id", removeFromPlaylist);

export { playlist_route }