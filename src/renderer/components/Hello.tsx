import { Link } from 'react-router-dom';

export default function Hello() {
  return (
    <div>
      <h1>My Photo Cropper</h1>
      <div className="Hello">
        <Link to="/Photo">
          <button type="button">
            <span role="img" aria-label="camera">
              📸
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
