
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Book Store
          </Link>

          <p>
            Discover your next favorite book.
          </p>
        </div>

        <div className="footer-links">
          <h5>Quick Links</h5>

          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/cart">Cart</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Book Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

