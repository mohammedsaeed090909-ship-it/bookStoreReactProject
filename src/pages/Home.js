import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home(){
    return(
<Container className="home-page">
    <Row className="home-hero align-items-center">

        <Col md={6} className="home-content">
            <span className="home-eyebrow"> Your next great read </span>
            <h1 className="home-title"> Discover Your <br /> Next Favorite Book </h1>
            <p className="home-description">
                Explore our collection of amazing books and discover stories, knowledge, and inspiration waiting for you. </p>

            <div className="home-actions">
                <Button as={Link} to="/books" className="home-primary-btn">
                    Browse Books
                </Button>
                <Button as={Link} to="/categories" className="home-secondary-btn" >
                    Explore Categories
                </Button>
            </div>
        </Col>

        <Col lg={6} md={6} className="home-image-col">
        <div className="home-image-wrapper">
            <img src="hero.png"
            className="home-image"
            alt="Book store collection"></img>

        </div>
        </Col>

    </Row>
</Container>
    )
}


export default Home;