let request = require("supertest");
let http = require("http");
let { app } = require("../index");
let { getAllMovies, getMovieById } = require("../controllers");



jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn()
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Exercise 3: Test Retrieve All Movies
  it("GET API /movies should return all movies and status code 200", async () => {
    let mockMovies = [
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
    getAllMovies.mockResolvedValue(mockMovies);
    let result = await request(server).get("/movies");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockMovies);
  });
  // Exercise 4: Test Retrieve Movie by ID
  it("GET API /movies/details/:id should return a movie by id and status code 200", async () => {
    let mockedMovie = {
      movieId: 3,
      title: 'The Godfather',
      genre: 'Crime',
      director: 'Francis Ford Coppola'
    };
    getMovieById.mockResolvedValue(mockedMovie);
    let result = await request(server).get("/movies/details/3");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockedMovie);
  });
  });
  describe("Controller functions testing", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    // Exercise 5: Mock the Get All Movies Function
    it("getAllMovies function should return all movies", () => {
      let mockedMovies = [
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
      getAllMovies.mockReturnValue(mockedMovies);
      let result = getAllMovies();
      expect(result).toEqual(mockedMovies);
      expect(result.length).toBe(3);
    });
  });