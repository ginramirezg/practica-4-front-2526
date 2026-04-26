export type UserResponse = {
  _id: string;
  username: string;
  email: string;
};

export type AuthResponse = {
  user: UserResponse;
  token: string;
};

export type Comentario = {
  _id: string;
  contenido: string;
  autor: {
    _id: string;
    username: string;
  };
  fecha: string;
};

export type Retweet = {
  usuario: string;
  fecha: string;
};

export type PostResponse = {
  _id: string;
  contenido: string;
  autor: {
    _id: string;
    username: string;
  };
  likes: string[];
  retweets: Retweet[];
  comentarios: Comentario[];
  createdAt: string;
  updatedAt: string;
};

export type HomeResponse = {
  posts: PostResponse[];
  pagina: number;
  totalPaginas: number;
  totalPosts: number;
};

export type ProfileResponse = {
  user: UserResponse;
  posts: PostResponse[];
};

export type FollowResponse = {
  siguiendo: boolean;
  user: UserResponse;
};

export type ErrorResponse = {
  error?: string;
  message?: string;
};