import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {query as q} from 'faunadb'

import {fauna} from 'services/fauna'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'user',
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async signIn(profile, account, metadata) {
      const res = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${account.accessToken}`,
        },
      })

      const emails = await res.json()
      if (!emails || emails.length === 0) {
        return false
      }

      const sortedEmails = emails.sort(
        (a: {primary: number}, b: {primary: number}) => b.primary - a.primary,
      )
      profile.email = sortedEmails[0].email

      try {
        await fauna.query(
          q.Create(q.Collection('users'), {data: {email: profile.email}}),
        )
        return true
      } catch {
        return false
      }
    },
  },
})
