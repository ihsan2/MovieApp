const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const upcoming = (state = initialState, action) => {
  switch (action.type) {
    // get list upcoming movies
    case 'UPCOMING_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'UPCOMING_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'UPCOMING_FULFILLED':
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

export default upcoming;
