import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const addToPlaylist = async (req, res) => {
    try {
        const movieData = await prisma.playlist.create({
            data: req.body
            // id: req.body.id,
            // movie: req.body.movie,
            // rating: req.body.rating,
            // image: req.body.image,
            // imdb_url: req.body.imdb_url
        })
        res.status(200).send({ success: true, msg: "movie added to playlist", movieData })

    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
    }

}

const removeFromPlaylist = async (req, res) => {

    try {
        const id = req.params.id;
        const movieData = await prisma.playlist.delete({
            where: { id: parseInt(id) }
        })
        res.status(200).send({ success: true, msg: "movie remove from playlist", movieData })
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
    }
}

export { addToPlaylist, removeFromPlaylist }