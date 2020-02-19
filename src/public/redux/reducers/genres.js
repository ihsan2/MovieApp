const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const genre = (state = initialState, action) => {
  switch (action.type) {
    // get list of genre
    case 'GENRE_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GENRE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GENRE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data.genres,
      };

    default:
      return state;
  }
};

export default genre;
