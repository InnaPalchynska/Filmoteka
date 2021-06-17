const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchMovies() {
    const searchParams = new URLSearchParams({
      api_key: 'c27b75f2098a52933ae8847a9b55ad4e',
      query: this.searchQuery,
      page: this.page,
    });

    return fetch(`${BASE_URL}/?${searchParams}`).then(response =>
      response.json(),
    );
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
