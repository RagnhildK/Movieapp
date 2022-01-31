const popularURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=72c828341c35299683ab545ba90e7f50&language=en-US&page=1";

const detailURL =
  "https://api.themoviedb.org/3/movie/{movie_id}?api_key=72c828341c35299683ab545ba90e7f50&language=en-US";

export const getMovie = async (handleResponse) => {
  try {
    const response = await fetch(popularURL);
    const json = await response.json();
    handleResponse(json);
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = async (movieId, handleResponse) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=72c828341c35299683ab545ba90e7f50&language=en-US`,
    );
    const json = await response.json();
    handleResponse(json);
  } catch (error) {
    console.log(error);
  }
};
