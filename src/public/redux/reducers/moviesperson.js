const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const moviesperson = (state = initialState, action) => {
  switch (action.type) {
    // get list movie of a people
    case 'MOVIES_PERSON_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'MOVIES_PERSON_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'MOVIES_PERSON_FULFILLED':
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

export default moviesperson;
