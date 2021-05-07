import axios from 'axios';
import Article, { ArticlePage } from './Article';
import Section from './Section';
import User, { UserPage } from './User';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
});

export const Sections = {
    index: () => api.get<Section[]>(`sections`),
    articles: (id: number, page: number) => api.get<ArticlePage>(`sections/${id}/articles?page=${page}`)
}

export const Articles = {
    index: () => api.get<ArticlePage>(`/articles`),
    get: (id: number) => api.get<Article>(`/articles/${id}`)
}

interface UserIndexParams {
    filter: string;
    sort: keyof User;
    page: number;
}
export const Users = {
    index: (params: UserIndexParams) =>
        api.get<UserPage>(`/users?page=${params.page}&sort=${params.sort}&filter=${params.filter}`),
    get: (id: number) => api.get<User>(`/users/${id}`),
    post: (user: User) => api.post(`/users`, user),
    put: (id: number, user: User) => api.put(`/users/${id}`, user),
    delete: (id: number) => api.delete(`/users/${id}`)
}

export const Auth = {
    user: () => api.get<User>(`/user`),
    check: () => api.get(`/user/check`),
    login: (email: string, password: string) => api.post(`/login`, {email, password}),
    startSession: () => api.get(`/sanctum/csrf-cookie`),
    logout: () => api.post(`/logout`).then(response => window.location.reload())
}