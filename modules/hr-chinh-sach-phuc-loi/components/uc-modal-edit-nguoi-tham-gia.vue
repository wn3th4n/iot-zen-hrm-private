<template>
	<uc-form-modal :isOpen="isOpen" ref="modalRef" title="Cập nhật phúc lợi cho nhân sự" :rules="rules" :formData="record" :width="650" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="onCancel()">
		<a-row :gutter="[10]">
			<a-col :span="16">
					<a-form-item label="Nhân sự" name="NhanVien_Id">
						<a-input v-model:value="record.HoVaTenNhanVien" :disabled="true" />
					</a-form-item>
			</a-col>
		
			<a-col :span="8">
				<a-form-item label="Ngày áp dụng" name="NgayApDung">
					<a-date-picker format="DD/MM/YYYY" v-model:value="record.NgayApDung" class="w-100" :allowClear="false"  :formatter="formatter" :parser="parser">
					</a-date-picker>
				</a-form-item>
			</a-col>
		
			<a-col :span="24">
				<a-form-item label="Phúc lợi" name="PhucLoi_Id">
					<uc-select-phuc-loi v-model:value="record.PhucLoi_Id"></uc-select-phuc-loi>
				</a-form-item>
			</a-col>
		
			
			<a-col :sm="24" :md="24">
				<a-form-item label="Ghi chú thêm" name="GhiChu">
					<a-textarea :rows="2" v-model:value="record.GhiChu"></a-textarea>
				</a-form-item>
			</a-col>

			
		
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ["onFinish", "update:isOpen"],
		props: ["isOpen", "record"],
		data() {
			return {
				rules: [],
				isLoading: false
			}
		},
		mounted() {},
		computed: {},
		watch: {},
		methods: {
			onCancel() {
				this.$emit('update:isOpen', false)
			},
			async onSubmit() {
				this.isLoading = true
				const params = {
					NhanVien_PhucLoi_Id: this.record.NhanVien_PhucLoi_Id,
					NgayApDung: this.record.NgayApDung.format('YYYY/MM/DD'),
					PhucLoi_Id: this.record.PhucLoi_Id,
					GhiChu: this.record.GhiChu,
				}
				const reps = await nhanVienPhucLoiService.NhanVien_PhucLoi_Update(params)
				if (reps) {
					this.onCancel()
					this.$emit('onFinish')
					this.$message.success('Cập nhật phúc lợi cho nhân sự thành công!')
					this.$refs.modalRef.$refs.formRef.resetFields()
				}
				this.isLoading = false
			},
			formatter(value) {
				return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			},

			parser(value) {
				return value.replace(/\$\s?|(,*)/g, '')
			},
		},
	}
</script>