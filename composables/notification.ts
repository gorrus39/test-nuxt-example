type State = { show: boolean; message: string | null; success: null | boolean }

export const useNotification = () => {
	const state = ref<State>({
		show: true,
		message: "null",
		success: true,
	})

	const update = (newState: State) => {
		state.value = newState
	}
	return { state, update }
}
