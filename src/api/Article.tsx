import Employee from "./Employee";
import Pagination from "./Pagination";

export interface ArticlePage extends Pagination {
    data: Article[]
}

export default interface Article {
    id: number,
    created_at: number,
    updated_at: number,
    headline: string,
    short: string,
    content?: string,
    employee_id: number,
    employee?: Employee,
}