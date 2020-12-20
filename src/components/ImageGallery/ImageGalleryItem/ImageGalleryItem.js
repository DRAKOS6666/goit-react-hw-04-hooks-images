import React from 'react';
import propTypes from 'prop-types';

function ImageGalleryItem({ item, openModal }) {
  return (
    <li className="ImageGalleryItem">
      <img
        id={item.id}
        onClick={() => openModal(item.id)}
        className="ImageGalleryItem-image"
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: propTypes.object.isRequired,
  openModal: propTypes.func.isRequired
}

export default ImageGalleryItem;
