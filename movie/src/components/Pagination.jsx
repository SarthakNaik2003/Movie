import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Pagination = ({ pageNumber, currentPage, totalMovies }) => {
    const [searchParams, setSearchParams] = useSearchParams();


    const prePage = () => {
        if (currentPage > 1) {
            setSearchParams({ page: currentPage - 1 });
        }
    };

    const changeCPage = (id) => {
        setSearchParams({ page: id });
    };

    const nextPage = () => {
        if (currentPage < pageNumber.length) {
            setSearchParams({ page: currentPage + 1 });
        }
    };

    return (
        <div className='pagi-body row'>
            <ul className='pagination justify-content-center flex-wrap'>
                <li className='page-item'>
                    <Link className='page-link' to={`?page=${currentPage - 1}`} onClick={(e) => { e.preventDefault(); prePage(); }}>Prev</Link>
                </li>
                {
                    pageNumber.map((n, i) => (
                        <li key={i} className={`page-item ${currentPage === n ? 'active' : ''}`}>
                            <Link className='page-link' to={`?page=${n}`} onClick={(e) => { e.preventDefault(); changeCPage(n); }}>{n}</Link>
                        </li>
                    ))
                }
                <li className='page-item'>
                    <Link className='page-link' to={`?page=${currentPage + 1}`} onClick={(e) => { e.preventDefault(); nextPage(); }}>Next</Link>
                </li>
            </ul>
        </div>
    )
}

export { Pagination }