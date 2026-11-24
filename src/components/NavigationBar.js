import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useNavigate } from 'react-router-dom';
import { setSearch } from '../rtk/slices/books-slice';
import { useState } from 'react';
import { Badge } from 'react-bootstrap';
import "../styles/navbar.css"

function NavigationBar(){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [search, setSearchInput] = useState("");
    // const search = useSelector((state) => state.books.search);

    const cart = useSelector((state)=>state.cart || []);
    return(
            <Navbar expand="lg" className="main-navbar" fixed="top">
            <Container>
            <Navbar.Brand as={Link} to="/">Book store</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                <Nav.Link as={Link} to={"/books"}>Books</Nav.Link>
                <Nav.Link as={Link} to={"/categories"}>Categories</Nav.Link>
                <Nav.Link as={Link} to={"/cart"}>Cart <Badge bg='danger'>{cart.length}</Badge> </Nav.Link>
            </Nav>
            <Form className="d-flex"
            onSubmit={(e) => {
            e.preventDefault();
            dispatch(setSearch(search));
            navigate("/books");
            }}>
                <Form.Control
                type="search"
                placeholder="Search books..."
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e)=>setSearchInput(e.target.value)}
                />
                <Button type='submit' variant="outline-success">Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavigationBar;