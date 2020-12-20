import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import Modal from '../Modal/Modal';
import Button from './Button/Button';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import fetchImage from '../../service/fetchImages';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import './ImageGallery.scss';

function ImageGallery({ query }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    if (currentPage === 1) {
      return;
    }
    getImages();
  }, [currentPage]);

  useEffect(() => {
    setImages([]);
    setCurrentPage(1);
    getImages();
  }, [query]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);

  const getImages = () => {
    setIsLoading(true);

    fetchImage(query, currentPage)
      .then(res => {
        if (res.hits.length > 0) {
          toast.success('Success!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setImages(prevState => {
            if (prevState !== '') {
              return [...prevState, ...res.hits];
            }
          });
          setIsLoading(false);
        } else {
          toast.warn('Nothing found, try another query', {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(err => {
        toast.error('Error, Something went wrong, try again', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const openModal = imgId => {
    setIsModal(true);
    setModalItem(images.find(image => image.id === imgId));
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      {images.length > 0 && (
        <ul className="ImageGallery">
          {images.map(item => (
            <ImageGalleryItem key={item.id} item={item} openModal={openModal} />
          ))}
        </ul>
      )}
      {images.length > 0 ? (
        <div className="loadMoreContainer">
          {isLoading ? (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={40}
              width={40}
              timeout={4000}
            />
          ) : (
            <Button loadMore={loadMore} />
          )}
        </div>
      ) : null}
      {isModal && (
        <Modal closeModal={closeModal}>
          <img src={modalItem.largeImageURL} alt={modalItem.tags} />
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  query: propTypes.string.isRequired,
};

export default ImageGallery;
