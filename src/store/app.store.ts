

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (username, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, you'd validate credentials against a backend
        // For this example, we'll accept any non-empty username and password
        if (username.trim() && password.trim()) {
          set({ 
            isAuthenticated: true, 
            user: { id: Date.now().toString(), username } 
          })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)