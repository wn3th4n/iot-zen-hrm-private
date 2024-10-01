<template>
	<uc-form-modal title="Cập nhật chính sách cho nhân sự" :isOpen="isOpen" ref='modalRef' :width="450" :rules="rules" :formData="record"
		@onSubmit="onSubmit()" :isSubmit="state.isLoadingForm" @onClose="onClose()">
			<a-row :gutter="[10]">
				<a-col :span="24">
					<a-form-item label="Chọn nhân viên" name="NhanVien_Id">
						<uc-select-nhan-vien v-model:value="TenNhanVien" :disabled="true" />
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item label="Chọn chính sách thuế" name="ChinhSach_Thue_Id">
						<uc-select-thue v-model:value="record.ChinhSach_Thue_Id" />
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item label="Chọn ngày tham gia" name="NgayThamGia">
						<a-date-picker format="DD/MM/YYYY" v-model:value="record.NgayThamGia" :formatter="formatter" :parser="parser"
							class="w-100" />
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item label="Mục đích tạo" name="MucDichTao">
						<a-select v-model:value="record.MucDichTao">
							<a-select-option :value="1">Tạo đăng kí mới</a-select-option>
							<a-select-option :value="2">Ghi đè đăng kí cuối cùng</a-select-option>
							<a-select-option :value="3">Tạo đăng kí trong quá khứ </a-select-option>
							<a-select-option :value="4">Tạo đăng kí đầu tiên</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="24">
				<a-form-item label="Ghi chú thêm" name="GhiChu">
					<a-textarea :rows="2" v-model:value="record.GhiChu"></a-textarea>
				</a-form-item>
			</a-col>
			</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ["update:isOpen", "onFinish"],
		props: ["isOpen","record"],
		data() {
			return {
				state: {
					isLoadingForm: false,
				},
				rules: {
                    NhanVien_Id: [{required: true, message: "Bạn chưa chọn nhân viên!", trigger: "change"}],
                    ChinhSach_Thue_Id:[{required: true, message: "Bạn chưa chọn chính sách thuế!", trigger: "change"}],
                    NgayThamGia:[{required: true, message: "Bạn chưa chọn ngày tham gia!", trigger: "change"}],
                }
			}
		},
		mounted() {},
		computed: {
			TenNhanVien: function () {
				return this.record.MaNhanVien + ' - ' + this.record.HoVaTenNhanVien
			}
		},
		watch: {},
		methods: {
			onClose(){
				this.$emit("update:isOpen", false)
			},
			async onSubmit(){
               
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