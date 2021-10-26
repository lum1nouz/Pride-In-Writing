type Book = {
    id: number
    name: string
    genre: string
    publisher?: string
    year:  string
    page_count: number
    price?: number
    avg_rating?: number
    maturity_rating: string
    description?: string
    image?: string
    authors: string[]
    author_connections?: string
    publisher_connections?: string
}
export default Book;