<script setup lang="ts">
import z, { Schema } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
// import { UForm } from '@nuxt/ui'

const schema = z.object({
	username: z.string().min(2, 'min 2 characters'),
	password: z.string().min(3, 'min 3 characters'),
})

const state = ref<z.infer<typeof schema>>({
	username: '',
	password: '',
})

const { status, data, lastRefreshedAt, getSession, signIn, signOut, refresh, getCsrfToken, getProviders } = useAuth()

const handleSubmit = async (e: FormSubmitEvent<typeof state>) => {
	// e.preventDefault()
	// const { } = await
	signIn('credentials', { username: state.value.username, password: state.value.password, redirect: false })
	// .then(res => {
	// debugger
	// })
}
const session = await getSession()

</script>

<template>
	<p>status:<b> {{ status }}</b></p>
	<p>data:<b> {{ data?.user }}</b></p>
	<p>data:<b> {{ data }}</b></p>
	<p>session: {{ session }}</p>
	<UButton @click="() => signIn('github')">signIn with github</UButton>
	<UDivider class="my-2" />
	<UButton @click="signOut">signOut</UButton>

	<UForm :state="state" :schema="schema" @submit="handleSubmit">
		<UFormGroup label="username" name="username">
			<UInput v-model="state.username" placeholder="placeholder" />
		</UFormGroup>

		<UFormGroup label="password" name="password">
			<UInput v-model="state.password" placeholder="placeholder" />
		</UFormGroup>

		<UButton type="submit"> Submit </UButton>
	</UForm>
</template>
