import {
  getApiWithAuth,
  getApiWithoutAuth,
  postApiWithoutAuth,
  postApiWithAuth,
  patchApiWithAuth,
  deleteApiWithAuth,
  putApiWithAuth,
} from "./api";
import { USER_LOGIN, MOVIES_DATA, MOVIES_CREATE } from "./apiEndpoint";

export const loginWithEmail = (data: object) =>
  postApiWithoutAuth(USER_LOGIN, data);
export const getAllMovies = () => getApiWithoutAuth(`${MOVIES_DATA}`);

export const createMovie = (data: object) =>
  postApiWithAuth(MOVIES_CREATE, data);
