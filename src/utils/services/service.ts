import { getApiWithoutAuth, postApiWithoutAuth, postApiWithAuth } from "./api";
import {
  USER_LOGIN,
  MOVIES_DATA,
  MOVIES_CREATE,
  USER_SIGNUP,
} from "./apiEndpoint";

export const loginWithEmail = (data: object) =>
  postApiWithoutAuth(USER_LOGIN, data);
export const signupWithEmail = (data: object) =>
  postApiWithoutAuth(USER_SIGNUP, data);
export const getAllMovies = () => getApiWithoutAuth(`${MOVIES_DATA}`);

export const createMovie = (data: object) =>
  postApiWithAuth(MOVIES_CREATE, data);
