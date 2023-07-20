import { FETCH_DATA, CURRENT_PAGE } from "./types";

export function fetchData() {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=20"
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
