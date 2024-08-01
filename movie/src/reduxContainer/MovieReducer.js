import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://dummyapi.online/api/movies');
            dispatch(setMovies(response.data));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
};

export const fetchMovieDetails = (movieId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://dummyapi.online/api/movies/${movieId}`);
            dispatch(setMovieDetails(response.data));
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };
};

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        details: null,
        watchLater: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
            state.status = 'succeeded';
        },
        addToWatchLater: (state, action) => {
            state.watchLater.push(action.payload);
        },
        setMovieDetails: (state, action) => {
            state.details = action.payload;
            state.status = 'succeeded';
        },
        removeFromWatchLater: (state, action) => {
            state.watchLater = state.watchLater.filter(movie => movie.id !== action.payload);
        },

    },
});

export const { setMovies, addToWatchLater, setMovieDetails, removeFromWatchLater } = movieSlice.actions;
export default movieSlice.reducer;
