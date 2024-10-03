<template>
	<uc-form-modal :width="750" title="Thêm trường mới" :isOpen="isOpen" :formData="record" :rules="rules"
		@onSubmit="onSubmit()" :isSubmit="state.isLoading" @onClose="onCancel()">
		<p>{{record}}</p>
	</uc-form-modal>
</template>

<script>
	export default {
		props: ["record", "isOpen"],
		data() {
			return {
				state: {
					isLoading: true
				},
				value: {
					TruongDuLieuList: [],
					newField: null,
				},
				rules: {},
			}
		},
		mounted() { },
		computed: {},
		watch: {},
		methods: {
			onSubmit() {
	
			},
			onCancel() {
				this.$emit('update:isOpen', false)
			},
		},
	}
</script>