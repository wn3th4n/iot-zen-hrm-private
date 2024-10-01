<template>
	<uc-form-modal :width="600" title="Cập nhật phòng ban" :rules="rules" :formData="record" :isOpen="isOpen" ref="modalRef" @onSubmit="onSubmit()" @onClose="onCancel()" :isSubmit="isLoading">
		<a-row :gutter="[10]">
			<a-col :span="12">
				<a-form-item label="Tên phòng ban" name="TenPhongBan">
					<a-input v-model:value="record.TenPhongBan" />
				</a-form-item>
			</a-col>
            <a-col :span="12">
                <a-form-item label="Mã phòng ban" name="MaPhongBan">
                    <a-input v-model:value="record.MaPhongBan" />
                </a-form-item>
            </a-col>
			<a-col :span="12">
				<a-form-item label="Phòng ban cha" name="PhongBan_Parent_Id">
					<uc-select-phong-ban v-model:value="record.PhongBan_Parent_Id" :initData="[{ text: record.TenPhongBan_Parent, value: record.PhongBan_Parent_Id }]"/>
				</a-form-item>
			</a-col>

			<a-col :span="12">
				<a-form-item label="Vị trí dành cho người quản lý (kế hoạch)" name="NguoiQuanLy_ViTri_Id">
					<uc-select-nhan-vien v-model:value="record.NguoiQuanLy_ViTri_Id" :initData="[{ text: record.NguoiQuanLy_ViTri_Ma +' - ' + record.NguoiQuanLy_ViTri_Ten, value: record.NguoiQuanLy_ViTri_Id }]"/>
				</a-form-item>
			</a-col>
			
			<!-- <a-col :span="12">
				<a-form-item label="Người quản lý" name="NguoiQuanLy_Id_List">
					<uc-select-nhan-vien v-model:value="record.NguoiQuanLy_Id_List" mode="multiple"></uc-select-nhan-vien>
				</a-form-item>
			</a-col>
			
			<a-col :span="12">
				<a-form-item label="Người trợ lý" name="NguoiTroLy_Id_List">
					<uc-select-nhan-vien v-model:value="record.NguoiTroLy_Id_List" mode="multiple"></uc-select-nhan-vien>
				</a-form-item>
			</a-col>
			 -->
			<a-col :span="24">
				<a-form-item label="Nhiệm vụ" name="NhiemVu">
					<a-textarea v-model:value="record.NhiemVu"></a-textarea>
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ["onFinish", "update:isOpen"],
		props: ["isOpen","record"],
		data() {
			return {
				isLoading: true,
				rules: {
					TenPhongBan: [{required: true, message: 'vui lòng nhập tên phòng ban!', trigger: "change"}],
                    MaPhongBan: [{required: true, message: 'vui lòng nhập mã phòng ban!', trigger: "change"}],
					NguoiQuanLy_ViTri_Id: [{required: true, message: 'vui lòng chọn nhân sự quản lý phòng ban!', trigger: "change"}],
				},
			}
		},
		mounted() {},
		computed: {},
		watch: {},
		methods: {
			onCancel(){
				this.$emit("update:isOpen", false)
			},
			async onSubmit(){
					this.isLoading = true
					
					const res = await phongBanService.PhongBan_Update(
					{
						PhongBan_Id: this.record.PhongBan_Id,
						PhongBan_Parent_Id: this.record.PhongBan_Parent_Id ?? 0,
						TenPhongBan: this.record.TenPhongBan,
                        MaPhongBan: this.record.MaPhongBan,
						NhiemVu: this.record.NhiemVu,
						NguoiQuanLy_ViTri_Id: this.record.NguoiQuanLy_ViTri_Id,
					})
					
					if(res){
						this.onCancel()
						this.$emit('onFinish')
						this.$message.success('Thêm phòng ban thành công!')
						this.$refs.modalRef.$refs.formRef.resetFields()
					}
					this.isLoading = false
			}
		},
	}
</script>