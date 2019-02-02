import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = (props) => {
    return (
        <div className="Pagination">
            <button 
            className="Pagination-button"
            onClick={() => props.handlePaginationClick('prev')}
            disabled={props.page <= 1}
            >&larr;</button>

            <span className="Pagination-info">
                Page <b>{props.page}</b> of <b>{props.totalPages}</b>
            </span>

            <button 
            className="Pagination-button"
            onClick={() => props.handlePaginationClick('next')}
            disabled={props.page >= props.totalPages}
            >&rarr;</button>
        </div>
    );
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handlePaginationClick: PropTypes.func.isRequired
};

export default Pagination;