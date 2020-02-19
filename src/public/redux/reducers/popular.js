const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const popular = (state = initialState, action) => {
  switch (action.type) {
    // get list popular movies
    case 'POPULAR_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'POPULAR_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'POPULAR_FULFILLED':
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

export default popular;
