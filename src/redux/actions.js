import {
  FETCH_DATA,
  CURRENT_PAGE,
  SEARCH_TERM,
  SORT_KEY,
  SORT_ORDER,
} from "./types";

export function fetchData() {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=40"
      );
      const json = await response.json();
      // console.log("data: ", json);

      dispatch({ type: FETCH_DATA, payload: json });
    } catch (error) {
      console.error("Error: ", error);
    }
  };
}

export function setCurrentPage(pageNumber) {
  return {
    type: CURRENT_PAGE,
    payload: pageNumber,
  };
}
export function setSearchTerm(searchTerm) {
  return {
    type: SEARCH_TERM,
    payload: searchTerm,
  };
}

export function setSortKey(sortKey) {
  return {
    type: SORT_KEY,
    payload: sortKey,
  };
}

export function setSortOrder(sortOrder) {
  return {
    type: SORT_ORDER,
    payload: sortOrder,
  };
}
