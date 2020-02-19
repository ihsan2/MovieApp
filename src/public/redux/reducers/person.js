const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const person = (state = initialState, action) => {
  switch (action.type) {
    // get one person
    case 'PERSON_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'PERSON_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'PERSON_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default person;
