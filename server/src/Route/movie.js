import express from "express"
import { getAllMovies, getMovie, insertMovies, pagiMovies } from "../Controller/movieController.js"

const movie_route = express()
movie_route.use(express.json())

// get data of movies by pagination
movie_route.get("/", pagiMovies)




// get all movies 
movie_route.get("/all", getAllMovies)

// get perticular movie by id 
movie_route.post("/:id", getMovie)

// import data of movie from json formate 
movie_route.post("/add/insertMovie", insertMovies)

export { movie_route }