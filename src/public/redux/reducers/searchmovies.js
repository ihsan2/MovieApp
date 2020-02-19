const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const searchmovies = (state = initialState, action) => {
  switch (action.type) {
    // get list SEARCH_MOVIES movies
    case 'SEARCH_MOVIES_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'SEARCH_MOVIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'SEARCH_MOVIES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data.results,
      };

    default:
      return state;
  }
};

export default searchmovies;
