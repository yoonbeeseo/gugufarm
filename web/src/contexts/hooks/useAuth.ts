import { createContext, use } from "react"
import { Profile } from "../../../../types/profile"

export type AuthProps = {
  profile?: Profile
  uid: null | string
  isPending: boolean
  init: boolean
}

export const initialAuth: AuthProps = {
  uid: null,
  isPending: false,
  init: false,
}

export const Auth = createContext(initialAuth)

export const useAuth = () => use(Auth)
