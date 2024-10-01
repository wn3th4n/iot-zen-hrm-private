<template>
	<uc-form-modal title="Thêm nhân sự" :width="450" :rules="rules" :isOpen='isOpen' ref="modalRef" :formData="record"
		@onClose="onCancel()" :isSubmit="isLoading" @onSubmit="onSubmit()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item name="TenBoPhan" label="Tên bộ phận">
					<a-input disabled v-model:value="record.TenBoPhan" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item name="NhanVien_Id" label="Chọn nhân sự">
					<uc-select-nhan-vien v-model:value="record.NhanVien_Id" />
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ["update:isOpen", "onFinish"],
		props: ["isOpen", "record"],
		data() {
			return {
				isLoading: false,
				rules: {
					NhanVien_Id: [{ required: true, message: 'Bạn chưa chọn nhân sự', trigger: "change" }],
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
				const res = await boPhanService.BoPhan_Insert_NhanVien({
					BoPhan_Id: this.record.BoPhan_Id,
					NhanVien_Id: this.record.NhanVien_Id
				}).finally(() => {
					this.isLoading = false
				})
	
				if (res) {
					this.$message.success('Thêm nhân sự thành công!')
					this.$refs.modalRef.$refs.formRef.resetFields()
					this.$emit("onFinish")
					this.onCancel()
				}
			}
		},
	}
</script>