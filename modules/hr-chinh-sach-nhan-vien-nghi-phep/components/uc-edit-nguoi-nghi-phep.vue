<template>
	<uc-form-modal :isOpen="isOpen" title="Cập nhật dữ liệu nghỉ phép cho nhân sự" :rules="rules" :width="600" :formData="record" ref="modalRef" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="onCancel()">
		<a-row :gutter="[10]">
			<a-col :span="14">
				<a-form-item label="Nhân sự" name="NhanVien_Id">
					<a-input v-model:value="record.HoVaTenNhanVien" :disabled="true" />
				</a-form-item>
			</a-col>
			<a-col :span="10"> 
				<a-form-item label="Chọn chính sách nghỉ phép" name="ChinhSach_NghiPhep_Id">
					<uc-select-chinh-sach-nghi-phep v-model:value="record.ChinhSach_NghiPhep_Id" />
				</a-form-item>
			</a-col>
			
			<a-col :sm="24" :md="24">
				<a-form-item v-if="record.ChinhSach_NghiPhep_Id !== null && record.ChinhSach_NghiPhep_Id !== undefined">
					<a-tag class="w-100" color="blue">
						<a-space class="my-2 mx-2" size="small" direction="vertical">
							<div class="d-flex flex-column">
								<b>
									<uc-icon name="alert-circle" /> {{ cardData.TenChinhSach }}
									<uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
								</b>
								<span>&emsp;{{ cardData.TenLoaiNghiPhep }} - {{ cardData.MaLoaiNghiPhep }}</span>
							</div>
							<div>
								&emsp;<span>Mô tả: {{ cardData.MoTa }}</span>
							</div>
						</a-space>
					</a-tag>
				</a-form-item>
				
			</a-col>
			<a-col :span="6">
				<a-form-item label="Số phép năm" name="SoPhepTrongNam" v-if="record.ChinhSach_NghiPhep_Id !== null && record.ChinhSach_NghiPhep_Id !== undefined">
					<a-input-number :min="0" :max="cardData.SoNgayPhepNam" v-model:value="record.SoPhepTrongNam" :formatter="formatter" :parser="parser" class="w-100" />
				</a-form-item>
			</a-col>
			<a-col :span="6">
				<a-form-item label="Số phép tồn" name="SoPhepTon"  v-if="record.ChinhSach_NghiPhep_Id !== null  && record.ChinhSach_NghiPhep_Id !== undefined">
					<a-input-number :min="0" :max="cardData.SoNgayPhepTon" v-model:value="record.SoPhepTon" :formatter="formatter" :parser="parser" class="w-100" />
				</a-form-item>
			</a-col>
			<a-col :sm="12" :md="12">
				<a-form-item label="Ngày hiệu lực" name="NgayHieuLuc"
					v-if="record.ChinhSach_NghiPhep_Id !== null && record.ChinhSach_NghiPhep_Id !== undefined">
					<a-date-picker format="DD/MM/YYYY" v-model:value="record.NgayHieuLuc" class="w-100" :allowClear="false">
					</a-date-picker>
				</a-form-item>
			</a-col>

			<a-col :sm="24" :md="24">
				<a-form-item
					v-if="record.ChinhSach_NghiPhep_Id !== null  && record.ChinhSach_NghiPhep_Id !== undefined">
					<a-card size="small" :disable="true">
						<a-space size="small" direction="horizontal">
							<uc-icon class="text-primary" size="17" name="shield-check"/>
							<span>Tổng ngày phép: <b>{{ record.SoPhepTon + record.SoPhepTrongNam }}</b> ngày.</span>
						</a-space>
					</a-card>
				</a-form-item>
			</a-col>
			
			<a-col :sm="24" :md="24">
				<a-form-item label="Ghi chú thêm" name="GhiChu">
					<a-textarea :rows="2" v-model:value="record.GhiChu"></a-textarea>
				</a-form-item>
			</a-col>

			<a-col :sm="16" :md="16">
				<a-form-item label="Đồng thời tham gia vào chính sách nghỉ bù" name="Is_NghiBu">
					<a-row>
						<a-col :span="8">
							<a-select v-model:value="record.Is_NghiBu">
								<a-select-option :value="0">Không</a-select-option>
								<a-select-option :value="1">Có</a-select-option>
							</a-select>
						</a-col>
					</a-row>
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		props: ["isOpen", "record"],
		emits: ["onFinish","update:isOpen"],
		data() {
			return {
				rules: {
					NgayHieuLuc : [{required : true, message: "Bạn chưa chọn ngày hiệu lực!", trigger: "change" }]
				},
				isLoading: false,
				cardData: {}
			}
		},
		mounted() {},
		computed: {},
		watch: {
			'record.ChinhSach_NghiPhep_Id': async function(newId) {
				this.isLoading = true
				const reps  = await chinhSachNghiPhepService.ChinhSach_NghiPhep_Select().finally(() => {
					this.isLoading = false
				})
				this.cardData = reps.find(i => i.ChinhSach_NghiPhep_Id === newId) || {};
			}
		},
		methods: {
			onCancel() {
				this.$emit("update:isOpen", false)
			},
			async onSubmit(){
				this.isLoading = true
				const reps = await nhanVienNghiPhepService.NhanVien_ChinhSach_NghiPhep_Update({
					NhanVien_ChinhSach_NghiPhep_Id: this.record.NhanVien_ChinhSach_NghiPhep_Id,
					ChinhSach_NghiPhep_Id: this.record.ChinhSach_NghiPhep_Id,
					NgayHieuLuc: this.record.NgayHieuLuc.format('YYYY/MM/DD'),
					SoPhepTrongNam: this.record.SoPhepTrongNam,
					SoPhepTon: this.record.SoPhepTon,
					GhiChu: this.record.GhiChu,
					Is_NghiBu: this.record.Is_NghiBu
				})
				if (reps) {
					this.onCancel()
					this.$emit('onFinish')
					this.$message.success('Cập nhật phép nghỉ cho nhân sự thành công!')
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