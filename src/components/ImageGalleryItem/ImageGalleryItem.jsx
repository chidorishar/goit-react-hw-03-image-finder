import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem() {
  return (
    <li className={css.imageGalleryItem}>
      <img className={css.imageGalleryItem_Image} src="" alt="" />
    </li>
  );
}
