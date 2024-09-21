import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllMovies = async (req, res) => {
    try {
        const movies = await prisma.movies.findMany()
        res.status(200).send(movies)
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
    }
}

const pagiMovies = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const take = Number(req.query.take) || 5;
    const search = req.query.search || "";

    let skip = (page - 1) * take;

    try {
        // Fetch allMovies, totalMovies count, and allPlaylists
        const [allMovies, totalMovies, allPlaylist] = await Promise.all([
            prisma.movies.findMany({
                skip: skip,
                take: take,
                where: {
                    movie: {
                        contains: search
                    }
                }
            }),
            prisma.movies.count({
                where: {
                    movie: {
                        contains: search
                    }
                }
            }),
            prisma.playlist.findMany()
        ]);

        // Function to check if a movie is in a playlist
        const checkMovieInPlaylist = (allMovies, allPlaylist) => {
            return allMovies.map(movie => {
                const isInPlaylist = allPlaylist.some(playlist => playlist.id === movie.id);
                return {
                    ...movie,
                    added: isInPlaylist
                };
            });
        };

        // Get the result with added true/false
        const result = checkMovieInPlaylist(allMovies, allPlaylist);

        // Calculate number of pages
        const nPage = Math.ceil(totalMovies / take);
        const pageNumbers = nPage > 0 ? [...Array(nPage + 1).keys()].slice(1) : [];

        // Send response with paginated movies and total pages
        res.status(200).json({ totalMovies, allMovies: result, pageNumbers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};


const getMovie = async (req, res) => {
    console.log("hi")
    try {
        const id = req.params.id
        const movie = await prisma.movies.findUnique({
            where: { id: parseInt(id) }
        })
        res.status(200).send(movie)
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
    }
}

const insertMovies = async (req, res) => {
    console.log("hi")
    try {
        const newMovie = await prisma.movies.createMany({
            data: req.body
        })
        console.log(req.body)
        res.status(200).send(newMovie)
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message })
    }
}

export { getAllMovies, getMovie, insertMovies, pagiMovies }