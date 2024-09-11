let movies = [
  {
    movieId: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan'
  },
  {
    movieId: 2,
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    director: 'Frank Darabont'
  },
  {
    movieId: 3,
    title: 'The Godfather',
    genre: 'Crime',
    director: 'Francis Ford Coppola'
  }
];
// function to retrieve all movies
async function getAllMovies() {
  return movies;
}
// function to retrieve movie by id
async function getMovieById(id) {
  return movies.find((movie) => movie.movieId === id);
}

module.exports = { getAllMovies, getMovieById };