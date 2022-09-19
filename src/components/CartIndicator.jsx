import { useState } from "react";
import { Button, Form, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";
import { setUserNameAction } from "../redux/actions";

// mapStateToProps is a function that returns an OBJECT
// mapStateToProps is going to decide which parts of the Redux Store we want to "read"
// it will make that portion of the state available to CartIndicator AS PROPS!

const mapStateToProps = state => {
  return {
    // every KEY we add in here, will become an ADDITIONAL PROP of CartIndicator
    cartLength: state.cart.content.length,
    userName: state.user.name,
    areBooksLoading: state.book.loading,
  };
};

// with mapStateToProps we are now SUBSCRIBED to the Store changes,
// meaning: every time the Global State changes this component will undergo an update

const mapDispatchToProps = dispatch => {
  return {
    setUserName: nameToSet => {
      // dispatch({
      //   type: "SET_USERNAME",
      //   payload: nameToSet,
      // });
      dispatch(setUserNameAction(nameToSet));
    },
  };
};

const CartIndicator = ({ cartLength, userName, setUserName, areBooksLoading }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <div className="ml-auto mt-3 mb-4">
      {areBooksLoading && <Spinner variant="primary" animation="border" />}
      {userName ? (
        <>
          <span className="mr-2">
            Welcome back, <b>{userName}</b>!
          </span>
          <Button color="primary" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span className="ml-2">{cartLength}</span>
          </Button>
        </>
      ) : (
        <Form
          onSubmit={e => {
            e.preventDefault();
            console.log("user name submit", name);
            setUserName(name);
          }}
        >
          <Form.Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="User name here"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Log in</Button>
            </Col>
          </Form.Row>
        </Form>
      )}
    </div>
  );
};

// export default CartIndicator;
export default connect(mapStateToProps, mapDispatchToProps)(CartIndicator); // as if we have now CartIndicatorWithStateProps = <CartIndicator {...props} {...mapStateToProps} />

// now the CartIndicator component is connected to the Redux Store,
// for reading the length of the content array in any given moment in time.
// this is possible thanks to the connect() function

// connect is used for exporting the component, but how can it tell what data we want to read from the Store?

// mapStateToProps and mapDispatchToProps, they are two arguements you can invoke 'connect' function with!

// mapStateToProps decides which parts of the Redux Store you want to READ ("read" access to the Redux Store)
// mapDispatchToProps decides how this component is going to INTERACT or MODIFY the Redux Store ("write" access to the Redux Store)
