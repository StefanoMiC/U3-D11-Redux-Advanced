import { Component } from "react";
import { Col, Row, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { addToCartWithThunk } from "../redux/actions";

// we don't technically need to have a mapStateToProps, since we're not interested in reading anything from the state...
// ... but we need one in order to get access to the second arguement of the connect function: mapDispatchToProps.
// Which is the actual thing that we need here.
const mapStateToProps = state => {
  return {
    userName: state.user.name,
    booksFetchingError: state.book.error,
  };
};

const mapDispatchToProps = dispatch => {
  // dispatch is a function
  return {
    addToCart: book => {
      // the dispatch returns an action, and it needs at least one property: type
      // dispatch({
      //   type: "ADD_TO_CART", // this is the type, the only mandatory property
      //   // the action also needs a very important piece of information to be able to update the state with it
      //   payload: book,
      // });
      dispatch(addToCartWithThunk(book));
    },
  };
};

// prop.addToCart(bookSelected)

class BookDetail extends Component {
  render() {
    return (
      <div className="mt-3 mb-4 mb-lg-0">
        {this.props.booksFetchingError && <Alert variant="danger">Huston we have an ERROR!</Alert>}
        {this.props.bookSelected ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{this.props.bookSelected.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <img
                    className="book-cover"
                    src={this.props.bookSelected.imageUrl}
                    alt="book selected"
                  />
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>&nbsp;
                  {this.props.bookSelected.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>&nbsp;
                  {this.props.bookSelected.price}$
                </p>
                {this.props.userName ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      this.props.addToCart(this.props.bookSelected);
                    }}
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <Alert variant="warning">
                    Please log in before you can add this book to your Cart!
                  </Alert>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Start by clicking on a book!</h3>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
// BookDetails just wants to make its Add to Cart button working!
// it's not interested in reading anything from the redux store...
// it wants though to add a book to the cart! that will involve DISPATCHING an ACTION
