import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  setCurrentPage,
  setSearchTerm,
  setSortKey,
  setSortOrder,
} from "../redux/actions";

const Table = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.data.fetchedData);
  const currentPage = useSelector(state => state.data.currentPage);
  const perPage = useSelector(state => state.data.perPage);
  const searchTerm = useSelector(state => state.data.searchTerm);
  const sortKey = useSelector(state => state.data.sortKey);
  const sortOrder = useSelector(state => state.data.sortOrder);
  const totalPages = Math.ceil(posts.length / perPage);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, currentPage]);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const currentPageData = posts.slice(startIndex, endIndex);

  const pages = [1, 2, 3, 4];

  const handleSearch = event => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleSort = key => {
    if (sortKey === key) {
      dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
    } else {
      dispatch(setSortKey(key));
      dispatch(setSortOrder("asc"));
    }
  };
  const filteredData = currentPageData.filter(item => {
    return (
      item.id.toString().includes(searchTerm) ||
      item.title.includes(searchTerm) ||
      item.body.includes(searchTerm)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortKey] < b[sortKey] ? -1 : 1;
    } else {
      return a[sortKey] > b[sortKey] ? -1 : 1;
    }
  });

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder="Поиск"
          className="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table>
        <thead>
          <tr className="head">
            <th onClick={() => handleSort("id")}>ID</th>
            <th className="header" onClick={() => handleSort("title")}>
              Заголовок
            </th>
            <th onClick={() => handleSort("body")}>Описание</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map(({ id, title, body }) => (
            <tr key={id}>
              <td>
                <p className="id">{id}</p>
              </td>
              <td>
                <p className="title">{title}</p>
              </td>
              <td>
                <p className="body">{body}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container">
        <div className="pagination">
          <button className="button" onClick={handlePrevious}>
            Назад
          </button>
          <div className="page-numbers">
            {pages.map((page, id) => (
              <span
                key={id}
                className={currentPage === page ? "selected" : "not-selected"}
                onClick={() => dispatch(setCurrentPage(page))}>
                {page}
              </span>
            ))}
          </div>

          <button className="button" onClick={handleNext}>
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
