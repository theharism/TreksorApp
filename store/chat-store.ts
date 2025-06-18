import { api } from '@/api/axios';
import { errorHandler } from '@/lib/utils';
import { Message } from '@/types/message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ChatState {
    messages: Message[];
    loading: boolean;
    error: string | null;
    sendMessage: (message: string) => Promise<void>;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set,get) => ({
            messages: [],
            loading: false,
            error: null,

            sendMessage: async (message) => {
                try {
                    const chatMessage : Message = {
                        id: Date.now().toString(),
                        isUser: true,
                        text: message,
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    }
                    set({ loading: true, error: null, messages: [...get().messages, chatMessage] });
                    const {data:response} = await api.post<Message>('/chat', { messages:get().messages });
                    set({ messages: [...get().messages, response], loading: false });
                } catch (error: any) {
                    console.error('sendMessage error:', {error});
                    const errorMessage: Message = {
                        id: Date.now().toString(),
                        isUser: false,
                        text: 'Sorry, there was an error processing your request. Please try again.',
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      };
                
                    set({ messages: [...get().messages, errorMessage], error: error.message, loading: false });
                    errorHandler(error)
                }
            },
        }),
        {
            name: 'chat-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);