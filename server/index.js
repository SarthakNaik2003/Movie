import dotenv from "dotenv"
dotenv.config({})
import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

import { router } from "./src/example.js"
import { playlist_route } from "./src/Route/playlistRoute.js"
import { auth_route } from "./src/Route/authLogin.js"
import { movie_route } from "./src/Route/movie.js"



const prisma = new PrismaClient()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/eg', router)
app.use('/movies', movie_route)
app.use("/playlist", playlist_route)
app.use("/auth", auth_route)






app.all("*", (req, res) => {
    res.status(404).send({
        msg: "page not found no route possible",
        result: false
    }
    )
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server running on ${PORT} port`)
})