import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiService from "../service/api/movieapi";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { debounce } from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchLater } from '../reduxContainer/MovieReducer';

function MovieCard() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = movies.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(movies.length / recordsPerPage);
    const pageNumbers = [...Array(nPage + 1).keys()].slice(1);

    const fetchData = async () => {
        try {
            const response = await apiService.getAll();
            setMovies(response);
            console.log(response)
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        // fetchData();
        if (!searchQuery) {
            fetchData();
        }
    }, [searchQuery]);

    useEffect(() => {
        setSearchParams({ page: currentPage });
    }, [currentPage, setSearchParams]);

    const debouncedSearch = useCallback(
        debounce((term) => {
            if (term) {
                setMovies((prevMovies) =>
                    prevMovies.filter((movie) =>
                        movie.movie.toLowerCase().includes(term.toLowerCase())
                    )

                );
            }
            // } else {
            //     fetchData();
            //     console.log(movies)
            // }
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(searchQuery);
        setSearchParams({ page: 1 }); // Reset to first page after search
    }, [searchQuery, debouncedSearch, setSearchParams]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const prePage = () => {
        if (currentPage > 1) {
            setSearchParams({ page: currentPage - 1 });
        }
    };

    const changeCPage = (id) => {
        setSearchParams({ page: id });
    };

    const nextPage = () => {
        if (currentPage < nPage) {
            setSearchParams({ page: currentPage + 1 });
        }
    };

    const handleSelect = (eventKey) => {
        setRecordsPerPage(Number(eventKey));
    };

    const watchLater = useSelector(state => state.reducer.watchLater);
    const dispatch = useDispatch();

    const isMovieInWatchLater = (movie) => {
        return watchLater.find(item => item.id === movie.id);
    };

    const [showAlert, setShowAlert] = useState(false);

    const handleAddPlaylist = (movie) => {
        setShowAlert(true);
        dispatch(addToWatchLater(movie));
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    return (
        <>
            <input
                type="text"
                placeholder='Search here'
                value={searchQuery}
                onChange={handleSearchChange}
                name='searchQuery'
            />
            <NavDropdown onSelect={handleSelect} title={`No of Page: ${recordsPerPage}`} id="navbarScrollingDropdown">
                <NavDropdown.Item eventKey='5'>5</NavDropdown.Item>
                <NavDropdown.Item eventKey='10'>10</NavDropdown.Item>
                <NavDropdown.Item eventKey='20'>20</NavDropdown.Item>
            </NavDropdown>
            <div className='card-body'>
                {
                    records.map((movie, index) => (
                        <Card className='d-flex flex-column align-items-center' key={index} style={{ width: '15rem' }}>
                            <Card.Body className='d-flex flex-column align-items-center'>
                                <Link state={movie} to={`/movies/${movie.id}/${movie.movie.toLowerCase().replace(/\s+/g, '-')}`} rel="noopener noreferrer">
                                    <video className='card-img' src={movie.image} alt="Movie video" />
                                </Link>
                                <Card.Title className='text-center'>{movie.movie}</Card.Title>
                                <div className='d-flex justify-content-center align-items-center w-100 mt-2'>
                                    {isMovieInWatchLater(movie) ? (
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
            <nav className='pagi-body row justify-content-center align-items-center'>
                <ul className='pagination'>
                    <li className='page-item'>
                        <Link className='page-link' to={`?page=${currentPage - 1}`} onClick={(e) => { e.preventDefault(); prePage(); }}>Prev</Link>
                    </li>
                    {
                        pageNumbers.map((n, i) => (
                            <li key={i} className={`page-item ${currentPage === n ? 'active' : ''}`}>
                                <Link className='page-link' to={`?page=${n}`} onClick={(e) => { e.preventDefault(); changeCPage(n); }}>{n}</Link>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <Link className='page-link' to={`?page=${currentPage + 1}`} onClick={(e) => { e.preventDefault(); nextPage(); }}>Next</Link>
                    </li>
                </ul>
            </nav>
            <div>
                {showAlert && (
                    <SweetAlert
                        success
                        title="Playlist added successfully!"
                        onConfirm={() => setShowAlert(false)}
                    />
                )}
            </div>
        </>
    );
}

export default MovieCard;
