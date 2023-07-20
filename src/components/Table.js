import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setCurrentPage } from "../redux/actions";

const Table = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.data.fetchedData);
  const currentPage = useSelector(state => state.data.currentPage);
  const perPage = useSelector(state => state.data.perPage);
  const totalPages = Math.ceil(posts.length / perPage);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, currentPage]);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const currentPageData = posts.slice(startIndex, endIndex);

  const pages = [1, 2, 3, 4];

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
    <>
      <div className="container">
        <div>
          <input type="text" placeholder="Поиск" className="search" />
        </div>

        <table>
          <thead>
            <tr className="head">
              <th>ID</th>
              <th className="header">Заголовок</th>
              <th>Описание</th>
            </tr>
          </thead>

          <tbody>
            {currentPageData.map(({ id, title, body }) => (
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
                  className={currentPage == page ? "selected" : "not-selected"}
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
    </>
  );
};

export default Table;
