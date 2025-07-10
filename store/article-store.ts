import { api } from "@/api/axios";
import { errorHandler } from "@/lib/utils";
import { Article } from "@/types/article";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface fetchArticleRequest {
  id: string;
  category: string;
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
  getUnreadArticlesCount: () => number;
  markArticleAsRead: (type: string, id: string) => void;
  clearData: () => void;
}

export const useArticleStore = create<ArticleState>()(
  persist(
    (set, get) => ({
      articles: {},
      loading: false,
      error: null,

      fetchArticles: async (query) => {
        try {
          set({ loading: true, error: null });
          const { data: response } = await api.get<ArticleResponse>(`article?${query}&date=${new Date().toISOString().split('T')[0]}`);
          const params = new URLSearchParams(query);
          const category = params.get("category") || "default";
          const key = category === 'all' ? 'All Articles' : category;
          const existingArticles = get().articles[key] || [];
        
          if(response.data.length === 0) {
            set(() => ({
              loading: false,
              articles: {}
            }));            
          }
          const newArticles = response.data.filter(
            newItem => !existingArticles.some(existing => existing._id === newItem._id)
          );
          set(state => ({
            loading: false,
            articles: {
              ...state.articles,
              [key]: [...existingArticles, ...newArticles],
            }
          }));
        } catch (error: any) {
          console.error("fetchArticles error:", { error: error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      fetchArticleById: async (data) => {
        try {
          set({ loading: true, error: null });
          const articles = get().articles[data.category] = get().articles[`${data.category}`] || [];
          const article = articles.find(article => article._id === data.id);
          set({ loading: false });
          return article;
        } catch (error: any) {
          console.error("fetchArticleById error:", { error: error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      clearData: () => {
        set({ articles: {}, loading: false, error: null });
      },

      getUnreadArticlesCount: (): number => {
        const countRead = (items: { isRead?: boolean }[]): number => items.filter(i => i.isRead).length;

        const { articles }: { articles: Record<string, { isRead?: boolean }[]> } = useArticleStore.getState();
     
        const bodyArticles: { isRead?: boolean }[] = articles["Body"] || [];
        const mentalArticles: { isRead?: boolean }[] = articles["Mental"] || [];
        const spiritualArticles: { isRead?: boolean }[] = articles["Spiritual"] || [];

        const bodyRead: number = countRead(bodyArticles);
        const mentalRead: number = countRead(mentalArticles);
        const spiritualRead: number = countRead(spiritualArticles);

        const totalArticles: number = bodyArticles.length + mentalArticles.length + spiritualArticles.length;
        const totalArticlesRead: number = bodyRead + mentalRead + spiritualRead;

        return totalArticles - totalArticlesRead;
      },

      markArticleAsRead: (type: string, id: string) => {
        const allArticles = get().articles;

        if (type === 'All Articles') {
          const existingArticles = allArticles[type] || [];
          const articleIndex = existingArticles.findIndex(article => article._id === id);
          if (articleIndex !== -1) {
            existingArticles[articleIndex].isRead = true;
          }
          const existingCategoryArticles = allArticles[existingArticles[articleIndex].category] || [];
          const categoryArticleIndex = existingCategoryArticles.findIndex(article => article._id === id);
          if (categoryArticleIndex !== -1) {
            existingCategoryArticles[categoryArticleIndex].isRead = true;
          }
          allArticles[existingArticles[articleIndex].category] = existingCategoryArticles;
        } else {
          const existingArticles = allArticles[type] || [];
          const articleIndex = existingArticles.findIndex(article => article._id === id);
          if (articleIndex !== -1) {
            existingArticles[articleIndex].isRead = true;
          }
          const existingCategoryArticles = allArticles['All Articles'] || [];
          const categoryArticleIndex = existingCategoryArticles.findIndex(article => article._id === id);
          if (categoryArticleIndex !== -1) {
            existingCategoryArticles[categoryArticleIndex].isRead = true;
          }
          allArticles['All Articles'] = existingCategoryArticles;
        }
        set({ articles: allArticles });
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
