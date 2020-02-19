const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const searchperson = (state = initialState, action) => {
  switch (action.type) {
    // get list SEARCH_PERSON movies
    case 'SEARCH_PERSON_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'SEARCH_PERSON_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'SEARCH_PERSON_FULFILLED':
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

export default searchperson;
