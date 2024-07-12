
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiService from "../service/api/movieapi";
import NavDropdown from 'react-bootstrap/NavDropdown';

function MovieCard() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredMovies.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(filteredMovies.length / recordsPerPage);
    const pageNumbers = [...Array(nPage + 1).keys()].slice(1);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredMovies(movies);
    }, [movies]);

    useEffect(() => {
        setSearchParams({ page: currentPage });
    }, [currentPage, setSearchParams]);

    const fetchData = async () => {
        try {
            const response = await apiService.getAll();
            const data = response;
            console.log(data);
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/playlist'); // Redirects to the '/playlist' route
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setFilteredMovies(
            movies.filter(movie =>
                movie.movie.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setSearchParams({ page: 1 }); // Reset to first page after search
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
            {/* <button onClick={handleSearchClick}>Search</button> */}
            <NavDropdown onSelect={handleSelect} title={`No of Page: ${recordsPerPage}`} id="navbarScrollingDropdown">
                <NavDropdown.Item eventKey='5' >5</NavDropdown.Item>
                <NavDropdown.Item eventKey='10' >10</NavDropdown.Item>
                <NavDropdown.Item eventKey='20' >20</NavDropdown.Item>
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
                                    <Button onClick={handleClick} variant="primary">Add to Playlist</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
            <nav className='pagi-body row justify-content-center align-items-center '>
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
        </>
    );
}

export default MovieCard;
