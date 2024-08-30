import React, { useContext } from 'react'
import MovieCard from './MovieCard'
import Paginate from './Paginate'
import { useGlobalContext } from './context'

function Home() {
    const name = useGlobalContext();
    return (
        <>

            <div className="container">
                {/* <h1>{name}</h1> */}
                <h1 className='row justify-content-center align-items-center '>home body</h1>
                <MovieCard />

            </div>
        </>
    )
}

export default Home