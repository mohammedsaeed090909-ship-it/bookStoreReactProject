import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import { fetchBooks } from "../rtk/slices/books-slice";
import { addToCart } from "../rtk/slices/cart-slice";
import "../styles/books.css";

function Books (){
    // const [books, setBooks]=useState([]);
    // useEffect(() => {
    //     fetch("http://localhost:9000/books")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setBooks(data);
    //         });
    // }, []);
    const search = useSelector((state)=>state.books.search)
    const books = useSelector ((state)=>state.books.books);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1)
    const booksPerPage = 8;


    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const category = searchParams.get("category");
    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = !category || book.category === category;
        return matchesSearch && matchesCategory;
    });
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage)
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const startIndex = (currentPage -1) * booksPerPage
    const endIndex = startIndex + booksPerPage
    const displayedBooks = filteredBooks.slice(startIndex, endIndex);

    useEffect(() => {
    setCurrentPage(1);
    }, [search, category]);

    const filterCategories =[...new Set(
    books.map((book)=>
    book.category))
]
    return(
        <Container className="books-page">
            <div className="books-header">
                <h1 className="books-heading">Books</h1>
                <div className="category-filters">
                    <Button
                    className={`category-btn ${!category ? "active" : ""}`}
                    onClick={() => navigate("/books")}>   
                        All</Button>

                    {filterCategories.map((cat)=>
                    <Button key={cat} className={`category-btn ${category === cat ? "active" : ""}`} 
                        onClick={()=>{navigate(`/books?category=${cat}`)
                    }}>{cat}</Button>
                    )}
                </div>
            </div>
            <Row className="books-grid g-4">
                {displayedBooks.map((book)=>(
                <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="book-card">
                    <div className="book-image-wrapper">
                        <Card.Img className="book-image" variant="top" src={book.image} />
                    </div>
                    <Card.Body>
                        <Card.Title className="book-title">{book.title}</Card.Title>
                        <Card.Text className="book-description">{book.description}</Card.Text>
                        <div className="book-price">{book.price} $</div>
                        <div className="book-actions">
                            <Button className="btn-details" as={Link} to={`/books/${book.id}`} variant="primary">View Details</Button>
                            <Button className="btn-cart" onClick={() => dispatch(addToCart(book))} variant="primary">Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
                ))}
            </Row>
            <div className="pagination">
                <Button className="pagination-btn" onClick={() => {
                    setCurrentPage(Math.max(currentPage - 1, 1));
                }}>
                Previous</Button>
                {pages.map((page)=> (
                    <Button key={page}className={`pagination-btn ${currentPage === page ? "active" : ""}`} 
                onClick={()=>{
                        setCurrentPage(page)
                    }}>{page}</Button>
                ))}
                <Button className="pagination-btn" onClick={() => {
                    setCurrentPage(Math.min(currentPage + 1, totalPages));
                }}>
                Next</Button>
            </div>
        </Container>
    )
}

export default Books;