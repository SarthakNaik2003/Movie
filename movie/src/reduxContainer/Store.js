import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./MovieReducer";

export const store = configureStore({
    reducer: {
        reducer: MovieReducer,
    }
})

export default store