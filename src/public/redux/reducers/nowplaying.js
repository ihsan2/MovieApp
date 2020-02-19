const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const nowplaying = (state = initialState, action) => {
  switch (action.type) {
    // get list now playing movies
    case 'NOW_PLAYING_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'NOW_PLAYING_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'NOW_PLAYING_FULFILLED':
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

export default nowplaying;
