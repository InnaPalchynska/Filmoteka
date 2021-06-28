// import MoviesApiService from '../js/apiService.js';
// import getRefs from '../js/get-refs';

// const refs = getRefs();
// const moviesApiService = new MoviesApiService();

// let moviesLibrary = [527774, 385687];

// export default function renderLibrary() {
//   //   console.log(moviesLibrary);
//   for (const iterator of moviesLibrary) {
//     // console.log(iterator);
//     renderPopularMoviesGrid(iterator).catch(error => console.log(error));
//   }

//   async function renderPopularMoviesGrid(iterator) {
//     console.log(iterator);
//     //   const fetchMovies = searchQuery
//     //     ? moviesApiService.fetchMoviesBySearch()
//     //     : moviesApiService.fetchPopularMovies();

//     const { results: movies, page, total_pages, total_results } = await fetchFullInfoOfMovie(
//       iterator,
//     );

//     //genresList - array of objects [{id: 23, name: "Drama"}, {id: 17, name: "Action"} ...]
//     const genresListObj = await moviesApiService.fetchGenresList();
//     const genresList = genresListObj.genres;

//     transformMoviesObjectFields(movies, genresList);

//     const popularMoviesMarkup = movieCardTpl(movies);
//     refs.moviesList.insertAdjacentHTML('beforeend', popularMoviesMarkup);
//   }

//   function transformMoviesObjectFields(movies, genresList) {
//     movies.forEach(movie => {
//       movie.placeholder = !movie.poster_path ? true : false;
//       if (movie.release_date != undefined) {
//         movie.release_date = movie.release_date.slice(0, 4);
//       }
//       //genresIdsList - array of genre's ids of one movie [23, 17]
//       const genresIdsList = movie.genre_ids;
//       //in movies.genre_ids genres ids replace with genres names
//       genresIdsList.forEach((genreId, index, array) => {
//         const genresListItem = genresList.find(genre => genre.id === genreId);
//         const idx = genresList.indexOf(genresListItem);
//         array[index] = genresList[idx].name;
//       });
//       movie.genre_ids = genresIdsList.join(', ');
//     });
//   }
// }
