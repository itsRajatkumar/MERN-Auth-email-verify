import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const FetchLeaderBoard = () => API.get('/posts');
export const UploadProfile = (newPost) => API.post('/posts', newPost);
export const DeleteProfile = (id) => API.patch(`/posts/${id}/likePost`);
export const UpdatePassword = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const GetTeferCode = (id) => API.delete(`/posts/${id}`);

export const Login = (formData) => API.post('/user/signin', formData);
export const ForgotLink = (formData) => API.post('/user/signin', formData);
export const ResetPass = (formData) => API.post('/user/signin', formData);
export const SignUp = (formData) => API.post('/user/signup', formData);
