export interface PowerThought {
    _id: string;
    date: string;
    thought: string;
    isToday?: boolean;
    isRead?: boolean
}

export interface PowerThoughtResponse {
  data: PowerThought[],
  total: Number,
  page: Number,
  totalPages: Number,
}