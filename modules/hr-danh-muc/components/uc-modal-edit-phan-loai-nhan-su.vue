<template>
	<uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" :title="title" :formData="record" :rules="rules"
		:width="600" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item label="Mã hình thức" name="MaHinhThuc">
					<a-input v-model:value="record.MaHinhThuc" autoFocus />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Tên hình thức" name="TenHinhThuc">
					<a-input v-model:value="record.TenHinhThuc" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Mô tả" name="MoTa">
					<a-textarea v-model:value="record.MoTa"></a-textarea>
				</a-form-item>
			</a-col>
			<a-col :span="5">
				<a-form-item label="Tạm khóa">
					<a-select v-model:value="record.Is_TamKhoa">
						<a-select-option :value="0"> Không </a-select-option>
						<a-select-option :value="1"> Có </a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>
<script>
export default {
	emits: ['onFinish'],
	props: ['isOpen', 'record'],
	data() {
		return {
			isLoading: false,
			rules: {
				MaHinhThuc: [{ required: true, message: "Vui lòng nhập mã hình thức", trigger: "change" }],
				TenHinhThuc: [{ required: true, message: "Vui lòng nhập tên hình thức", trigger: "change" }],
			}
		}
	},
	mounted() { },
	computed: {
		title: function () {
			return "Chỉnh sửa hình thức " + this.record.TenHinhThuc
		}
	},
	watch: {},
	methods: {
		handleCancel() {
			const $this = this
			$this.$emit('update:isOpen', false)
		},
		onFinish() {
			const $this = this
			$this.isLoading = true
			ajaxCALL("/work/HR_HinhThuc_Update", {
				HinhThuc_Id: $this.record.HinhThuc_Id,
				MaHinhThuc: $this.record.MaHinhThuc,
				TenHinhThuc: $this.record.TenHinhThuc,
				MoTa: $this.record.MoTa,
				Is_TamKhoa: $this.record.Is_TamKhoa
			}, (res) => {
				$this.handleCancel()
				$this.$emit('onFinish')
				Vue.$toast.success("Chỉnh sửa hình thức thành công!", { position: "top" })
				$this.$refs.refFormModal.$refs.formRef.resetFields()
			})
			$this.isLoading = false
		},
	},
}
</script>