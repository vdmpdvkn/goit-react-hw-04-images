import { useState } from 'react';
import fetchPhotos from 'services/imgApi';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [isModalShow, setModalShow] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const toggleLoader = () => {
    setLoading(state => !state);
  };
  const fetchPhotoOnSearchQuery = (query, page) => {
    fetchPhotos(query, page).then(data => {
      setImages(data.hits);
      setTotalImages(data.total);

      toggleLoader();
    });
  };
  const fetchPhotoOnButtonClick = (query, page) => {
    fetchPhotos(query, page).then(data => {
      setImages([...images, ...data.hits]);
      setTotalImages(data.total);

      toggleLoader();
    });
  };
  const increasePageCountOnButtonClick = () => {
    setPage(state => state + 1);
  };
  const toggleModal = () => {
    setModalShow(state => !state);
  };
  const setAppSearchQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  const setLargeImageUrl = url => {
    setModalImg(url);
  };

  return (
    <>
      <SearchBar onSubmit={setAppSearchQuery} />
      <ImageGallery
        query={query}
        setLargeImageUrl={setLargeImageUrl}
        toggleModal={toggleModal}
        fetchPhotoOnSearchQuery={fetchPhotoOnSearchQuery}
        fetchPhotoOnButtonClick={fetchPhotoOnButtonClick}
        toggleLoader={toggleLoader}
        page={page}
        images={images}
        loading={loading}
      >
        {images.length > 0 && images.length < totalImages && (
          <Button onClick={increasePageCountOnButtonClick} />
        )}
      </ImageGallery>

      {loading && <Loader />}
      {isModalShow && <Modal url={modalImg} onClose={toggleModal} />}
    </>
  );
};
