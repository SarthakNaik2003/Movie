import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIn, fetchMovies } from '../reduxContainer/MovieReducer';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Playlist() {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.reducer.PlaylistMovie);


    console.log(movies)



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
                                        <Button variant="primary">Add to Playlist</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>

            </>
        </>
    );
}

export default Playlist;
