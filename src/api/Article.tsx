import Pagination from "./Pagination";
import Section from "./Section";
import User from "./User";

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
    user_id: number,
    user?: User
    section_id: number,
    section?: Section,
    article_url: string,
    thumbnail_url: string,
    thumbnail_inline_location: string
}