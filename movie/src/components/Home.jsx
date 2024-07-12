import React from 'react'
import MovieCard from './MovieCard'
import Paginate from './Paginate'

function Home() {
    return (
        <>

            <div className="container">
                <h1 className='row justify-content-center align-items-center '>home body</h1>
                <MovieCard />

            </div>
        </>
    )
}

export default Home