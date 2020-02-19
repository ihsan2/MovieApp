const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const cast = (state = initialState, action) => {
  switch (action.type) {
    // get list cast of a movie
    case 'CAST_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'CAST_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'CAST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data.cast,
      };

    default:
      return state;
  }
};

export default cast;
