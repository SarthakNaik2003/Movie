import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiService from "../service/api/movieapi";
import { debounce, isError } from "lodash";
import MovieCard from './MovieCard';
import { Pagination } from './Pagination';
import { NavDropdown } from 'react-bootstrap';

function Home() {

    const [movies, setMovies] = useState([]);
    const [totalMovies, setTotalMovies] = useState()
    const [pageNumber, setPageNumber] = useState([""])
    const [searchQuery, setSearchQuery] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isError, setIsError] = useState();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const fetchData = async () => {
        try {

            if (searchQuery === "") {
                const resMovie = await apiService.getAll(currentPage, recordsPerPage);
                setMovies(resMovie.allMovies);
                setTotalMovies(resMovie.totalMovies)
                setPageNumber(resMovie.pageNumbers)
                console.log(resMovie)
            } else {
                const resMovie = await apiService.getSearchAll(currentPage, recordsPerPage, searchQuery);
                setMovies(resMovie.allMovies);
                setTotalMovies(resMovie.totalMovies)
                setPageNumber(resMovie.pageNumbers)
                console.log(resMovie)
            }


        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchData();

    }, [searchQuery, recordsPerPage, currentPage]);

    useEffect(() => {
        setSearchParams({ page: currentPage });
        // fetchData();
    }, [currentPage, searchParams]);



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

        // setSearchParams({ page: 1 }); // Reset to first page after search
    }, [searchQuery, debouncedSearch]);

    const handleSearchChange = (e) => {

        setSearchQuery(e.target.value);
        setSearchParams({ page: 1 })
    };

    const handleSelect = (eventKey) => {
        setRecordsPerPage(Number(eventKey));
    };


    const [showAlert, setShowAlert] = useState(false);



    return (
        <>

            <div className="container">
                {/* <h1>{name}</h1> */}
                <h1 className='row justify-content-center align-items-center '>home body</h1>
                
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
                <MovieCard
                    fetchData={fetchData}
                    movies={movies}
                />
                <Pagination
                    currentPage={currentPage}
                    pageNumber={pageNumber}
                    totalMovies={totalMovies}
                />

                <div className='card-body justify-content-center align-items-center'>
                    {showAlert && (
                        <SweetAlert
                            success
                            title={isError ? "error adding playlist" : "Playlist added successfully!"}
                            onConfirm={() => setShowAlert(false)}
                        />
                    )}
                </div>

            </div>
        </>
    )
}

export default Home