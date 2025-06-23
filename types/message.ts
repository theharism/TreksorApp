export interface Message {
    id: string
    content: string
    role: string
    timestamp: string
    isTyping?: boolean
}