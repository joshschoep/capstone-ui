import { ArticlePage } from "./Article";
import Error from "./Error";
import Pagination from "./Pagination";

export const CAPACITY_PART_TIME = "part_time";
export const CAPACITY_FULL_TIME = "full_time";
export const EmployeeCapacities = [
    CAPACITY_PART_TIME,
    CAPACITY_FULL_TIME
];

export const ROLE_USER = "user";
export const ROLE_ADMIN = "admin";
export const EmployeeRoles = [
    ROLE_USER,
    ROLE_ADMIN
];

export const EmployeeTitles = [
    "CEO",
    "VP",
    "Designer",
    "Developer",
    "Lead Developer",
    "Sales & Marketing"
];

export interface UserPage extends Pagination {
    data: User[]
}

export default interface User {
    id: number,
    email: string,
    avatar_uri: string,
    created_at: number,
    updated_at: number,
    email_verified_at: number,
    role: string, 

    first_name: string,
    last_name: string,
    full_name: string,
    title: string,
    capacity: string,
    notes: string,
    mobile: string,
    articles?: ArticlePage,
    notify?: boolean
}

export interface UserFieldMessages {
    first_name: string,
    last_name: string,
    email: string,
    title: string,
    capacity: string,
    notes: string,
    mobile: string,
    role: string
}

export interface UserError extends Error {
    errors: UserFieldMessages
}