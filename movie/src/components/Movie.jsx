import React from 'react';
// import apiService from '../service/api/movieapi';
import { Card, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

function Movie() {

    const location = useLocation()

    const movieData = location.state
    console.log(movieData)
    if (!movieData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {
                // movieData.map((movieItem, index) => (
                <Card style={{ width: '15rem' }}>
                    <Card.Body>
                        <Link to={movieData.imdb_url} target="_blank" rel="noopener noreferrer">
                            <video className='card-img' src={movieData.image} alt={movieData.movie} />
                        </Link>
                        <h3>{movieData.movie}</h3>
                        <h6 className='d-flex'>Rating : {movieData.rating}  <Rating name="half-rating-read" value={movieData.rating} precision={0.5} size="large" readOnly /></h6>


                        <div className='justify-content-center align-items-center'>
                            <Button onClick={() => handleClick(movieData.id)} variant="primary">Add to Playlist</Button>
                        </div>
                    </Card.Body>
                </Card>
                // ))
            }
        </div>
    );
}

function handleClick(movieId) {
    // Implement your logic to add the movie to the playlist
    console.log(`Adding movie with id ${movieId} to playlist`);
}

export default Movie;
