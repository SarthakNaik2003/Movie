import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const allPlaylist = async (req, res) => {
    try {
        const allMovies = await prisma.playlist.findMany()
        res.status(200).send(allMovies)
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
    }
}

const addToPlaylist = async (req, res) => {
    try {
        const movie = req.body;
        console.log(movie);  // Log the movie data to ensure it's coming correctly

        // Check if the movie already exists in the playlist
        const existingMovie = await prisma.playlist.findFirst({
            where: {
                id: Number(movie.id),  // Ensure that movie.id is valid
            }
        });

        const isMovieInPlaylist = existingMovie !== null;

        if (!isMovieInPlaylist) {
            // Movie is not in the playlist, so add it
            const movieData = await prisma.playlist.create({
                data: movie
            });
            res.status(200).send({ success: true, msg: "Movie added to playlist", movieData });
        } else {
            // Movie is already in the playlist
            res.status(200).send({ success: false, msg: "Movie already in playlist" });
        }
    } catch (error) {
        console.error("Error adding movie to playlist: ", error);  // Log the full error
        res.status(500).send({ success: false, msg: "Internal server error", error: error.message });
    }
};



const removeFromPlaylist = async (req, res) => {

    try {
        const search = "the"
        const id = req.params.id;
        const movieData = await prisma.playlist.delete({
            where: { id: parseInt(id) }
            // where: {
            //     movie: {
            //         contains: search
            //     }
            // }
        })
        res.status(200).send({ success: true, msg: "movie remove from playlist", movieData })
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
    }
}

export { allPlaylist, addToPlaylist, removeFromPlaylist }