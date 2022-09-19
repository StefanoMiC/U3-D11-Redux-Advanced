import { Col, Row, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import { connect } from "react-redux";
import { removeFromCartAction } from "../redux/actions";

const mapStateToProps = state => {
  return {
    cart: state.cart.content,
    userName: state.user.name,
    // cart is now a prop holding the cart array coming from the redux store
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: indexToRemove => {
      // dispatch({
      //   type: "REMOVE_FROM_CART",
      //   payload: indexToRemove,
      // });
      dispatch(removeFromCartAction(indexToRemove));
    },
  };
};
// the cart prop initially is undefined, since we're not passing any prop from App.js!
// since cart is undefined, we're assigning to it a default value with the = operator
// the default value we're assigning to it is []
const Cart = ({ cart = [], removeFromCart, userName }) => (
  <Row>
    <Col sm={12}>
      <h2 className="display-4">Here's your Cart {userName}</h2>
      <ul style={{ listStyle: "none" }}>
        {cart.map((book, i) => (
          <li key={i} className="my-4">
            <Button
              variant="danger"
              onClick={() => {
                removeFromCart(i);
              }}
            >
              <FaTrash />
            </Button>
            <img className="book-cover-small" src={book.imageUrl} alt="book selected" />
            {book.title}
          </li>
        ))}
      </ul>
    </Col>
    <Row>
      <Col sm={12} className="font-weight-bold mb-3 ml-4">
        TOTAL: {cart.reduce((acc, currentValue) => acc + parseFloat(currentValue.price), 0)}$
      </Col>
    </Row>
  </Row>
);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
