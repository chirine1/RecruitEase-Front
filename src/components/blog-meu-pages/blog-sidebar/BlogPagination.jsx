import React from "react";

const BlogPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <nav className="ls-pagination">
      <ul>
        <li className="prev" onClick={() => handlePageChange(currentPage - 1)}>
          <a href="#">
            <i className="fa fa-arrow-left"></i>
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} onClick={() => handlePageChange(index + 1)}>
            <a href="#" className={index + 1 === currentPage ? "current-page" : ""}>
              {index + 1}
            </a>
          </li>
        ))}
        <li className="next" onClick={() => handlePageChange(currentPage + 1)}>
          <a href="#">
            <i className="fa fa-arrow-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default BlogPagination;
