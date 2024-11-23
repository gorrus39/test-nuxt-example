import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
	// A secret string you define, to ensure correct encryption
	secret: 'your-secret-here',
	providers: [
		// @ts-expect-error Use .default here for it to work during SSR.
		GithubProvider.default({
			clientId: 'Ov23liY1AenpHdNcRFjt',
			clientSecret: 'ca019dfb44649fbdc711ba5243dd37279b602c4a',
		}),
	],
	callbacks: {
		/* on before signin */
		async signIn({ user, account, profile, email, credentials }) {
			return true
		},
		/* on redirect to another url */
		async redirect({ url, baseUrl }) {
			return baseUrl
		},
		/* on session retrival */
		async session({ session, user, token }) {
			return session
		},
		/* on JWT token creation or mutation */
		async jwt({ token, user, account, profile, isNewUser }) {
			return token
		},
	},
})
