<template>
	<uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Chỉnh sửa khu vực chuyên môn" :formData="record"
		:rules="rules" :width="600" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item label="Mã khu vực chuyên môn" name="MaKhuVucChuyenMon">
					<a-input v-model:value="record.MaKhuVucChuyenMon" autoFocus />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Tên khu vực chuyên môn" name="TenKhuVucChuyenMon">
					<a-input v-model:value="record.TenKhuVucChuyenMon" />
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
				MaKhuVucChuyenMon: [{ required: true, message: "Vui lòng nhập mã khu vực chuyên môn", trigger: "change" }],
				TenKhuVucChuyenMon: [{ required: true, message: "Vui lòng nhập tên khu vực chuyên môn", trigger: "change" }],
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
		async onFinish() {
			const $this = this
			$this.isLoading = true
			let params = {
				KhuVucChuyenMon_Id: $this.record.KhuVucChuyenMon_Id,
				MaKhuVucChuyenMon: $this.record.MaKhuVucChuyenMon,
				TenKhuVucChuyenMon: $this.record.TenKhuVucChuyenMon,
				MoTa: $this.record.MoTa,
				Is_TamKhoa: $this.record.Is_TamKhoa
			}
			const res = await khuVucChuyenMonService.KhuVucChuyenMon_Update(params)
			if (res) {
				$this.handleCancel()
				$this.$emit('onFinish')
				Vue.$toast.success("Chỉnh sửa khu vực chuyên môn thành công!", { position: "top" })
				$this.$refs.refFormModal.$refs.formRef.resetFields()
			}

			$this.isLoading = false

		},
	},
}
</script>