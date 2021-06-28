const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c27b75f2098a52933ae8847a9b55ad4e';

// Youtube trailer
const Youtube_URL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=';
const Youtube_KEY = 'AIzaSyD8inqGUO-SK_dHM6arGzHjgxpIuIBLIy0';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPopularMovies() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      page: this.page,
    });

    const url = `${BASE_URL}movie/popular?${searchParams}`;

    return fetch(url).then(response => response.json());
  }

  fetchGenresList() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });

    const url = `${BASE_URL}/genre/movie/list?${searchParams}`;

    return fetch(url).then(response => response.json());
  }

  // fetchMoviesBySearchQuery
  fetchMoviesBySearch() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: this.searchQuery,
      page: this.page,
    });

    return fetch(`${BASE_URL}search/movie?${searchParams}`).then(response => response.json());
  }

  fetchFullInfoOfMovie(movieId) {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });

    return fetch(`${BASE_URL}/movie/${movieId}?${searchParams}`).then(response => response.json());
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  setPage(value) {
    this.page = value;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  getTrailer(movie) {
    const url = `${Youtube_URL}${movie} + "trailer"&key=${Youtube_KEY}`;
    return fetch(url)
      .then(r => r.json())
      .then(d => {
        return d.items[0].id.videoId;
      });
  }
}
