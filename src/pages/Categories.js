
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Container, Row, Col} from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { fetchBooks } from '../rtk/slices/books-slice';
import { useEffect } from 'react';
import "../styles/categories.css";

function Categories(){
    const books = useSelector ((state)=>state.books.books);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);

    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(fetchBooks());
    }, [dispatch]);

    if (loading) {
    return <h2>Loading...</h2>;
    }
    if (error) {
    return <h2>Error: {error}</h2>;
    }
    const filterCategories =[...new Set(
        books.map((book)=>book.category))
    ]
    return(
        <Container className="categories-page">
            <div className="categories-header">
                <h1 className="categories-heading">Categories</h1>
                <p>Explore our collection by category</p>
            </div>
            <Row className="categories-grid g-4">
            {filterCategories.map((cat) => {
            const categoryBooks = books.filter(
                (book) => book.category === cat
            );
            return (
                <Col key={cat} xs={12} sm={6} md={4} lg={3}>
                    <Card className="category-card">
                        <div className="category-image-wrapper">
                            <Card.Img className="category-image" variant="top" src={categoryBooks[0]?.image} />
                        </div>
                        <Card.Body>
                            <Card.Title className="category-title">{cat}</Card.Title>
                            <Card.Text className="category-count">{categoryBooks.length} Books</Card.Text>
                            <Button className="category-view-btn" 
                            onClick={() => navigate(`/books?category=${cat}`)}>
                                View Books</Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
            })}
            </Row>
        </Container>
    )
}

export default Categories;