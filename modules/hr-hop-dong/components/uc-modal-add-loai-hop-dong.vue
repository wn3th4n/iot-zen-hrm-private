<template>
	<uc-form-modal :width="700" title="Thêm loại hợp đồng mới" :isOpen="isOpen" ref="modalRef" :formData="form"
		:rules="rules" @onSubmit="onSubmit()" :isSubmit="state.isLoading" @onClose="onCancel()">
		<a-row :gutter="[10]">
			<a-col :span="12">
				<a-form-item label="Loại hợp đồng" name="LoaiHopDong">
					<a-input v-model:value="form.LoaiHopDong" />
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Người theo dõi" name="NguoiTheoDoi_Id">
					<uc-select-nhan-vien v-model:value="form.NguoiTheoDoi_Id" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Mô tả và các chính sách theo kèm" name="Mota">
					<a-textarea v-model:value="form.MoTa" />
				</a-form-item>
			</a-col>
			<a-col :span="8">
				<a-form-item label="Hợp đồng thử việc" name="Is_HopDong_ThuViec">
					<a-select v-model:value="form.Is_HopDong_ThuViec">
						<a-select-option :value="0">Không</a-select-option>
						<a-select-option :value="1">Có</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="8">
				<a-form-item label="Chính sách thuế mặc định" name="ChinhSach_Thue_Id">
					<uc-select-thue  v-model:value="form.ChinhSach_Thue_Id"/>
				</a-form-item>
			</a-col>
			<a-col :span="8">
				<a-form-item label="Chính sách bảo hiểm mặc định" name="ChinhSach_BaoHiem_Id">
					<a-select v-model:value="form.ChinhSach_BaoHiem_Id" placeholder="Chọn chính sách bảo hiểm...">
						<a-select-option v-for="bh in value.dsBaoHiem" :value="bh.ChinhSach_BaoHiem_Id">{{
							bh.TenChinhSach }}</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="File mẫu (.docx)" name="File_HopDong">
					<uc-file-upload v-model:value="form.File_HopDong" :multiple="false" title="Upload hồ sơ"
						accept=".docx, .doc, .docs" />
				</a-form-item>
			</a-col>

			<a-col :span="24">
				<a-divider orientation="left" dashes><span>Cấu hình nhắc nhở hết hạn</span></a-divider>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Thông báo đến">
					<uc-select-nhan-vien v-model:value="form.NguoiDuoc_ThongBao" :multiple="false" />
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Nhắc nhở trước (ngày)" >
					<a-input-number v-model:value="form.NhacNho_Ngay" :min="0" class="min-w-150px"></a-input-number>
				</a-form-item>				
			</a-col>
			
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ['update:isOpen', 'onFinish'],
		props: ["isOpen"],
		data() {
			return {
				state: {
					isLoading: true
				},
				form: {
					LoaiHopDong: null,
					Is_HopDong_ThuViec: 0,
					ChinhSach_Thue_Id: null,
					ChinhSach_BaoHiem_Id: null,
					NguoiTheoDoi_Id: null,
					NhacNho_Ngay: 0,
					NguoiDuoc_ThongBao: null,
					File_HopDong: [],
					MoTa: null,
				},
				value: {
					dsBaoHiem: [],
                    dsThue: []				
				},
				rules: {
                    LoaiHopDong:  [{required: true, message: 'Bạn chưa nhập loại hợp đồng', trigger: 'change'}],
					Is_HopDong_ThuViec:  [{required: true, message: 'Bạn chưa chọn hợp đồng thử việc', trigger: 'change'}],
					ChinhSach_Thue_Id:  [{required: true, message: 'Bạn chưa chọn chính sách thuế', trigger: 'change'}],
					ChinhSach_BaoHiem_Id: [{required: true, message: 'Bạn chưa chọn chính sách bảo hiểm', trigger: 'change'}] ,
                },


			}
		},
		mounted() {
			this.loadBaoHiem()
		},
		computed: {},
		watch: {},
		methods: {
			loadBaoHiem() {
				ajaxCALL('/work/HR_ChinhSach_BaoHiem_Select', {}, (res) => {
					this.value.dsBaoHiem = res.data
				})
        	},
			onCancel(){
				this.$emit('update:isOpen', false)
			},
			async onSubmit(){
				this.state.isLoading = true

                const param = {
					TenLoaiHopDong: this.form.LoaiHopDong,
					ChinhSach_Thue_Id: this.form.ChinhSach_Thue_Id,
					ChinhSach_BaoHiem_Id: this.form.ChinhSach_BaoHiem_Id,
					MoTa: this.form.MoTa,
					NguoiTheoDoi_Id: this.form.NguoiTheoDoi_Id,
					NguoiThongBao_Id: this.form.NguoiThongBao_Id,
					File_Id: this.form.File_HopDong,
					SoNgayThongBao: this.form.SoNgayThongBao,
					Is_ThuViec:this.form.Is_HopDong_ThuViec
				 }
                
                const reps = await loaiHopDongService.LoaiHopDong_Insert(param).finally(()=> this.state.isLoading = false)
                
                if(reps) {
                    this.onCancel()
					this.$message.success("Thêm loại hợp đồng thành công")
					this.$emit('onFinish')
					this.$refs.modalRef.$refs.formRef.resetFields()
                }
			}, 
			
		},
	}
</script>