import {
  FETCH_DATA,
  CURRENT_PAGE,
  PER_PAGE,
  SEARCH_TERM,
  SORT_KEY,
  SORT_ORDER,
} from "./types";

const initialState = {
  fetchedData: [],
  perPage: 10,
  currentPage: 1,
  searchTerm: "",
  sortKey: "",
  sortOrder: "asc",
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
    case SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case SORT_KEY:
      return {
        ...state,
        sortKey: action.payload,
      };
    case SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
    default:
      return state;
  }
};
