import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { removeFromWatchLater } from '../reduxContainer/MovieReducer';
import '../App.css';
import apiService from "../service/api/movieapi"


function Playlist() {
    // const dispatch = useDispatch();
    // const movies = useSelector(state => state.reducer.watchLater);

    const [watchLater, setWatchLater] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const fetchPlaylist = async () => {
        try {
            const data = await apiService.checkAllPlaylist();
            setWatchLater(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchPlaylist()
    }, [])
    console.log(watchLater)

    const handleRemovePlaylist = async (movieId) => {
        try {
            const removeFromWatchLater = await apiService.removePlaylist(movieId);
            console.log(removeFromWatchLater)
            setShowAlert(true);
            // dispatch(removeFromWatchLater(movieId)),
            setTimeout(() => {
                setShowAlert(false);
                fetchPlaylist()
            }, 2000);

        } catch (error) {
            console.log(error.message)
        }

    }



    return (
        <>
            <div className="container">
                <h1 className='row justify-content-center align-items-center '>Playlist</h1>
                <div className='card-body'>
                    {
                        watchLater.map((movie, index) => (
                            <Card className='d-flex flex-column align-items-center' key={index} style={{ width: '15rem' }}>
                                <Card.Body className='d-flex flex-column align-items-center'>
                                    <Link state={movie} to={`/movies/${movie.id}/${movie.movie.toLowerCase().replace(/\s+/g, '-')}`} rel="noopener noreferrer">
                                        <video className='card-img' src={movie.image} alt="Movie video" />
                                    </Link>
                                    <Card.Title className='text-center'>{movie.movie}</Card.Title>
                                    <div className='d-flex justify-content-center align-items-center w-100 mt-2'>
                                        <Button variant="danger" onClick={() => { handleRemovePlaylist(movie.id) }}>Remove </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>

                <div>
                    {showAlert && (
                        <SweetAlert
                            success
                            title="Playlist Removed successfully!"
                            onConfirm={() => setShowAlert(false)}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Playlist;
