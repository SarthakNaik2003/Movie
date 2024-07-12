import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import apiService from "../service/api/movieapi"
import NavDropdown from 'react-bootstrap/NavDropdown';

function MovieCard() {

    const [movies, setMovies] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentpage] = useState(1);
    const [recordsPerPage, setRecordPerPage] = useState(10)
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = movies.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(movies.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)


    const filteredMovies = movies.filter(movie =>
        movie.movie.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        setMovies(filteredMovies)
    }, [searchQuery])

    // useEffect(() => {
    //     setMovies(records)
    // }, [currentPage])



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await apiService.getAll();
            const data = response;
            console.log(data)
            setMovies(data);
        } catch (error) {
            console.error("Error fetching organizations:", error);
        }
    };




    const history = useNavigate()

    const handleClick = () => {
        history('/playlist'); // Redirects to the '/playlist' route
    };

    function prePage() {
        if (currentPage !== firstIndex) {
            setCurrentpage(currentPage - 1)
        }
    }

    function changeCPage(id) {
        setCurrentpage(id)
    }

    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentpage(currentPage + 1)
        }
    }
    function handleSelect(eventKey) {
        setRecordPerPage(Number(eventKey))
    }

    return (
        <>
            <input type="text" placeholder='search here' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <NavDropdown onSelect={handleSelect} title={`No of Page: ${recordsPerPage}`} id="navbarScrollingDropdown">
                <NavDropdown.Item eventKey='5' href="#action3">5</NavDropdown.Item>
                <NavDropdown.Item eventKey='10' href="#action3">10</NavDropdown.Item>
                <NavDropdown.Item eventKey='20' href="#action3">20</NavDropdown.Item>

            </NavDropdown>
            <div className='card-body'>


                {
                    records.map((movie, index) => (
                        <Card className='d-flex flex-column align-items-center' key={index} style={{ width: '15rem' }}>
                            <Card.Body className='d-flex flex-column align-items-center'>
                                <Link state={movie} to={`/movies/${movie.id}/${movie.movie.toLowerCase().replace(/\s+/g, '-')}`} rel="noopener noreferrer">
                                    <video className='card-img' src={movie.image} alt="Clickable Image" />
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
                        <a href="#" className='page-link' onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li key={i} className={`page-item ${currentPage === n ? 'active' : ''}`}>
                                <a className='page-link' href="#" onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={nextPage}>Next</a>
                    </li>

                </ul>
            </nav >
        </>


    )
}

export default MovieCard