import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { fetchBooks } from "../rtk/slices/books-slice";
import { addToCart } from "../rtk/slices/cart-slice";
import "../styles/book-details.css";


function BookDetails(){
    const {id} = useParams();
    const books = useSelector((state)=>state.books.books);
    const dispatch = useDispatch()
    useEffect(()=>{
            dispatch(fetchBooks())
    },[dispatch])

    const book = books.find((book)=>
        String(book.id) === String(id)
    );
    if(!book){
        return(
        <Container className="book-details-page">
            <div className="book-loading">
                <h2>Loading...</h2>
            </div>
        </Container>)
    }

    return(
        <Container className="book-details-page">
            <Row className="book-details">
                <Col lg={5} className="book-details-image-col">
                <div className="book-details-image-wrapper">
                    <img className="book-details-image" src={book.image} alt={book.title}/>
                </div>
                </Col>
                <Col lg={7} className="book-details-content">
                    <span className="book-details-category"> {book.category} </span>
                    <h1 className="book-details-title">{book.title}</h1>
                    {/* <h4 className="text-muted"> {book.author}</h4> */}
                    <p className="book-details-author"> {book.description}</p>
                    <div className="book-details-rating">
                        <span>★</span>
                        <strong>{book.rating.rate}</strong>
                        <span className="rating-count">({book.rating.count} reviews)</span>
                    </div>
                    <p className="book-details-description"> {book.description} </p>
                    <div className="book-details-price"> {book.price} EGP </div>

                    <div className="book-details-actions">
                        <Button className="add-cart-btn" onClick={() => dispatch(addToCart(book))} variant="primary" >Add to Cart</Button>
                        <Button className="back-books-btn" as={Link} to="/books" variant="secondary"> Back to Books</Button>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default BookDetails;