<script setup lang="ts">
import z from 'zod'

const schema = z.object({
	firstName: z.string().min(3, 'min 3'),
})

const state = ref<z.infer<typeof schema>>({
	firstName: 'Alex',
})

// const auth = useAuth()
const { status, data, lastRefreshedAt, token, refreshToken, getSession, signUp, signIn, signOut, refresh } = useAuth()
// console.log(auth)
// const {} = useSession()
</script>

<template>
	<UButton @click="signIn">signIn</UButton>

	<UForm :state="state" :schema="schema">
		<UFormGroup label="label" name="firstName">
			<UInput v-model="state.firstName" placeholder="placeholder" />
		</UFormGroup>

		<h2>asdf</h2>
		<UButton type="submit"> Submit </UButton>
	</UForm>
</template>
