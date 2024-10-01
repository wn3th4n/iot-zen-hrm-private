<template>
	<uc-form-modal title="Thêm bộ phận" :width="600" :rules="rules" :isOpen='isOpen' ref="modalRef" :formData="form"
		@onClose="onCancel()" :isSubmit="isLoading" @onSubmit="onSubmit()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item name="TenBoPhan" label="Tên bộ phận">
					<a-input v-model:value="form.TenBoPhan" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item name="MoTa" label="Mô tả">
					<a-textarea v-model:value="form.MoTa" />
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ["update:isOpen","onFinish"],
		props: ["isOpen"],
		data() {
			return {
				isLoading: false,
				form: {
					TenBoPhan: null,
					MoTa: null
				},
				rules: {
					TenBoPhan: [{ required: true, message: 'Bạn chưa nhập tên bộ phận', trigger: "change" }],
				}
			}
		},
		mounted() { },
		computed: {},
		watch: {},
		methods: {
			onCancel() {
				this.$emit("update:isOpen", false)
			},
			async onSubmit() {
				this.isLoading = true
				const res = await boPhanService.BoPhan_Insert({
					TenBoPhan: this.form.TenBoPhan,
					MoTa: this.form.MoTa,
					Is_TamKhoa: false,
				}).finally(() => {
					this.isLoading = false
				})
	
				if (res) {
					this.$message.success('Thêm bộ phận thành công!')
					this.$refs.modalRef.$refs.formRef.resetFields()
					this.$emit("onFinish")
					this.onCancel()
				}
			}
		},
	}
</script>