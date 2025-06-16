export interface Article {
    _id: string
    category: string
    title: string
    description: string
    body: string
    image: string
    isRead?: boolean
}