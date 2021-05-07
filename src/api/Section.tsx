import { ArticlePage } from "./Article";

export default interface Section {
    id: number,
    title: string,
    articles?: ArticlePage,

    created_at: number,
    updated_at: number,
}