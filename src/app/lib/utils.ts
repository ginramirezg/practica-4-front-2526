import axios from "axios";
import {
  AuthResponse,
  HomeResponse,
  PostResponse,
  ProfileResponse,
  UserResponse,
  FollowResponse
} from "@/app/types";

const API_URL = "https://backend-p4-klvc.onrender.com";

const ALUMNO = "Jorge"; // cambia esto por tu nombre si hace falta

const getToken = () => {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];
};

const getAuthHeaders = () => {
  const token = getToken();

  return {
    "x-nombre": ALUMNO,
    Authorization: `Bearer ${token}`,
  };
};

const getPublicHeaders = () => {
  return {
    "x-nombre": ALUMNO,
  };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/api/auth/login`,
    {
      email,
      password,
    },
    {
      headers: getPublicHeaders(),
    }
  );

  return response.data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/api/auth/register`,
    {
      username,
      email,
      password,
    },
    {
      headers: getPublicHeaders(),
    }
  );

  return response.data;
};

export const getPosts = async (page: number): Promise<HomeResponse> => {
  const response = await axios.get<HomeResponse>(
    `${API_URL}/api/home?page=${page}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const createPost = async (
  contenido: string
): Promise<PostResponse> => {
  const response = await axios.post<PostResponse>(
    `${API_URL}/api/posts`,
    {
      contenido,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const getPostById = async (id: string): Promise<PostResponse> => {
  const response = await axios.get<PostResponse>(
    `${API_URL}/api/posts/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const likePost = async (id: string): Promise<PostResponse> => {
  const response = await axios.post<PostResponse>(
    `${API_URL}/api/posts/${id}/like`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const retweetPost = async (id: string): Promise<PostResponse> => {
  const response = await axios.post<PostResponse>(
    `${API_URL}/api/posts/${id}/retweet`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const createComment = async (
  id: string,
  contenido: string
): Promise<PostResponse> => {
  const response = await axios.post<PostResponse>(
    `${API_URL}/api/posts/${id}/comment`,
    {
      contenido,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const getMyProfile = async (): Promise<UserResponse> => {
  const response = await axios.get(`${API_URL}/api/users/me`, {
    headers: getAuthHeaders(),
  });

  return response.data.user || response.data;
};

export const getProfileById = async (
  id: string
): Promise<ProfileResponse> => {
  const response = await axios.get<ProfileResponse>(
    `${API_URL}/api/users/${id}/profile`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const followUser = async (id: string): Promise<FollowResponse> => {
  const response = await axios.post<FollowResponse>(
    `${API_URL}/api/users/${id}/follow`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};