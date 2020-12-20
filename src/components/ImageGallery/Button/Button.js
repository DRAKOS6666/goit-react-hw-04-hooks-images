import React from 'react';
import propTypes from 'prop-types';

function Button({ loadMore }) {
  return (
    <button type="button" onClick={loadMore} className="Button">
      Load More
    </button>
  );
}

Button.propTypes = {
  loadMore: propTypes.func.isRequired,
};

export default Button;
