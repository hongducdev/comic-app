const baseUrl = "https://comics-api.vercel.app/";
import axios from "axios";

export const getTrending = async (page) => {
  const response = await axios.get(`${baseUrl}trending-comics?page=${page}`);
  return response.data;
};

export const getRecommend = async () => {
  const response = await axios.get(`${baseUrl}recommend-comics`);
  return response.data;
}

export const getNewComics = async (page, status) => {
  const response = await axios.get(`${baseUrl}new-comics?page=${page}&status=${status}`);
  return response.data;
};

export const getDetailComic = async (id) => {
  const response = await axios.get(`${baseUrl}comics/${id}`);
  return response.data;
};

export const getChapter = async (comicId, chapterId) => {
  const response = await axios.get(`${baseUrl}comics/${comicId}/chapters/${chapterId}`);
  return response.data;
}

export const getSearch = async (keyword, page) => {
  const response = await axios.get(`${baseUrl}search?q=${keyword}&page=${page}`);
  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get(`${baseUrl}genres`);
  return response.data;
};

export const getGenre = async (genreId) => {
  const response = await axios.get(`${baseUrl}genres/${genreId}`);
  return response.data;
};

export const getTop = async (type, page, status) => {
  const response = await axios.get(`${baseUrl}top/${type}?page=${page}&status=${status}`);
  return response.data;
};