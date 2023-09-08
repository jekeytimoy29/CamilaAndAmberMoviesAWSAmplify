import { API } from "aws-amplify";
import { listMovies, getMovie } from "../../graphql/queries";
import { deleteMovie, createMovie, updateMovie } from "../../graphql/mutations";

export const getMoviesApi = async () => {
  try {
    const apiData = await API.graphql({ query: listMovies });
    if (apiData.data !== null) return apiData.data.listMovies.items;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const getMovieApi = async (id) => {
  try {
    const apiData = await API.graphql({
      query: getMovie,
      variables: { id },
    });
    if (apiData.data !== null) return apiData.data.getMovie;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const deleteMovieApi = async (id) => {
  try {
    const apiData = await API.graphql({
      query: deleteMovie,
      variables: { input: { id } },
    });
    if (apiData.data !== null) return true;
  } catch (err) {
    console.log(err);
  }

  return false;
};

export const addMovieApi = async (movie) => {
  try {
    const apiData = await API.graphql({
      query: createMovie,
      variables: { input: movie },
    });
    if (apiData.data !== null) return apiData.data.createMovie;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const updateMovieApi = async (movie) => {
  try {
    const apiData = await API.graphql({
      query: updateMovie,
      variables: { input: movie },
    });
    if (apiData.data !== null) return apiData.data.updateMovie;
  } catch (err) {
    console.log(err);
  }

  return null;
};
