const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  page: '',
};

const people = (state = initialState, action) => {
  switch (action.type) {
    // get list popular people
    case 'POPULAR_PEOPLE_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'POPULAR_PEOPLE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'POPULAR_PEOPLE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data.results,
        page: action.payload.data.page,
      };

    default:
      return state;
  }
};

export default people;
