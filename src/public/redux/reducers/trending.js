const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const trending = (state = initialState, action) => {
  switch (action.type) {
    // get list trending movies
    case 'TRENDING_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'TRENDING_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'TRENDING_FULFILLED':
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

export default trending;
