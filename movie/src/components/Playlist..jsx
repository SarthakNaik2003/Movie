import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeFromWatchLater } from '../reduxContainer/MovieReducer';


function Playlist() {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.reducer.watchLater);
    const [showAlert, setShowAlert] = useState(false);


    console.log(movies)

    const handleRemovePlaylist = (movieId) => {
        setShowAlert(true);
        dispatch(removeFromWatchLater(movieId)),
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
    }



    return (
        <>

            <div>Playlist.</div>

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

            </>
        </>
    );
}

export default Playlist;
