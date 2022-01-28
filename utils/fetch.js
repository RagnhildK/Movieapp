const baseURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=72c828341c35299683ab545ba90e7f50&language=en-US&page=1";


export const getMovie = async (handleResponse) => {
  try {
    const response = await fetch(baseURL);
    const json = await response.json();
    handleResponse(json);
  } catch (error) {
    console.log(error);
  }
};
