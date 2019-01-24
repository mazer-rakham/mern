// this is setting the initial application state for the auth reducer
const initialState = {
  isAuthenticated: false,
  user: {}
};
// take in initial state and and action to dispatch actions
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
