import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery({ imagesData, onImageClickCallback }) {
  return (
    <ul className={css.imageGallery}>
      {imagesData.map(item => (
        <ImageGalleryItem
          key={'' + item.id}
          imageData={item}
          onImageClickCallback={onImageClickCallback}
        />
      ))}
    </ul>
  );
}
