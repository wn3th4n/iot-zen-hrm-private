<template>
	<uc-form-modal :isOpen="isOpen" ref="modalRef" :formData="form" :rules="rules" title="Thêm chính sách thuế"
		:width="450" @onSubmit="onSubmit()" :isSubmit="state.isLoadingModal" @onClose="onClose()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item label="Tên chính sách" name="TenChinhSach">
					<a-input v-model:value="form.TenChinhSach" />
				</a-form-item>
			</a-col>
			<a-col :span="16">
				<a-form-item label="Mã chính sách" name="MaChinhSach">
					<a-input v-model:value="form.MaChinhSach" />
				</a-form-item>
			</a-col>
			<a-col :span="8">
				<a-form-item label="Màu chính sách" name="MauChinhSach">
					<a-input v-model:value="form.MauChinhSach" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Mô tả" name="MoTa">
					<a-textarea v-model:value="form.MoTa" />
				</a-form-item>
			</a-col>
			<a-col :span="8">
				<a-form-item label="Tạm khoá" name="Is_TamKhoa">
					<a-select v-model:value="form.Is_TamKhoa">
						<a-select-option :value="0">Không</a-select-option>
						<a-select-option :value="1">Tạm Khoá</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ["onFinish", "update:isOpen"],
		props: ["isOpen"],
		data() {
			return {
				state: {
					isLoadingModal: false,
				},
				rules: {
					TenChinhSach: [{ required: true, message: "Bạn chưa nhập tên chính sách", trigger: "change" }],
					MaChinhSach: [{ required: true, message: "Bạn chưa nhập mã tên chính sách", trigger: "change" }],
					MauChinhSach: [{ required: true, message: "Bạn chưa nhập mã màu chính sách", trigger: "change" }],
				},
				form: {
					TenChinhSach: null,
					MaChinhSach: null,
					MauChinhSach: null,
					MoTa: null,
					Is_TamKhoa: 0
				}
			}
		},
		mounted() { },
		computed: {},
		watch: {},
		methods: {
			onClose() {
				this.$emit("update:isOpen", false)
			},
			async onSubmit() {
				this.state.isLoadingModal = true
				const isInsert = await thueService.ChinhSach_Thue_Insert(this.form).finally(() => this.state.isLoadingModal = false)
				if (isInsert) {
					this.onClose()
					this.$emit("onFinish")
					this.$message.success("Thêm chính sách thuế thành công!")
					this.$refs.modalRef.$refs.formRef.resetFields()
				}
			}
		},
	}
</script>