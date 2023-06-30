import { User } from 'firebase/auth'
import { create } from 'zustand'

interface Session {
  user: User | null
  logging: boolean
  setLogging: (logging: boolean) => void
  setUser: (user: User | null) => void
}

export const useSession = create<Session>(
  set => ({
    user: null,
    logging: true,

    setLogging: (logging) => {
      set(() => ({ logging }))
    },

    setUser: (user) => {
      set(() => ({ user }))
    }
  })
)
