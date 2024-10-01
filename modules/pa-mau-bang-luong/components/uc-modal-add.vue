<template>
	<uc-form-modal v-model:isOpen="isOpen" title="Thêm mẫu bảng lương" :width="600" :formData="formData" ref="modalRef"
		:rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item label="Mã mẫu bảng lương" name="MaMauBangLuong">
					<a-input v-model:value="formData.MaMauBangLuong" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Tên mẫu bảng lương" name="TenMauBangLuong">
					<a-input v-model:value="formData.TenMauBangLuong" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Người chốt lương" name="NguoiChotLuong_Id">
					<uc-select-nhan-vien v-model:value="formData.NguoiChotLuong_Id"
						:initData="[{ text: formData.NguoiChotLuong_Ten, value: formData.NguoiChotLuong_Id }]" />
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
export default {
	emits: ['onFinish'],
	props: ["isOpen"],
	data() {
		return {
			isLoading: false,
			formData: {
				NguoiChotLuong_Id: null,
				MaMauBangLuong: "",
				TenMauBangLuong: ""
			},
			rules: {
				TenMauBangLuong: [
					{ required: true, message: "Vui lòng nhập tên mẫu bảng lương", trigger: "change" }
				],
				MaMauBangLuong: [
					{ required: true, message: "Vui lòng nhập tên mã bảng lương", trigger: "change" }
				], NguoiChotLuong_Id: [
					{ required: true, message: "Vui lòng chọn người chốt lương", trigger: "change" }
				]
			}
		}
	},
	mounted() { },
	computed: {},
	watch: {},
	methods: {
		handleCancel() {
			const $this = this
			$this.$emit('update:isOpen', false)
		},
		onSubmit() {
			const $this = this
			$this.isLoading = true
			ajaxCALL("/work/PA_MauBangLuong_Insert", {
				NguoiChotLuong_Id: $this.formData.NguoiChotLuong_Id,
				MaMauBangLuong: $this.formData.MaMauBangLuong,
				TenMauBangLuong: $this.formData.TenMauBangLuong
			}, res => {
				$this.handleCancel()
				$this.$refs.modalRef.$refs.formRef.resetFields()
				$this.$message.success("Thêm mẫu bảng lương thành công!")
				$this.$emit('onFinish')
			}, err => {
			})
			$this.isLoading = false
		}
	},
}
</script>