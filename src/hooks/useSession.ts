import { User } from 'firebase/auth'
import { create } from 'zustand'

interface Session {
  user: User | null
  setUser: (user: User | null) => void
}

export const useSession = create<Session>(
  set => ({
    user: null,

    setUser: (user) => {
      set(() => ({ user }))
    }
  })
)
