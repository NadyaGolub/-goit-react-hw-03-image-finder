import '../styles.css';

export function ImageGalleryItem({ image, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        id={image.id}
        src={image.webformatURL}
        alt={image.tags}
        data-large={image.largeImageURL}
        onClick={onClick}
      />
    </li>
  );
}
