import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiService from "../service/api/movieapi";
import SweetAlert from 'react-bootstrap-sweetalert';
import { result } from 'lodash';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToWatchLater } from '../reduxContainer/MovieReducer';


function MovieCard({ movies, fetchData }) {

    const [showAlert, setShowAlert] = useState(false)

    const handleAddPlaylist = async (movie) => {
        try {

            const result = await apiService.addToPlaylist(movie);
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)

            }, 3000);
            fetchData();
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <div className='card-body'>
                {
                    movies.map((movie, index) => (
                        <Card className='d-flex flex-column align-items-center' key={index} style={{ width: '15rem' }}>
                            <Card.Body className='d-flex flex-column align-items-center'>
                                <Link state={movie} to={`/movies/${movie.id}/${movie.movie.toLowerCase().replace(/\s+/g, '-')}`} rel="noopener noreferrer">
                                    <video className='card-img' src={movie.image} alt="Movie video" />
                                </Link>
                                <Card.Title className='text-center'>{movie.movie}</Card.Title>
                                <div className='d-flex justify-content-center align-items-center w-100 mt-2'>
                                    {/* <Button onClick={() => handleAddPlaylist(movie)} variant="primary">Add to Playlist</Button> */}
                                    {movie.added ? (
                                        <p className="text-success">Added to Watch Later</p>
                                    ) : (
                                        <Button onClick={() => handleAddPlaylist(movie)} variant="primary">Add to Playlist</Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
            <div>
                {showAlert && (
                    < SweetAlert
                        success
                        title="movie added to playlist"
                        onConfirm={() => setShowAlert(false)}
                    />

                )}
            </div>
        </>
    )
}

export default MovieCard;
