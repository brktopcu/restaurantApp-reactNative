const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return initialState;
  }
};

export default userReducer;