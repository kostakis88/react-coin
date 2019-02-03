import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = (props) => {
    return <div className="Loading" style={{
                    width: props.width, 
                    height: props.height
                }}
            >
        </div>;
}

Loading.defaultProps = {
    width: '28px',
    height: '28px'
};

Loading.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
}

export default Loading;