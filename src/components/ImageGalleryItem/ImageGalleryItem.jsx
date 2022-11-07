import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ imageData, onImageClickCallback }) {
  const { id, webformatURL, largeImageURL } = imageData;
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => onImageClickCallback({ id, largeImageURL })}
    >
      <img
        className={css.imageGalleryItem_Image}
        src={webformatURL}
        alt={`id: ${id}`}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onImageClickCallback: PropTypes.func.isRequired,
};
