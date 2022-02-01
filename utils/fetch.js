const popularURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=72c828341c35299683ab545ba90e7f50&language=en-US&page=";

const detailURL =
  "https://api.themoviedb.org/3/movie/{movie_id}?api_key=72c828341c35299683ab545ba90e7f50&language=en-US";

export const getMovie = async (handleResponse, pages) => {
  let result = [];
  try {
    for (let i = 0; i < pages; i++) {
      const page = i + 1;
      const response = await fetch(`${popularURL}${page}`);
      const json = await response.json();
      const jsonResult = await json.results;
      await jsonResult.map((r) => {
        result.push(r);
      });
    }
    handleResponse(result);
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = async (movieId, handleResponse) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=72c828341c35299683ab545ba90e7f50&language=en-US`
    );
    const json = await response.json();
    await handleResponse(json);
  } catch (error) {
    console.log(error);
  }
};
