import { PrismaClient } from "@prisma/client"
import express from "express"
import cors from "cors"

const movies = express()
movies.use(express.json())

const prisma = new PrismaClient()



movies.use(
    cors({
        origin: "*", // allow to server to accept request from different origin
        methods: "GET,POST,PUT",
        credentials: true, // allow session cookie from browser to pass through
    })
);

movies.get("/", async (req, res) => {
    const allMovies = await prisma.movies.findMany()
    res.json(allMovies)
})

// import data of movie from json formate 
movies.post("/insertMovie", async (req, res) => {
    const newMovie = await prisma.movies.createMany({
        data: req.body
    })
    res.json(newMovie)
})

export { movies }