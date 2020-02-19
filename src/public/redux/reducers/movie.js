const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    // get one movie
    case 'MOVIE_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'MOVIE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'MOVIE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default movie;
