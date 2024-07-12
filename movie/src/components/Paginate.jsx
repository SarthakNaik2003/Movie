import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginate = () => {
  const [active, setActive] = useState(1); // State to track active page

  const handlePageChange = (pageNumber) => {
    setActive(pageNumber);
  };

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className='pagi-body row justify-content-center align-items-center '>
      <Pagination className=''>{items}</Pagination>
      <br />
    </div>
  );
};

export default Paginate;
