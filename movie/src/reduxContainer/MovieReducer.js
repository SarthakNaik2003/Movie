import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://dummyapi.online/api/movies/';

const initialState = {
    NumberOfMovie: 20,
    PlaylistMovie: [
        {
            id: 1,
            image: "images/shawshank.jpg",
            imdb_url: "https://www.imdb.com/title/tt0111161/",
            movie: "The Shawshank Redemption",
            rating: 9.2
        },
    ],
    status: 'idle',
    error: null
};

// Thunk function to fetch movies
export const fetchMovies = () => async (dispatch) => {
    dispatch(fetchMoviesRequest());
    try {
        const response = await axios.get(API_URL);
        dispatch(fetchMoviesSuccess(response.data));
    } catch (error) {
        dispatch(fetchMoviesFailure(error.message));
    }
};

const movieSlice = createSlice({
    name: 'Movie',
    initialState,
    reducers: {
        addIn: (state, action) => {
            state.NumberOfMovie += 1;
        },
        fetchMoviesRequest: (state) => {
            state.status = 'loading';
        },
        fetchMoviesFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        fetchMoviesSuccess: (state, action) => {
            state.status = 'succeeded';
            state.PlaylistMovie = action.payload;
        },
        addToPlayList: (state, action) => {
            const Movie = {
                id: state.PlaylistMovie.length + 1,
                ...action.payload
            }
            state.PlaylistMovie.push(Movie)
        },
    },
});

export const { addIn, fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesFailure, addToPlayList } = movieSlice.actions;
export default movieSlice.reducer;
