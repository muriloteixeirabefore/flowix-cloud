import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    accessToken: string
    refreshToken: string
    tokenType: string
    roles: string[]
    funcao: string | null
    empresaId: string | null
  }

  interface Session extends DefaultSession {
    user: User
    accessToken: string
  }
}
