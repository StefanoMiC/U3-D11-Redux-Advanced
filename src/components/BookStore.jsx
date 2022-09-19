import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { connect } from "react-redux";
import { getBooksAction } from "../redux/actions";

const mapStateToProps = state => ({
  booksInStock: state.book.stock,
});

const mapDispatchToProps = dispatch => {
  return {
    getBooks: () => {
      dispatch(getBooksAction());
    },
  };
};

const BookStore = ({ booksInStock, getBooks }) => {
  // const [books, setBooks] = useState([]);
  const [bookSelected, setBookSelected] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

  // const getBooks = async () => {
  //   try {
  //     let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
  //     if (resp.ok) {
  //       let fetchedBooks = await resp.json();
  //       setBooks(fetchedBooks);
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const changeBook = book => setBookSelected(book);

  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList bookSelected={bookSelected} changeBook={changeBook} books={booksInStock} />
      </Col>
      <Col lg={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookStore);
