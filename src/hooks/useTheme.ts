import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Theme {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useTheme = create(
  persist<Theme>(
    set => ({
      theme: 'light',

      toggleTheme: () => {
        set(state => ({
          theme: state.theme === 'dark' ? 'light' : 'dark'
        }))
      }
    }),
    {
      name: 'landing-bioneg:THEME'
    })
)
