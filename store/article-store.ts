import { api } from "@/api/axios";
import { errorHandler } from "@/lib/utils";
import { Article } from "@/types/article";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface fetchArticleRequest {
  id: string;
}

export interface ArticleResponse {
  data: Article[],
  total: Number,
  page: Number,
  totalPages: Number,
}

interface ArticleState {
  articles: Record<string, Article[]>
  loading: boolean;
  error: string | null;
  fetchArticles: (query: string) => Promise<void>;
  fetchArticleById: (data: fetchArticleRequest) => Promise<Article | undefined>;
}

export const useArticleStore = create<ArticleState>()(
  persist(
    (set) => ({
      articles: {},
      loading: false,
      error: null,

      fetchArticles: async (query) => {
        try {
          set({ loading: true, error: null });
          const {data:response} = await api.get<ArticleResponse>(`article?${query}`); 
          const params = new URLSearchParams(query);
          const category = params.get("category") || "default";
          const key = category === 'all' ? 'All Articles' : category
          set((state) => ({
            loading: false,
            articles: {
            ...state.articles,
            [key]: response.data,
            },
          }));
        } catch (error: any) {
          console.error("fetchArticles error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      fetchArticleById: async (data) => {
        try {
          set({ loading: true, error: null });
          const { data: response } = await api.get<{ article: Article }>(`article/${data.id}`);
          set({ loading: false });
          return response.article;
        } catch (error: any) {
          console.error("fetchArticleById error:", { error: error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },
    }),
    {
      name: "article-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        articles: state.articles,
      }),
    }
  )
);
