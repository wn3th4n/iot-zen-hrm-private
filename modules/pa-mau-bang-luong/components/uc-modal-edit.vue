<template>


	<uc-form-modal v-model:isOpen="isOpen" title="Chỉnh sửa mẫu bảng lương" :width="600" :formData="formData"
		ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
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
					<uc-select-nhan-vien v-model:value="record.NguoiChotLuong_Id"
						:initData="[{ text: record.NguoiChotLuong_Ten, value: record.NguoiChotLuong_Id }]" />
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>

</template>

<script>
export default {
	emits: ['onFinish'],
	props: ["isOpen", "record"],
	data() {
		return {
			isLoading: false,
			rules: {
				TenMauBangLuong: [
					{ required: true, message: "Vui lòng nhập tên mẫu bảng lương", trigger: "change" }
				],
				MaMauBangLuong: [
					{ required: true, message: "Vui lòng nhập mã mẫu bảng lương", trigger: "change" }
				], NguoiChotLuong_Id: [
					{ required: true, message: "Vui lòng người người chốt lương", trigger: "change" }
				]
			}
		}
	},
	mounted() { },
	computed: {
		Title: function () {
			return `Chỉnh sửa cấu hình cột ${this.record.TenMauBangLuong}`
		},
		formData: function () {
			return this.record
		}
	},
	watch: {},
	methods: {
		handleCancel() {
			const $this = this
			$this.$emit('update:isOpen', false)
		},
		onSubmit() {
			const $this = this
			$this.isLoading = true
			ajaxCALL("/work/PA_MauBangLuong_Update", {
				MauBangLuong_Id: $this.formData.MauBangLuong_Id,
				NguoiChotLuong_Id: $this.formData.NguoiChotLuong_Id,
				MaMauBangLuong: $this.formData.MaMauBangLuong,
				TenMauBangLuong: $this.formData.TenMauBangLuong
			}, res => {
				$this.handleCancel()
				$this.$refs.modalRef.$refs.formRef.resetFields()
				$this.$message.success("Chỉnh sửa mẫu bảng lương thành công!")
				$this.$emit('onFinish')
			}, err => {
			})
			$this.isLoading = false
		}
	},
}
</script>