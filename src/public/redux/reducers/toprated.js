const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const toprated = (state = initialState, action) => {
  switch (action.type) {
    // get list top rated movies
    case 'TOP_RATED_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'TOP_RATED_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'TOP_RATED_FULFILLED':
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

export default toprated;
