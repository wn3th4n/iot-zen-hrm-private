<template>
	<uc-form-modal :width="600" :isOpen="isOpen" title="Thêm nhân sự" :rules="rules" :formData="formData" ref="modalRef" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="onCancel()">
		<a-row :gutter="[10]">
			<a-col :sm="14" :md="14">
				<a-form-item label="Chọn nhân sự" name="NhanVien_Id">
					<uc-select-nhan-vien v-model:value="formData.NhanVien_Id"/>
				</a-form-item>
			</a-col>
			<a-col :sm="10" :md="10"> 
				<a-form-item label="Chọn chính sách nghỉ phép" name="ChinhSach_NghiPhep_Id">
					<uc-select-chinh-sach-nghi-phep v-model:value="formData.ChinhSach_NghiPhep_Id" />
				</a-form-item>
			</a-col>
			
			<a-col :sm="24" :md="24">
				<a-form-item v-if="formData.ChinhSach_NghiPhep_Id !== null && formData.ChinhSach_NghiPhep_Id !== undefined">
					<a-tag class="w-100" color="blue"> 
						<a-space class="my-2 mx-2" size="small" direction="vertical" >
							<div class="d-flex flex-column">
								<b>
									<uc-icon name="alert-circle" /> {{ cardData.TenChinhSach }} <uc-icon v-if="cardData.Is_TamKhoa" class="text-red" name="lock-outline" />
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
			<a-col :sm="6" :md="6">
				<a-form-item label="Phép trong năm" name="SoPhepTrongNam" v-if="formData.ChinhSach_NghiPhep_Id !== null && formData.ChinhSach_NghiPhep_Id !== undefined">
					<a-input-number :min="0" :max="cardData.SoNgayPhepNam" v-model:value="formData.SoPhepTrongNam" :formatter="formatter" :parser="parser" class="w-100" />
				</a-form-item>
			</a-col>
			<a-col :sm="6" :md="6">
				<a-form-item label="Số phép tồn" name="SoPhepTon"  v-if="formData.ChinhSach_NghiPhep_Id !== null  && formData.ChinhSach_NghiPhep_Id !== undefined">
					<a-input-number :min="0" :max="cardData.SoNgayPhepTon" v-model:value="formData.SoPhepTon" :formatter="formatter" :parser="parser" class="w-100" />
				</a-form-item>
			</a-col>

			<a-col :sm="12" :md="12">
				<a-form-item label="Ngày hiệu lực" name="NgayHieuLuc"
					v-if="formData.ChinhSach_NghiPhep_Id !== null && formData.ChinhSach_NghiPhep_Id !== undefined">
					<a-date-picker format="DD/MM/YYYY" v-model:value="formData.NgayHieuLuc" class="w-100" :allowClear="false">
					</a-date-picker>
				</a-form-item>
			</a-col>

			<a-col :sm="24" :md="24">
				<a-form-item
					v-if="formData.ChinhSach_NghiPhep_Id !== null  && formData.ChinhSach_NghiPhep_Id !== undefined">
					<a-card size="small" :disable="true">
						<a-space size="small" direction="horizontal">
							<uc-icon  class="text-primary" size="17" name="shield-check"/>
							<span>Tổng ngày phép: <b>{{ formData.SoPhepTon + formData.SoPhepTrongNam }}</b> ngày.</span>
						</a-space>
					</a-card>
				</a-form-item>
			</a-col>
			<a-col :sm="24" :md="24">
				<a-form-item label="Ghi chú thêm" name="GhiChu">
					<a-textarea :rows="2" v-model:value="formData.GhiChu"></a-textarea>
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emit: ["isFinish", "update:isOpen"],
		props: ['isOpen'],
		data() {
			return {
				data: [],
				listChinhSach: [],
				isLoading: false,
				formData: {
					NhanVien_Id: null,	
					ChinhSach_NghiPhep_Id: null,
					NgayHieuLuc: null,
					SoPhepTrongNam: 0,
					SoPhepTon: 0,
					GhiChu: "",
					Is_NghiBu: 0
				},
				rules: {
					NgayHieuLuc : [{required : true, message: "Bạn chưa chọn ngày hiệu lực!", trigger: "change" }]
				},
				cardData: {},
			}
		},
		mounted() {},
		computed: {},
		watch: {
			'formData.ChinhSach_NghiPhep_Id': async function(newId) {
				this.isLoading = true
				const reps  = await chinhSachNghiPhepService.ChinhSach_NghiPhep_Select().finally(() => {
					this.isLoading = false
				})
				this.cardData = reps.find(i => i.ChinhSach_NghiPhep_Id === newId) || {};
			}
		},
		methods: {
			onCancel(){
			this.$emit('update:isOpen', false)
			},
			async onSubmit(){
				this.isLoading = true
				const params = {
					...this.formData,
					NgayHieuLuc: this.formData.NgayHieuLuc.format('YYYY/MM/DD'),
				}
				const reps = await nhanVienNghiPhepService.NhanVien_ChinhSach_NghiPhep_Insert(params)
				if (reps) {
					this.onCancel()
					this.$emit('onFinish')
					this.$message.success('Thêm nhân sự thành công!')
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