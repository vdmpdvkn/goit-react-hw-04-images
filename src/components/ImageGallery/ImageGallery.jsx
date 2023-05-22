import { useEffect } from 'react';
import propTypes from 'prop-types';
import { Gallery, GalleryContainer } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Notification } from 'components/Notification/Notification';

const ImageGallery = ({
  query,
  setLargeImageUrl,
  toggleModal,
  fetchPhotoOnSearchQuery,
  fetchPhotoOnButtonClick,
  toggleLoader,
  page,
  images,
  children,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (query === '') {
      return;
    }
    if (page === 1) {
      fetchPhotoOnSearchQuery(query, page);
      toggleLoader();
      return;
    }
    if (page > 1) {
      fetchPhotoOnButtonClick(query, page);
      toggleLoader();
      return;
    }
  }, [query, page]);
  const getLargeImageUrl = event => {
    setLargeImageUrl(event.target.dataset.large);
    toggleModal();
  };

  return (
    <>
      {images.length ? (
        <GalleryContainer>
          <Gallery>
            {images.map(image => (
              <ImageGalleryItem
                image={image}
                key={image.id}
                onClick={getLargeImageUrl}
              />
            ))}
          </Gallery>
          {children}
        </GalleryContainer>
      ) : (
        <Notification title={"You haven't searched yet"} />
      )}
    </>
  );
};
ImageGallery.propTypes = {
  query: propTypes.string.isRequired,
  setLargeImageUrl: propTypes.func.isRequired,
  toggleModal: propTypes.func.isRequired,
  fetchPhotoOnSearchQuery: propTypes.func.isRequired,
  fetchPhotoOnButtonClick: propTypes.func.isRequired,
  toggleLoader: propTypes.func.isRequired,
  page: propTypes.number.isRequired,
  images: propTypes.array.isRequired,
};
export default ImageGallery;
