export default interface Pagination {
    first_page_url: string,
    last_page_url: string,
    next_page_url: string,
    prev_page_url: string,
    path: string,
    
    total: number,
    per_page: number,
    current_page: number,
    last_page: number,
    from: number,
    to: number,
}