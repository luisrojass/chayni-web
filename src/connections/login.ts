import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"

export const login = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const credentials = await signInWithPopup(auth, provider)
    return credentials.user

  } catch (err) {
    return null
  }
}
