import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMovies } from '../../reducers/films/index';
import { populateFilms } from '../../reducers/films/index';

import Pagination from '@mui/material/Pagination';
import './List.css';

const FilmList = () => {
  const dispatch = useDispatch();
  const moviesObject = useSelector(populateFilms);

  // Starts fetching movies fom page 1
  const [page, setPage] = useState(1);

  const handleChange = (e, value) => {
    setPage(value);
  };

  // Storing the data returned by useSelector in two variables
  const moviesList = moviesObject.payload.films.list; // iteration at l36 to display dynamically each element
  const totalPages = moviesObject.payload.films.total; // 493 pages in the api

  // Renders on first page load but need to add dispatch and the page number in the array to avoid unwanted side effects
  useEffect(() => {
    dispatch(fetchMovies(page));
  }, [dispatch, page]);

  return (
    <section>
      <ul className="card__list--container">
        {moviesList.map((movie) => (
          <Link to={`/films/${movie.id}`} key={movie.id}>
            <li className="card__list--items">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </li>
          </Link>
        ))}
      </ul>
      <div className="card__list--pagination">
        <Pagination
          page={page}
          onChange={handleChange}
          count={totalPages}
          variant="outlined"
        />
      </div>
    </section>
  );
};

export default FilmList;
