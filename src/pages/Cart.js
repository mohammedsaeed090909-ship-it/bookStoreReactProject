import { useDispatch, useSelector } from "react-redux";
import { Container, Table, Button } from "react-bootstrap";
import { deleteFromCart, Cleare, increaseQuantity, decreaseQuantity } from "../rtk/slices/cart-slice";
import "../styles/cart.css";

function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const totalPrice = cart.reduce(
        (acc, book) => acc + book.price * book.quantity,
        0
    );
    return (
        <Container className="cart-page">
            <div className="cart-header">
                <h1 className="cart-heading">Shopping Cart</h1>
                <p>Review your books before checkout</p>
            </div>
            {cart.length === 0 ? (<div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Start adding some books to your cart.</p>
            </div>) : 
            (
                <>
                    <Table className="cart-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Book</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="cart-book-image"
                                        />
                                    </td>

                                    <td>{book.title}</td>

                                    <td>{book.price} EGP</td>

                                    <td>
                                        <div className="quantity-control">
                                            <Button
                                                className="quantity-btn"
                                                onClick={() => dispatch(decreaseQuantity(book))}
                                            >
                                                -
                                            </Button>

                                            <span className="quantity-value">
                                                {book.quantity}
                                            </span>

                                            <Button
                                                className="quantity-btn"
                                                onClick={() => dispatch(increaseQuantity(book))}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </td>

                                    <td>
                                        {book.price * book.quantity} EGP
                                    </td>

                                    <td>
                                        <Button
                                            className="delete-btn"
                                            onClick={() =>
                                                dispatch(deleteFromCart(book))
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="cart-summary">
                        <div className="cart-total">
                            <span>Total</span>
                            <strong>{totalPrice.toFixed(2)} EGP</strong>
                        </div>

                        <Button
                            className="clear-cart-btn"
                            onClick={() => dispatch(Cleare())}
                        >
                            Clear Cart
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Cart;