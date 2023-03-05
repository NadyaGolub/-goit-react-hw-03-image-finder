import '../styles.css';

export function Button({ onClick }) {
  return (
    <div className="Container">
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
