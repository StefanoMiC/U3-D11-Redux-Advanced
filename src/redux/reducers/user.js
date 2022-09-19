// before starting to create our first reducer, let's think about HOW we want our store to look like...

import { SET_USERNAME } from "../actions";

const initialState = {
  name: "",
};

// we are going to use our initialState to write our first reducer function!

// Once we add a lof of cases to our mainReducer it becomes more and more difficult to read it and maintain it.
// It might be worth splitting it up into multiple reducers, in order to find them later in a more structured and organised way.

// we are going to split our sigle reducer function into multiple ones
// one per Store Slice

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state; // in the case of falling into the default statement,
    // that means we encountered an 'unrecognized' action.type!
    // returning the state as it was from it, will not HARM our app!
    // we're just going to bring no modification to it...
  }
};
// the reducer is a function that will return the new state of the app every time,
// thanks to its two arguments: the current state of the app, and the action
// that just got dispatched (which describes the modification you want to bring in)
export default userReducer;
