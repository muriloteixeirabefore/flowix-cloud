import { flowixApi } from '@/lib/axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'

const signInResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  roles: z.array(z.string()),
  funcao: z.string().nullable(),
  empresa_id: z.string().nullable(),
})

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'login', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const response = await flowixApi
          .post('/auth/login', new URLSearchParams(credentials), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .catch((error) => {
            console.error(
              'API Error',
              error.response.status,
              error.response.data,
            )
            throw error
          })
        console.log(response?.data)
        const data = signInResponseSchema.parse(response?.data)
        return {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          tokenType: data.token_type,
          roles: data.roles,
          funcao: data.funcao,
          empresaId: data.empresa_id,
        }
      },
    }),
  ],
  pages: {
    signIn: '/?sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      user &&
        ((token.accessToken = user.accessToken),
        (token.user = {
          id: user.id,
          username: user.username,
          is_superuser: user.is_superuser,
        }))
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      session.accessToken = token.accessToken as any
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }

