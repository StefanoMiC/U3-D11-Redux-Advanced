export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_USERNAME = "SET_USERNAME";
export const GET_BOOKS = "GET_BOOKS";
export const GET_BOOKS_ERROR = "GET_BOOKS_ERROR";
export const GET_BOOKS_LOADING = "GET_BOOKS_LOADING";

// here you typically write your ACTION CREATORS
// an action creator is a FUNCTION returning an ACTION

// const addToCartAction = book => {
// console.log("something")
//   return {
//     type: "ADD_TO_CART", // this is the type, the only mandatory property
//     // the action also needs a very important piece of information to be able to update the state with it
//     payload: book,
//   };
// };
export const addToCartAction = book => ({
  type: ADD_TO_CART, // this is the type, the only mandatory property
  // the action also needs a very important piece of information to be able to update the state with it
  payload: book,
});

// if we want to perform any asynchronous operation and fill up our redux store with the result e.g. a fetch()
// we're going to do the fetch here, one step before the reducer
// and we're going to provide the reducer the already fetched data to work with!

// we are going to fetch inside the action creator!
// but right now the action creators are only function that spit out a simple object (our action)
// how can we write an action creator taht actually performs real logic?

// we need to leaverage ANOTHER WAY of writing them
// we can write anothe shape of an action creator because we can use a Redux Middleware (some sort of a plugin), that's already embedded into our store
// it's called redux-thunk

// this is the alternative way of writing an action creator:
export const addToCartWithThunk = book => {
  return async (dispatch, getState) => {
    // previously we were returning just ACTIONS from action creators
    // now we can also return a FUNCTION from our action creators
    // this function we're allowed to return gets 2 arguements from Redux:
    // 1) the dispatch function
    // 2) a getState function, that when executed will return us the WHOLE REUDUX STORE

    console.log("dispatched from a thunk action creator!! :D");
    const state = getState(); // this will give you the actual content of the store
    console.log(state);
    // you can do any kind of thing here, and after you're finished....
    // you can dispatch you action
    dispatch({
      type: ADD_TO_CART, // this is the type, the only mandatory property
      // the action also needs a very important piece of information to be able to update the state with it
      payload: book,
    });
  };
};

export const removeFromCartAction = indexToRemove => ({
  type: REMOVE_FROM_CART,
  payload: indexToRemove,
});

export const setUserNameAction = nameToSet => ({
  type: SET_USERNAME,
  payload: nameToSet,
});

export const getBooksAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_BOOKS_LOADING,
        payload: true,
      });

      let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
      if (resp.ok) {
        let fetchedBooks = await resp.json();

        dispatch({
          type: GET_BOOKS,
          payload: fetchedBooks,
        });
      } else {
        console.log("error");
        dispatch({
          type: GET_BOOKS_ERROR,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_BOOKS_ERROR,
      });
    } finally {
      dispatch({
        type: GET_BOOKS_LOADING,
        payload: false,
      });
    }
  };
};
