import { ArticlePage } from "./Article";
import Pagination from "./Pagination";

export interface EmployeePage extends Pagination {
    data: Employee[]
}

export enum EmployeeCapacity {
    FullTime = 1,
    PartTime,
}

export default interface Employee {
    id: number,
    created_at: number,
    updated_at: number,
    first_name: string,
    last_name: string,
    title: string,
    capacity: EmployeeCapacity,
    notes: string,
    mobile: string,
    email: string,
    articles?: ArticlePage
}