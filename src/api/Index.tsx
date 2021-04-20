import axios from 'axios';
import Employee from './Employee';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const Articles = {
    index: () => api.get(`/articles`),
    get: (id: number) => api.get(`/articles/${id}`),

}

interface EmployeeIndexParams {
    filter: string;
    sort: keyof Employee;
    page: number;
}
export const Employees = {
    index: (params: EmployeeIndexParams) => 
        api.get(`/employees?page=${params.page}&sort=${params.sort}&filter=${params.filter}`),
    get: (id: number) => api.get(`/employees/${id}`),

}

export const Auth = {
    user: () => api.get(`/user`),
}