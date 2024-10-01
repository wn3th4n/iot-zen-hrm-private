<template>
	<uc-form-modal title="Thêm bộ phận" :width="600" :rules="rules" :isOpen="isOpen" ref="modalRef" :formData="record"
		@onClose="onCancel()" :isSubmit="isLoading" @onSubmit="onSubmit()">
		<a-row :gutter="[10]">
			<a-col :span="18">
				<a-form-item name="TenBoPhan" label="Tên bộ phận">
					<a-input v-model:value="record.TenBoPhan" />
				</a-form-item>
			</a-col>
			<a-col :span="6">
				<a-form-item name="Is_TamKhoa" label="Tạm khóa">
					<a-select v-model:value="record.Is_TamKhoa">
						<a-select-option :value="0">Không</a-select-option>
						<a-select-option :value="1">Tạm khóa</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item name="MoTa" label="Mô tả">
					<a-textarea v-model:value="record.MoTa" />
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emit: ["update:isOpen", "onFinish"],
		props: ["isOpen", "record"],
		data() {
			return {
				isLoading: false,
				rules: {
					TenBoPhan: [{ required: true, message: 'Bạn chưa nhập tên bộ phận', trigger: "change" }],
				}
			}
		},
		methods: {
			onCancel() {
				this.$emit("update:isOpen", false);
			},
			async onSubmit() {
				this.isLoading = true;
				try {
					const res = await boPhanService.BoPhan_Update({
						BoPhan_Id: this.record.BoPhan_Id,
						TenBoPhan: this.record.TenBoPhan,
						MoTa: this.record.MoTa,
						Is_TamKhoa: this.record.Is_TamKhoa
					});
	
					if (res) {
						this.onCancel();
						this.$emit("onFinish");
						this.$message.success('Cập nhật bộ phận thành công!');
						this.$refs.modalRef.$refs.formRef.resetFields();
					}
				} catch (error) {
					this.$message.error('Có lỗi xảy ra khi cập nhật bộ phận.');
				} finally {
					this.isLoading = false;
				}
			}
		}
	}
</script>