import { CURRENT_PAGE, FETCH_DATA, PER_PAGE } from "./types";

const initialState = {
  fetchedData: [],
  perPage: 5,
  currentPage: 1,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        fetchedData: action.payload,
      };
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
      };
    default:
      return state;
  }
};
