import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery() {
  return (
    <ul className={css.imageGallery}>
      <ImageGalleryItem />
    </ul>
  );
}
