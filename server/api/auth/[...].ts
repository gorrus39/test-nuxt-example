import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { NuxtAuthHandler } from "#auth"

const db = [
	{ username: "111", password: "111", additional: "additional1", name: "name1" },
	{ username: "222", password: "222", additional: "additional2", name: "name2" },
]

export default NuxtAuthHandler({
	// A secret string you define, to ensure correct encryption
	secret: "your-secret-here",
	providers: [
		// @ts-expect-error Use .default here for it to work during SSR.
		CredentialsProvider.default({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			// async authorize() {
			authorize: async (credentials: { username: string | undefined; password: string | undefined }) => {
				// async authorize(credentials: { username: string | undefined; password: string | undefined }, _req) {
				// Add logic here to look up the user from the credentials supplied

				const user = db.find((u) => u.username == credentials.username && u.password == credentials.password)

				if (user) {
					console.info(user)
					// Any object returned will be saved in `user` property of the JWT
					return user
				} else {
					console.info(null)

					// If you return null then an error will be displayed advising the user to check their details.
					return null

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
		// @ts-expect-error Use .default here for it to work during SSR.
		// GithubProvider.default({
		// 	name: "github",
		// 	clientId: "Ov23liY1AenpHdNcRFjt",
		// 	clientSecret: "ca019dfb44649fbdc711ba5243dd37279b602c4a",
		// }),

		GithubProvider.default({
			clientId: process.env.GITHUB_CLIENT_ID || "enter-your-client-id-here",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "enter-your-client-secret-here",
		}),
		// @ ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		// CredentialsProvider.default({
		// 	// The name to display on the sign in form (e.g. 'Sign in with...')
		// 	name: "Credentials",
		// 	// The credentials is used to generate a suitable form on the sign in page.
		// 	// You can specify whatever fields you are expecting to be submitted.
		// 	// e.g. domain, username, password, 2FA token, etc.
		// 	// You can pass any HTML attribute to the <input> tag through the object.
		// 	credentials: {
		// 		username: { label: "Username", type: "text", placeholder: "(hint: jsmith)" },
		// 		password: { label: "Password", type: "password", placeholder: "(hint: jsmith)" },
		// 	},
		// 	authorize(credentials: any) {
		// 		console.warn(
		// 			"ATTENTION: You should replace this with your real providers or credential provider logic! The current setup is not safe"
		// 		)
		// 		// You need to provide your own logic here that takes the credentials
		// 		// submitted and returns either a object representing a user or value
		// 		// that is false/null if the credentials are invalid.
		// 		// NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

		// 		const user = { id: "1", name: "J Smit h", username: "jsmith", password: "jsmith", asdf: "asdf" }

		// 		if (credentials?.username === user.username && credentials?.password === user.password) {
		// 			// Any object returned will be saved in `user` property of the JWT
		// 			return user
		// 		} else {
		// 			console.error("Warning: Malicious login attempt registered, bad credentials provided")

		// 			// If you return null then an error will be displayed advising the user to check their details.
		// 			return null

		// 			// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
		// 		}
		// 	},
		// }),
	],
	callbacks: {
		// 	/* on before signin */
		// async signIn({ user, account, profile, email, credentials }) {
		// console.error(user)
		// return true
		// },
		// 	/* on redirect to another url */
		// 	async redirect({ url, baseUrl }) {
		// 		return baseUrl
		// 	},
		// 	/* on session retrival */
		// 	async session({ session, user, token }) {
		// 		return session
		// 	},
		async session({ session, user }) {
			//  "session" is current session object
			//  below we set "user" param of "session" to value received from "jwt" callback
			// session.user = user
			// session.user = user.name
			return Promise.resolve(session)
		},
		// 	/* on JWT token creation or mutation */
		// 	async jwt({ token, user, account, profile, isNewUser }) {
		// 		return token
		// 	},
	},
})
