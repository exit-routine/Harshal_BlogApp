import React from 'react'
import './Pagination.css'
const Pagination = ({ totalBlogs, postsPerPage, setCurrentPage ,currentPage}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalBlogs / postsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className='pagination'>
            {
                pages.map((page, index) => {
                    return <button className={page===currentPage? "bt" :""} key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination
